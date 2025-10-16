import Database, {Statement} from "better-sqlite3";
import {toCamel} from "../common/utils";
import logger from "../common/logs";


export class DB {

    private readonly db: Database.Database;
    private preparedStatements: Map<string, Statement> = new Map();

    constructor(private readonly dbPath: string,
                isDbTracing: boolean = false) {
        try {
            this.db = new Database(this.dbPath, {
                verbose: isDbTracing ? console.log : undefined,
                fileMustExist: false,
                timeout: 5000
            });

            logger.info(`db connection successfully in ${this.dbPath}`);
        } catch (error) {
            logger.error(`db connection error: ${error}`);
            throw error;
        }
    }

    private prepareStatement(sql: string): Statement {
        const cached = this.preparedStatements.get(sql);
        if (cached) {
            return cached;
        }

        try {
            const statement = this.db.prepare(sql);
            this.preparedStatements.set(sql, statement);
            return statement;
        } catch (error) {
            logger.error(`prepareStatement error: ${error}`);
            throw error;
        }
    }

    query<T = any>(sql: string, namedParams?: Record<string, any>): T[] {
        try {
            const statement = this.prepareStatement(sql);

            if (namedParams) {
                return statement.all(namedParams).map(obj => toCamel(obj as any)) as T[];
            }
            return statement.all([]) as T[];
        } catch (error) {
            console.error(`query error: ${error}`);
            throw error;
        }
    }

    execute(sql: string, namedParams?: Record<string, any>): number {
        try {
            const statement = this.prepareStatement(sql);

            let result: Database.RunResult;
            if (namedParams) {
                result = statement.run(namedParams);
            } else {
                result = statement.run([]);
            }

            return result.changes;
        } catch (error) {
            console.error(`execute error: ${error}`);
            throw error;
        }
    }

    transaction(callback: () => void): void {
        try {
            this.db.transaction(callback)();
        } catch (error) {
            console.error(`createTransaction error: ${error}`);
            throw error;
        }
    }

    async dispose(): Promise<void> {
        this.preparedStatements.clear();
        this.db.close();
    }

    createOrUpdate(
        tableName: string,
        obj: Record<string, any>,
        key: string
    ): 'inserted' | 'updated' {
        /* 1. 驼峰 -> 下划线 */
        const entry = Object.entries(obj).reduce<Record<string, any>>((acc, [k, v]) => {
            const under = k.replace(/[A-Z]/g, m => '_' + m.toLowerCase());
            acc[under] = v;
            return acc;
        }, {});

        const keyUnder = key.replace(/[A-Z]/g, m => '_' + m.toLowerCase());

        /* 2. 过滤空值，用于更新阶段 */
        const toUpdate = Object.entries(entry)
            .filter(([, v]) => v !== null && v !== undefined && v !== '')
            .reduce<Record<string, any>>((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});

        if (Object.keys(toUpdate).length === 0) {
            throw new Error('No valid column to update');
        }

        /* 3. 查询唯一键是否存在 */
        const existStmt = `SELECT 1
                           FROM ${tableName}
                           WHERE ${keyUnder} = @${keyUnder} LIMIT 1`;
        const exists = this.query(existStmt, {[keyUnder]: entry[keyUnder]}).length > 0;

        if (exists) {
            /* 4. 更新 */
            const setClause = Object.keys(toUpdate)
                .map(col => `${col} = @${col}`)
                .join(', ');
            const updateSql = `UPDATE ${tableName}
                               SET ${setClause}
                               WHERE ${keyUnder} = @${keyUnder}`;
            this.execute(updateSql, {...toUpdate, [keyUnder]: entry[keyUnder]});
            return 'updated';
        } else {
            /* 5. 插入 */
            const cols = Object.keys(entry);
            const placeholders = cols.map(c => `@${c}`).join(', ');
            const insertSql = `INSERT INTO ${tableName} (${cols.join(', ')})
                               VALUES (${placeholders})`;
            this.execute(insertSql, entry);
            return 'inserted';
        }
    }

    create(tableName: string,
           obj: Record<string, any>) {
        const entry = Object.entries(obj).reduce<Record<string, any>>((acc, [k, v]) => {
            if(v) {
                const under = k.replace(/[A-Z]/g, m => '_' + m.toLowerCase());
                if(v instanceof Array) {
                    acc[under] = JSON.stringify(v);
                } else {
                    acc[under] = v;
                }
            }
            return acc;
        }, {});

        const cols = Object.keys(entry);
        const placeholders = cols.map(c => `@${c}`).join(', ');
        const insertSql = `INSERT INTO ${tableName} (${cols.join(', ')})
                           VALUES (${placeholders})`;
        this.execute(insertSql, entry);
    }

}