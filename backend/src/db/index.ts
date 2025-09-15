import {Database } from "sqlite3";
import {sleep} from "../utils";


export class DB {

    private readonly whenConnected = this.connect(true);

    constructor(private readonly dbPath: string,
                private readonly isTracing: boolean = false) {
    }

    async get(sql: string, params: any): Promise<any[]> {
        const db = await this.whenConnected;
        const stmt = db.prepare(sql, params);

        return new Promise((resolve, reject) => {
            stmt.all((err: Error | null, rows: any[]) => {
                if(err) {
                    this.handleSQLiteError(`[db get(): ${err}`);
                    return reject(err);
                }

                return resolve(rows);
            })
        });
    }

    async run(sql: string, params?: any): Promise<void> {
        const db = await this.whenConnected;


        return new Promise((resolve, reject) => {
            try {
                const stmt = db.prepare(sql);
                stmt.run(params, (error: Error | null) => {
                    if (error) {
                        this.handleSQLiteError(`[db exec(): ${error}`);
                        return reject(error);
                    }
                    return resolve();
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

    async transaction(transactions: () => void): Promise<void> {
        const db = await this.whenConnected;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                transactions();

                db.run('END TRANSACTION', error => {
                    if (error) {
                        this.handleSQLiteError(`[db transaction(): ${error}`);

                        return reject(error);
                    }

                    return resolve();
                });
            });
        });
    }

    async dispose(): Promise<void> {
        const db = await this.whenConnected;
        db.close();
    }


    private async connect(retryOnBusy: boolean): Promise<Database> {
        try {
            return this.doConnect(this.dbPath)
        } catch (error: any) {
            console.error(`[storage ${this.dbPath}] open(): Unable to open DB due to ${error}`);

            if(error.code === 'SQLITE_BUSY' && retryOnBusy) {
                await sleep(2000);

                return this.connect(false);
            }

            throw error;
        }
    }

    private async doConnect(path: string): Promise<Database> {
        return new Promise((resolve, reject) => {
            import('sqlite3').then((sqlite3) => {
                const db: Database = new (this.isTracing ? sqlite3.verbose() : sqlite3).Database(path, (err: Error | null) =>{
                    if(err) {
                        return db ? db.close(() => reject(err)) : reject(err);
                    }
                    return resolve(db);
                });

                db.on('error', err => {this.handleSQLiteError(`[db init error (event): ${err}`)});

                if(this.isTracing) {
                    db.on('trace', (sql: string) => console.trace(`[db trace (event): ${sql}`));
                }
            }, reject)
        });
    }

    private handleSQLiteError(msg: string): void {
        console.error(msg);
    }

}