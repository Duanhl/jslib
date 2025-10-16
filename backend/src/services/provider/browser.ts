import {Browser} from "playwright";
import {Page} from "playwright-core";
import logger from "../../common/logs";

export class BrowserService {

    private browserPromise: Promise<Browser> | null = null;
    private isBrowserAlive: boolean = false;

    async openPage(): Promise<Page> {
        try {
            const browser = await this.getBrowser();

            if (!browser.isConnected()) {
                console.warn('Browser is disconnected, recreating...');
                await browser.close();
                return this.openPage(); // 递归重试
            }

            const page = await browser.newPage();
            page.setDefaultTimeout(30000);
            page.setDefaultNavigationTimeout(30000);
            return page;
        } catch (err: any) {
            logger.error(`Failed to open page: ${err.message}`);
            throw err;
        }
    }

    private async loadBrowser(): Promise<Browser> {
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({
            headless: true,
            timeout: 30000,
        });

        this.isBrowserAlive = true;

        // 监听浏览器断开事件
        browser.on('disconnected', () => {
            this.isBrowserAlive = false;
            this.browserPromise = null;
            console.warn('Browser disconnected');
        });

        return browser;
    }

    private async getBrowser(): Promise<Browser> {
        if (!this.browserPromise || !this.isBrowserAlive) {
            this.browserPromise = this.loadBrowser();
        }

        try {
            const browser = await this.browserPromise;
            // 双重检查浏览器是否仍然连接
            if (!browser.isConnected()) {
                this.isBrowserAlive = false;
                this.browserPromise = null;
                return this.getBrowser(); // 递归重试
            }
            return browser;
        } catch (error) {
            this.browserPromise = null;
            this.isBrowserAlive = false;
            throw error;
        }
    }

    async dispose(): Promise<void> {
        if (this.browserPromise) {
            try {
                const browser = await this.browserPromise;
                await browser.close();
            } catch (error: any) {
                logger.error(`Error closing browser: ${error.message}`);
            } finally {
                this.browserPromise = null;
                this.isBrowserAlive = false;
            }
        }
    }
}