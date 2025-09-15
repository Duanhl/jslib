import {DB} from "../db";
import {Thread} from "./sht-browser";

const TABLE = "sht_form"

export interface ThreadSearchOptions {
    title?: string,
    pageNo: number,
    pageSize: number,
    form?: number,
    sn?: string
}

export class ShtService {

    constructor(private readonly db: DB) {
    }

    async createOrUpdate(thread: Thread) {
        try {
            await this.db.run(`insert into ${TABLE}
                                   (thread_id, form, title, url, publish_date, sn, ftype, magnet, img, size)
                               values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [thread.threadId, thread.form, thread.title, thread.url, thread.publishDate, thread.sn,
                    thread.ftype, thread.magnet, thread.img, thread.size])
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                const nonEmptyData = this.filterEmptyValues({
                    form: thread.form,
                    title: thread.title,
                    url: thread.url,
                    publish_date: thread.publishDate,
                    sn: thread.sn,
                    ftype: thread.ftype,
                    magnet: thread.magnet,
                    img: thread.img,
                    size: thread.size,
                });

                const setClause = Object.keys(nonEmptyData)
                    .map(key => `${key} = ?`)
                    .join(', ');

                const updateParams = [
                    ...Object.values(nonEmptyData),
                    thread.threadId
                ];

                const updateSQL = `
                    UPDATE ${TABLE}
                    SET ${setClause}
                    WHERE thread_id = ?
                `;
                await this.db.run(updateSQL, updateParams);
                return
            }

            console.error(`Error inserting into ${TABLE} because ${error}`)
        }
    }

    async search(options: ThreadSearchOptions): Promise<{ threads: Thread[], total: number }> {
        const {
            title = '',
            pageNo = 1,
            pageSize = 20,
            form = null,
            sn = null
        } = options;

        const whereConditions = [];
        const queryParams = [];

        if (title) {
            whereConditions.push('title LIKE ? COLLATE NOCASE');
            queryParams.push(`%${title}%`);
        }

        if (form !== null && form !== undefined && form !== 0) {
            whereConditions.push('form = ?');
            queryParams.push(form);
        }

        if (sn) {
            whereConditions.push('sn = ?');
            queryParams.push(sn);
        }

        const whereClause = whereConditions.length > 0
            ? `WHERE ${whereConditions.join(' AND ')}`
            : '';

        const offset = (pageNo - 1) * pageSize;

        try {
            // 查询数据
            const dataSQL = `
                SELECT thread_id as threadId,
                       form,
                       title,
                       url,
                       publish_date as publishDate,
                       sn,
                       ftype,
                       magnet,
                       img
                FROM ${TABLE} ${whereClause}
                ORDER BY thread_id DESC LIMIT ?
                OFFSET ?
            `;

            const dataParams = [...queryParams, pageSize, offset];
            const rows = await this.db.get(dataSQL, dataParams);

            // 查询总数
            const countSQL = `
                SELECT COUNT(*) as total
                FROM ${TABLE} ${whereClause}
            `;

            const countResult: any[] = await this.db.get(countSQL, queryParams);
            const total = countResult ? countResult[0].total : 0;

            return {
                threads: rows || [],
                total: total,
            };

        } catch (error) {
            console.error('search failed:', error);
            throw error;
        }
    }

    private filterEmptyValues(obj: any) {
        const result = {} as Record<string, any>;
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined && value !== '') {
                result[key] = value;
            }
        }
        return result;
    }
}