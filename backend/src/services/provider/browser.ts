import {Browser} from "playwright";
import {Page} from "playwright-core";

export class BrowserService {

    private browserPromise: Promise<Browser> | null = null;

    async openPage(): Promise<Page> {
        const browser = await this.getBrowser();
        return await browser.newPage();
    }

    private async loadBrowser(): Promise<Browser> {
        const { chromium } = await import('playwright');
        return await chromium.launch({
            headless: false,
        });
    }

    private getBrowser(): Promise<Browser> {
        if (!this.browserPromise) {
            this.browserPromise = this.loadBrowser();
        }
        return this.browserPromise;
    }

    async dispose(): Promise<void> {
        if(this.browserPromise) {
            const browser = await this.getBrowser();
            await browser.close();
            this.browserPromise = null;
        }
    }
}