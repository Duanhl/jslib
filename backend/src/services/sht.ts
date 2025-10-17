import {DB} from "../db";
import {IThreadService, Thread} from '@jslib/common'
import logger from "../common/logs";

const TABLE = "sht_form"

export interface ThreadSearchOptions {
    title?: string,
    pageNo: number,
    pageSize: number,
    form?: number,
    sn?: string
}

export class ShtService implements IThreadService {

    constructor(private readonly db: DB) {
    }

    createOrUpdate(thread: Thread) {
        this.db.createOrUpdate(TABLE, thread as Record<string, any>, 'threadId');
    }

    async search(args: { title: string, pageNo?: number, pageSize?: number }): Promise<{
        threads: Thread[],
        total: number
    }> {
        const {title = '', pageNo = 1, pageSize = 20} = args;

        const whereConditions = [];

        if (title) {
            whereConditions.push(`title LIKE '%${title}%' COLLATE NOCASE`);
        }

        const whereClause = whereConditions.length > 0
            ? `WHERE ${whereConditions.join(' AND ')}`
            : '';

        const offset = (pageNo - 1) * pageSize;

        try {
            // 查询数据
            const dataSQL = `
                SELECT thread_id    as threadId,
                       form,
                       title,
                       url,
                       publish_date as publishDate,
                       sn,
                       ftype,
                       magnet,
                       img
                FROM ${TABLE} ${whereClause}
                ORDER BY thread_id DESC LIMIT :pageSize
                OFFSET :offset
            `;

            const dataParams = {pageSize, offset};
            const rows = this.db.query(dataSQL, dataParams);

            // 查询总数
            const countSQL = `
                SELECT COUNT(*) as total
                FROM ${TABLE} ${whereClause}
            `;

            const countResult: any[] = this.db.query(countSQL, dataParams);
            const total = countResult ? countResult[0].total : 0;

            return {
                threads: rows || [],
                total: total,
            };

        } catch (error: any) {
            logger.error(`search failed: ${error.message}`);
            throw error;
        }
    }
}