import {describe, it} from "vitest";
import {Config} from "../../config";
import {MissavProvider} from "./missav";
import {BrowserService} from "./browser";

describe('services', () => {

    const config = Config.defaultConfig();
    const browser = new BrowserService();
    const provider = new MissavProvider(config, browser)

    it('fetch fc2', async () => {
        for (const sn of ['FC2-PPV-4777483']) {
            const movie = await provider.fetchMovie(sn);
            console.log(JSON.stringify(movie));
        }
    })

})