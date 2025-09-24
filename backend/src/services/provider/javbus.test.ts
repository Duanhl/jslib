import {describe, it} from "vitest";
import {Config} from "../../config";
import {JavbusProvider} from "./javbus";

describe('javbus', () => {
    describe('fetch movie', () => {
        it('simple', async () => {
            const javbus = new JavbusProvider(Config.defaultConfig());
            const movie = await javbus.fetchMovie('MIKR-031')
            console.log(movie)
        });
    })

    describe('fetch actor', () => {
        it('simple', async () => {
            const javbus = new JavbusProvider(Config.defaultConfig());
            const result = await javbus.fetchActor('メロディー・雛・マークス', {
                needNextLevel: () => false,
                save: t => {}
            });
            console.log(result);
        })
    })
});