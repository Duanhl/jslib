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


describe('Sync Form', () => {
    const config = Config.defaultConfig();


    const browserService = new BrowserService();
    const shtScrapy = new ShtProvider(browserService, config);

    const javlib = new JavlibProvider(config);
    const javbus = new JavbusProvider(config);
    const manko = new Manko(config);

    const db = new DB(config.dbpath);
    const shtService = new ShtService(db);


    const db2 = new DB('D:/dev/lib.db');
    const torrentService = new TorrentService(db2);
    const movieService = new MovieService(db2);

    const syncService = new SyncService(shtScrapy, javlib, manko, javbus,
        movieService, shtService, torrentService);


    describe('sync thread', () => {
        it('sync thread', async () => {
            const options = [
                {form: 2, start: 1, end: 2, syncDetails: true},
                {form: 36, start: 1, end: 2, syncDetails: true},
                {form: 103, start: 1, end: 2, syncDetails: true},
                {form: 95, start: 1, end: 5, syncDetails: false},
            ]

            await syncService.syncSht(options);
            await browserService.dispose();
        })
    })


    describe('sync movie', () => {
        it('ABF-261', async () => {
            const movie = await syncService.syncMovie({sn: 'ABF-261'});
            console.log(movie);
        })
    })

})