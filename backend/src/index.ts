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
import * as fs from "node:fs";

const PORT = 3123;

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
        app.on('error', (err) => {
            console.log(err);
        })

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`)
        });
    }

    private initRoutes(app: Express, shtService: ShtService, movieService: MovieService, torrentService: TorrentService,
                       syncService: SyncService): void {
        this.registerRoute(app, 'thread', shtService, ['createOrUpdate'])
        this.registerRoute(app, 'movie', movieService, ['videoDetails'])
        this.registerRoute(app, 'torrent', torrentService, ['saveTorrent'])
        this.registerRoute(app, 'sync', syncService, ['syncSht']);

        this.videoHandler(app, movieService);
        const staticPath = path.resolve(__dirname, '../dist/static');
        app.use(express.static(staticPath));

        app.get('/', (_req, res) => {
            res.sendFile(path.join(staticPath, 'index.html'));
        });
    }

    private initConfig(): Config {
        return Config.defaultConfig();
    }

    private videoHandler(app: Express, movieService: MovieService): void {
        app.get('/video', async (req, res) => {
            try {
                let {sn} = req.query;
                sn = sn as string;
                const video = await movieService.videoDetails(sn);
                if (!video) {
                    res.json({success: false, message: 'You must specify a location!'});
                    return;
                }
                if (!fs.existsSync(video.filePath)) {
                    throw new Error('file does not exist');
                }
                res.setHeader('Content-Typ', video.mime);
                res.setHeader('Accept-Ranges', 'bytes');

                const fileSize = parseInt(video.size);
                const range = req.headers.range;
                if (range) {
                    const parts = range.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunksize = (end - start) + 1;

                    res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
                    res.setHeader('Content-Length', chunksize.toString());
                    res.status(206); // Partial Content

                    const fileStream = fs.createReadStream(video.filePath, {start, end});
                    fileStream.pipe(res);
                } else {
                    res.setHeader('Content-Length', fileSize.toString());
                    res.status(200);

                    const fileStream = fs.createReadStream(video.filePath);
                    fileStream.pipe(res);
                }
            } catch (error) {
                console.error('Video handler error:', error);
                res.json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        })
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