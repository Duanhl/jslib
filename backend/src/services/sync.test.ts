import {describe, it} from "vitest";
import {DB} from "../db";
import {ShtService} from "./sht";
import {ShtProvider} from "./provider/sht";
import {SyncService} from "./sync";
import {BrowserService} from "./provider/browser";
import {Config} from "../config";
import {TorrentService} from "./torrent";
import {MovieService} from "./movie";
import {JavlibProvider} from "./provider/javlib";
import {JavbusProvider} from "./provider/javbus";
import {Manko} from "./provider/manko";
import {MissavProvider} from "./provider/missav";


describe('Sync Form', () => {
    const config = Config.defaultConfig();


    const browserService = new BrowserService();
    const shtScrapy = new ShtProvider(browserService, config);

    const javlib = new JavlibProvider(config);
    const javbus = new JavbusProvider(config);
    const manko = new Manko(config);
    const missavProvider = new MissavProvider(config, browserService);


    const db = new DB(config.dbpath);
    const shtService = new ShtService(db);

    const torrentService = new TorrentService(db);
    const movieService = new MovieService(db);

    const syncService = new SyncService(shtScrapy, javlib, manko, javbus,
        movieService, shtService, missavProvider, torrentService);


    describe('sync thread', () => {
        it('sync thread', async () => {
            const options = [
                {form: 2, start: 1, end: 3, syncDetails: true},
                {form: 36, start: 1, end: 3, syncDetails: true},
                {form: 103, start: 1, end: 3, syncDetails: true},
                {form: 95, start: 1, end: 10, syncDetails: false},
            ]

            await syncService.syncSht(options);
            await browserService.dispose();
        })
    })


    describe('sync movie', () => {
        it('ABF-261', async () => {
            const movie = await syncService.syncMovie({sn: 'ABF-264'});
            console.log(movie);
        })
    })

    describe('sync rank movie', () => {
        it('popular', async () => {
            const result = await syncService.syncRank({type: 'popular'});
            console.log(result);
        })
    })

    describe('sync rank movie', () => {
        it('mostwanted and bestrate', async () => {
            const result1 = await syncService.syncRank({type: 'mostWanted'});
            console.log(result1);

            const result2 = await syncService.syncRank({type: 'bestRated'});
            console.log(result2);
        })
    })

    describe('sync rank movie details', () => {
        it('all', async () => {
            const movies = await movieService.list({
                type: 'bestRated',
                keyword: '2025-10',
                page: 1,
                pageSize: 300
            });

            for (const m of movies.data) {
                let movie;
                try {
                    movie = await movieService.details({sn: m.sn});
                } catch (e) {
                    movie = undefined;
                }
                if (!movie || (!movie.players || movie.players.length === 0)) {
                    await syncService.syncMovie({sn: m.sn});
                }
            }
        })
    })

    describe('sync star', () => {
        it('sync star', async () => {
            const movies = await syncService.syncStar({name: 'メロディー・雛・マークス'}, true);
            console.log(movies);
        })
    })

})