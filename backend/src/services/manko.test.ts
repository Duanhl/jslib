import {describe, it} from "vitest";
import {Manko} from "./manko";


describe('manko.test.js', () => {
    it('simple', async () => {
        const manko = new Manko('https://quickmessenger.org');
        await manko.searchActors('Melody Marks');
    })
})