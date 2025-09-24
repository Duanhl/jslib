import express, {Express} from 'express';
import cors from 'cors';
import {Config} from "./config";
import path from "node:path";
import {DB} from "./db";
import {ShtService} from "./services/sht";
import {MovieService} from "./services/movie";
import {TorrentService} from "./services/torrent";
import {JavlibProvider} from "./services/provider/javlib";
import {JavbusProvider} from "./services/provider/javbus";
import {Manko} from "./services/provider/manko";
import {SyncService} from "./services/sync";
import {ShtProvider} from "./services/provider/sht";
import {BrowserService} from "./services/provider/browser";

const PORT = process.env["PORT"] || 3123;

class Server {
    constructor() {
    }

    async start(): Promise<void> {
        const config = this.initConfig();
        const db = new DB(config.dbpath);
        const libdb = new DB(config.libDbPath)
        const shtService = new ShtService(db);
        const movieService = new MovieService(libdb);
        const torrentService = new TorrentService(libdb);

        const browserService = new BrowserService();
        const javlib = new JavlibProvider(config);
        const javbus = new JavbusProvider(config);
        const manko = new Manko(config);
        const shtProvider = new ShtProvider(browserService, config);
        const syncService = new SyncService(shtProvider, javlib, manko, javbus,
            movieService, shtService, torrentService);

        const app = express();
        app.use(cors())
        app.use(express.json());

        this.initRoutes(app, shtService, movieService, torrentService, syncService)

        app.on('close', () => {
            db.dispose()
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    }

    private initRoutes(app: Express, shtService: ShtService, movieService: MovieService, torrentService: TorrentService,
                       syncService: SyncService): void {
        this.registerRoute(app, 'thread', shtService, ['createOrUpdate'])
        this.registerRoute(app, 'movie', movieService)
        this.registerRoute(app, 'torrent', torrentService, ['saveTorrent'])
        this.registerRoute(app, 'sync', syncService, ['syncSht']);

        const staticPath = path.resolve(__dirname, '../dist/static');
        app.use(express.static(staticPath));

        app.get('/', (_req, res) => {
            res.sendFile(path.join(staticPath, 'index.html'));
        });
    }

    private initConfig(): Config {
        return Config.defaultConfig();
    }

    private registerRoute(app: Express, bathPath: string, service: any,
                          exclude?: string[]): void {
        const apiKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
        for (const key of apiKeys) {
            if (typeof service[key] === 'function'
                && (!exclude || exclude.indexOf(key) === -1)
                && key !== 'constructor'
                && !key.startsWith("_")) {
                const fullPath = `/api/${bathPath}/${key}`.replace(/\/+/g, '/');
                app.post(fullPath, async (req, res) => {
                    try {
                        const result = await service[key](req.body);
                        res.json({success: true, data: result});
                    } catch (e: any) {
                        res.json({success: false, error: e.message});
                    }
                })
            }
        }
    }
}

(async () => {
    await new Server().start()
})();