import {FetchOptions, IProvider, RankType} from "./provider";
import {Movie, MovieListType} from "@jslib/common";
import {
    extractCode,
    extractFC2,
    extractFC2OrCode,
    extractAmateurCode,
    parseRelativeDay,
    extractT38
} from "../../common/utils";
import {Config} from "../../config";
import * as cheerio from "cheerio";
import {BrowserService} from "./browser";
import {RankMovie} from "../types";
import * as opencc from "opencc-js";
import logger from "../../common/logs";

const t2s   = opencc.Converter({ from: 'tw', to: 'cn' })

export class MissavProvider implements IProvider {
    private _host: string | undefined;

    constructor(config: Config, private readonly browser: BrowserService) {
        this._host = config.missavHost;

        config.on('configChanged', data => {
            this._host = data.missavHost;
        })
    }

    async fetchMovie(keyword: string): Promise<Movie | undefined> {
        if(!extractFC2(keyword) && !extractAmateurCode(keyword) && !extractT38(keyword)) {
            return
        }
        let path = extractFC2OrCode(keyword)!.toLowerCase();
        if(extractFC2(keyword)) {
            path = path.replace('fc2', 'fc2-')
        }
        const page = await this.browser.openPage();
        try {
            for (const url of [this._host + `v/${path}`, this._host + `v/${path}-uncensored-leaked`]) {
                await page.goto(url, {waitUntil: 'domcontentloaded'});
                const html = await page.content();
                const $search = cheerio.load(html);
                const movie =  this._parseMovieDetails($search);
                if(movie) {
                    if(extractCode(movie.sn)) {
                       delete movie.genres;
                    }
                    return movie;
                }
            }
            return;
        } catch (e: any) {
           logger.error(`fetchMovie error ${keyword} by missav: ${e}`);
           return
        }finally {
            await page.close();
        }
    }

    private _parseMovieDetails($: cheerio.CheerioAPI): Movie | undefined {
        const result: Record<string, string | string[]> = {}

        $('.meta > div').each((_, row) => {
            const label = $(row).find('label').text().replace(':', ''); // 去掉冒号
            const values = [] as string[];
            $(row).find('span, a').each((_, el) => {
                values.push($(el).text().trim());
            });
            result[label] = values.length === 1 ? values[0] : values; // 单值直接字符串，多值保持数组
        });

        let coverUrl = undefined;
        $('#player').each((_, el) => {
            const url = $(el).attr('cover');
            if(url && url.indexOf('cover') > -1) {
                coverUrl = url;
            }
        })
        if(!result['コード']) {
            return
        }
        const genresSource = typeof result['ジャンル'] === 'string' ? [result['ジャンル']] : result['ジャンル'] as string[];
        const genres = genresSource.map((item) => {
            return t2s(item);
        });
        return {
            sn: extractFC2OrCode(result['コード'] as string)!,
            title: $('#video-info .title').text(),
            coverUrl,
            releaseDate: result['発売日'] as string,
            duration: result['再生時間'] as string,
            genres,
            maker: result['メーカー'] as string,
            series: result['タグ'] as string,
            actors: typeof result['女優'] === 'string' ? [result['女優']] : result['女優'] as string[],
            // associates: unique
        }
    }

    async fetchRankMovie(type: RankType, options: FetchOptions<Movie>): Promise<RankMovie[]> {
        const page = await this.browser.openPage();
        const result = [] as RankMovie[];
        try {
            switch (type) {
                case "popular":
                    for (let i = 1; i < 5; i++) {
                        const url = `${this._host}all?sort=today_views&page=${i}`
                        await page.goto(url, {waitUntil: 'domcontentloaded'});
                        const html = await page.content();
                        const $search = cheerio.load(html);
                        const movies =  await this._parseRankeMovie($search, type);
                        if(movies) {
                            result.push(...movies);
                        }
                    }
                    break
                case "bestRated":
                    for (let i = 1; i < 5; i++) {
                        const url = `${this._host}hot?page=${i}`
                        await page.goto(url, {waitUntil: 'domcontentloaded'});
                        const html = await page.content();
                        const $search = cheerio.load(html);
                        const movies =  await this._parseRankeMovie($search, type);
                        if(movies) {
                            result.push(...movies);
                        }
                    }
                    break
            }
            return result;
        } catch (e) {
            return result;
        }finally {
            await page.close();
        }
    }

    private async _parseRankeMovie($: cheerio.CheerioAPI, type: MovieListType): Promise<RankMovie[] | undefined> {
        return  $('.vid-items .item')
            .map((_, el) => {
                const howMuchDays = $(el).find('.meta > div').text().trim();
                return {
                    sn: extractFC2OrCode($(el).find('.code').text().trim()),
                    thumbUrl: $(el).find('.image > img').attr('src')?.trim(),
                    title:    $(el).find('.title').text().trim(),
                    releaseDate: parseRelativeDay(howMuchDays as string),
                    type: type,
                    provider: 'missav'
                } as RankMovie
            })
            .get()
            .filter(Boolean);
    }
}