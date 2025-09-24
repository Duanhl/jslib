import {describe, it} from "vitest";
import {Manko} from "./manko";
import {Config} from "../../config";


describe('manko.test.js', () => {

    it('fetch movie', async () => {
        const config = Config.defaultConfig();
        const manko = new Manko(config);
        const movies = await manko.fetchMovie('mikr-031');
        console.log(movies);
    })

    it('simple', async () => {
        const config = Config.defaultConfig();
        const manko = new Manko(config);
        const movies = await manko.fetchActor('Melody Marks');
        console.log(movies);
    })
})