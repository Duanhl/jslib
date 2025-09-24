import {describe, it} from 'vitest'
import {toService} from "./proxy";

describe('proxy', () => {

    interface AService {
        call(keyword: string, page: number, size: number): Promise<string>;
    }

    it('should create proxy', async () => {
        const service = toService<AService>('a');
        const r = await service.call('1', 1, 2)
        console.log(r)
    });
});