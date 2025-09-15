import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import {Config} from "./config";
import path from "node:path";
import os from "node:os";
import {DB} from "./db";
import {ShtService} from "./services/sht";
import {isUndefinedOrNull} from "./common/types";

const app = express();
const PORT = process.env.PORT || 3123;


class Server {
    constructor() {
    }

    async start(): Promise<void> {
        const config = this.initConfig();
        const db = new DB(config.dbpath);
        const shtService = new ShtService(db);

        const app = express();
        app.use(cors())

        this.initRoutes(app, shtService)

        app.on('close', () => {
            db.dispose()
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    }

    private initRoutes(app: Express, shtService: ShtService): void {
        app.get('/api/threads/search', async (req: Request, res: Response) => {
            const {
                title, pageNo = '1', pageSize = '20', form, sn
            } = req.query;

            const result = await shtService.search({
                title: this.mapToString(title),
                pageNo: parseInt(this.mapToString(pageNo) || '1'),
                pageSize: parseInt(this.mapToString(pageSize) || '20'),
                form: parseInt(this.mapToString(form) || '0'),
                sn: this.mapToString(sn),
            });

            res.json({
                success: true,
                data: result.threads,
                total: result.total
            });
        });


        const staticPath = path.resolve(__dirname, '../dist/static');
        app.use(express.static(staticPath));

        app.get('/', (_req, res) => {
            res.sendFile(path.join(staticPath, 'index.html'));
        });
    }

    private mapToString(source: any): string | undefined {
        if(isUndefinedOrNull(source)) {
            return undefined;
        }
        if(typeof source === 'string') {
            return source;
        }
        return source.toString();
    }

    private initConfig(): Config {
        return new Config(
            path.join(os.homedir(), '.jslib/index.db'),
            false,
            'https://espa.3n852.net/',
            false,
            "https://quickmessenger.org"
        );
    }
}

(async () => {
    await new Server().start()
})();