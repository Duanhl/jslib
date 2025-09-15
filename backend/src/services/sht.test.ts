import {assert, describe, it} from 'vitest';
import {ShtScrapyService} from './sht-browser';
import path from 'node:path';
import {DB} from "../db";
import os from "node:os";
import {ShtService} from "./sht";

describe('sht test', () => {

    describe('browser test', () => {
        it('scrap sht', async () => {
            const db = new DB(path.join(os.homedir(), '.jslib/index.db'));
            const shtService = new ShtService(db);
            const shtScrapy = new ShtScrapyService('https://espa.3n852.net/', true);
            await shtScrapy.fetchForm(2, 1, 1,  (t) => shtService.createOrUpdate(t), true);
        })
    })


    describe('sht test', () => {
        it('sht search', async () => {
            const db = new DB(path.join(os.homedir(), '.jslib/index.db'));
            const shtService = new ShtService(db);
            const response = await shtService.search({
                title: 'mollyredwolf',
                pageNo: 1,
                pageSize: 20
            });
            assert.ok(response.total > 20);
            assert.ok(response.threads.length === 20);
        });
    })
})