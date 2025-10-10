import {Browser} from "playwright";
import {Page} from "playwright-core";

export class BrowserService {

    private readonly browserPromise = this.loadBrowser();

    async openPage(): Promise<Page> {
        const browser = await this.browserPromise;
        return await browser.newPage();
    }

    private async loadBrowser(): Promise<Browser> {
        return new Promise<Browser>(async (resolve, reject) => {
            try {
                const { chromium } = await import('playwright');
                const browser = chromium.launch({headless: false});
                return resolve(browser);
            } catch (e) {
                return reject(e);
            }
        })
    }

    async dispose(): Promise<void> {
        await (await this.browserPromise).close();
    }
}