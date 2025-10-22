import {describe, it} from 'vitest'
import {syncService, toService} from "./proxy";

describe('proxy', () => {

    interface AService {
        call(keyword: string, page: number, size: number): Promise<string>;
    }

    it('should create proxy', async () => {
        const service = toService<AService>('a');
        const r = await service.call('1', 1, 2)
        console.log(r)
    });

    describe('sync()', () => {
        it('popular', async () => {
            const result =  await syncService.syncRank({type: 'popular', start: 1, end: 2});
            console.log(result);
        })
    })

    describe('sync sht', () => {
        it('sht', async () => {
            const options = [
                {form: 2, start: 1, end: 3, syncDetails: true},
                {form: 36, start: 1, end: 3, syncDetails: true},
                {form: 103, start: 1, end: 3, syncDetails: true},
                {form: 95, start: 1, end: 10, syncDetails: false},
            ]

            await syncService.syncSht(options);
        })
    })
});