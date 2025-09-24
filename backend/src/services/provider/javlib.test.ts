import {describe, it} from "vitest";
import {JavlibProvider} from "./javlib";
import {Config} from "../../config";


describe('jav lib', () => {
    describe('fetch single movie', () => {
        it('ABF-261', async () => {
            const javlib = new JavlibProvider(Config.defaultConfig());
            const result = await javlib.fetchMovie('ABF-261');
            console.log(result);
        })
    });
})