import {DB} from "../db";
import {toCamel} from "../common/utils";
import {ITorrentService, Torrent} from "@jslib/common";

export class TorrentService implements ITorrentService {
    constructor(private readonly db: DB) {
    }

    async listTorrentsBySN(sn: string): Promise<Torrent[]> {
        const sql = `
            SELECT *
            FROM torrents
            WHERE sn = :sn
            ORDER BY release_date DESC
        `;
        const rows = this.db.query(sql, {sn});
        return rows.map(toCamel) as Torrent[];
    }

    async listHighCh(args: { keyword?: string, page?: number, pageSize?: number }): Promise<{torrents:Torrent[],
    total: number}> {
        let date = args.keyword || '';
        const page = args.page || 1;
        const pageSize = args.pageSize || 20;
        const offset = (page - 1) * pageSize;
        const cntSql = `SELECT count(*) as cnt FROM torrents
                        WHERE provider = :provider
                            ${date && 'AND release_date <= :date'}
              AND dn = 'HD_Zh'`;
        const cntRows = this.db.query(cntSql, {provider: 'sehuatang', date});
        const total = cntRows.length > 0 ? parseInt(cntRows[0]['cnt']) : 0;

        const sql = `
            SELECT *
            FROM torrents
            WHERE provider = :provider
                ${date && 'AND release_date <= :date'}
              AND dn = 'HD_Zh'
            ORDER BY id DESC
            LIMIT :limit OFFSET :offset
        `;
        const rows = this.db.query(sql, {provider: 'sehuatang', date, offset, limit: pageSize});
        return {torrents: rows.map(toCamel) as Torrent[], total: total };
    }

    /** 保存种子：若 magnet 已存在则先删除再插入；magnet 为空直接忽略 */
    async saveTorrent(torrent: Torrent): Promise<void> {
        if (!torrent.magnet) {
            return
        }
        torrent = this._normalizeTorrent(torrent);
        const torrents = this.db.query(`select *
                                        from torrents
                                        where magnet = :magnet`, {magnet: torrent.magnet});
        if (torrents.length > 0) {
            return
        }
        this.db.create('torrents', torrent);
    }

    /** magnet 归一化：截断 60 位，并把第 21 位之后转大写 */
    private _normalizeTorrent(t: Torrent): Torrent {
        let {magnet = ''} = t;
        if (magnet.length > 60) magnet = magnet.slice(0, 60);
        magnet = magnet.slice(0, 20) + magnet.slice(20).toUpperCase();
        return {...t, magnet};
    }
}