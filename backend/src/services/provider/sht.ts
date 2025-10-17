import * as cheerio from 'cheerio';
import {sleep} from "../../utils";
import {randomInt} from "node:crypto";
import {extractCode, extractFC2, extractFC2OrCode, pickDate} from "../../common/utils";
import {BrowserService} from "./browser";
import {FetchOptions, IProvider} from "./provider";
import {Config} from "../../config";
import {Thread} from "@jslib/common";
import logger from "../../common/logs";

export class ShtProvider implements IProvider {

    private host: string;
    private readonly isTracing;

    constructor(private browserService: BrowserService,
                config: Config) {
        this.host = config.shtHost;
        this.isTracing = config.isShtTracing;
        config.on('configChanged', (data) => {
            this.host = data.shtHost;
        })
    }

    async fetchThread(url: string, form: string | number): Promise<Thread | undefined> {
        let page;
        try {
            page = await this.browserService.openPage();
            let isCookieLoad = false;
            await page.goto(url);
            if (!isCookieLoad) {
                const btn = await page.waitForSelector('.enter-btn', {timeout: 3000})
                await btn.click()
                isCookieLoad = true;
                await page.waitForLoadState('domcontentloaded');
            }

            const html = await page.content();
            return this.parseThread(html, typeof form === 'number' ? form : parseInt(form, 10));
        } catch (e: any) {
            logger.error(`fetch sht error: ${e}`);
            return ;
        } finally {
            if(page && !page.isClosed()) {
                await page.close();
            }
        }
    }

    private parseThread(content: string, form: number): Thread | undefined {
        switch (form) {
            case 2:
                // 国产
                return this.parseCAVThread(content, form);
            case 36:
            case 37:
            case 103:
                return this.parseJAVThread(content, form);
            default:
                return undefined;
        }
    }

    private parseCAVThread(content: string, form: number): Thread | undefined {
        const doc = cheerio.load(content);
        const thread = {form} as Thread;

        const tf = doc('.t_f').text().trim().split('\n');
        for (const f of tf) {
            if (f.indexOf('【影片容量】：') !== -1) {
                thread.size = f.substring(f.indexOf("【影片容量】：") + "【影片容量】：".length)
                break
            }
        }

        thread.magnet = doc('.blockcode > div > ol > li').text().trim();

        let flag = false;
        let datestr = doc('.authi > em > span').attr('title') || '';
        if (!datestr && !flag) {
            datestr = doc('.authi > em').text().trim();
            flag = true;
        }
        let publishDate = pickDate(datestr);
        if (publishDate && publishDate.length > 10) {
            publishDate = publishDate.substring(0, 10);
        }
        thread.publishDate = publishDate;

        return thread;
    }

    private parseJAVThread(content: string, form: number): Thread | undefined {
        const doc = cheerio.load(content);
        const thread = {form} as Thread;

        const tf = doc('.t_f').text().trim().split('\n');
        for (const f of tf) {
            if (f.indexOf('【影片容量】：') !== -1) {
                thread.size = f.substring(f.indexOf("【影片容量】：") + "【影片容量】：".length)
                break
            }
        }

        const title = doc('#thread_subject').text().trim();
        thread.title = title;
        const sn = extractFC2OrCode(title);
        if (sn) {
            thread.sn = sn;
        }

        thread.magnet = doc('.blockcode > div > ol > li').text().trim();

        let flag = false;
        let datestr = doc('.authi > em > span').attr('title') || '';
        if (!datestr && !flag) {
            datestr = doc('.authi > em').text().trim();
            flag = true;
        }
        let publishDate = pickDate(datestr);
        if (publishDate && publishDate.length > 10) {
            publishDate = publishDate.substring(0, 10);
        }
        thread.publishDate = publishDate;

        return thread;
    }

    private async parseForm(content: string, form: number): Promise<Thread[]> {
        const doc = cheerio.load(content);
        const selector = "#threadlisttableid > tbody"

        return doc(selector).map((_, el) => {
            if (doc(el).attr("id")?.startsWith('normalthread')) {
                const e2 = doc(el).find('.xst');
                const title = e2.text().trim();
                const url = e2.attr('href');
                let publishDate = doc(el).find("tr > td:nth-child(3) > em > span > span").attr("title");
                if (!publishDate) {
                    publishDate = doc(el).find("tr > td:nth-child(3) > em > span").text().trim();
                }

                if (!url) {
                    return null;
                }
                const args = url.split("-")
                const threadId = parseInt(args[1]);

                let sn: string | undefined;
                if (form === 103 || form === 36 || form === 37) {
                    sn = extractFC2(title);
                    if (!sn) {
                        sn = extractCode(title);
                    }
                }
                return {title, url, threadId, form, sn, publishDate} as Thread;
            }
            return null;
        }).get() || [];
    }

    async fetchThreads(form: string | number, start: number = 1, end: number = 2, options?: FetchOptions<Thread>): Promise<Thread[]> {
        let page;
        const numberForm = typeof form === 'number' ? form : parseInt(form, 10);
        try {
            page = await this.browserService.openPage();
            let isCookieLoad = false;
            const result: Thread[] = [];
            for (let i = start; i < end; i++) {
                const url = `${this.host}/forum-${form}-${i}.html`;

                await page.goto(url, {waitUntil: 'domcontentloaded'});
                if (!isCookieLoad) {
                    const btn = await page.waitForSelector('.enter-btn', {timeout: 3000})
                    await btn.click()
                    isCookieLoad = true;
                    await page.goto(url, {waitUntil: 'domcontentloaded'});
                }

                const html = await page.content();
                const threads = await this.parseForm(html, numberForm);
                for (let i = 0; i < threads.length; i++) {
                    const thread = threads[i];
                    if (options && options.needNextLevel) {
                        if (options.needNextLevel(thread)) {
                            try {
                                await page.goto(`${this.host}/${thread.url}`, {waitUntil: 'domcontentloaded'});
                                const html = await page.content();
                                const parsed = this.parseThread(html, numberForm);
                                if (parsed) {
                                    threads[i] = {...thread, ...parsed};
                                }
                                await sleep(randomInt(500, 1000))
                            } catch (e: any) {
                                logger.error(`sync details for ${thread.url} failed: ${e.message}`);
                            }
                        }
                    }
                    if (options && options.save) {
                        await options.save(threads[i])
                    }
                }

                await sleep(randomInt(500, 1000))
                result.push(...threads);
            }

            if (this.isTracing) {
                logger.info(`fetch done, result has ${result.length} threads`);
            }
            return result;
        } catch (e: any) {
            logger.error(`fetch sht failed, error: ${e}`);
            return [];
        } finally {
            if (page && !page.isClosed()) {
                await page.close();
            }
        }
    }
}


