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

    async listHighCh(args: {keyword: string, page?: number, pageSize?: number}): Promise<Torrent[]> {
        let date = args.keyword;
        if (!date) {
            date = new Date().toISOString().replace(/T/, "");
        }
        const sql = `
            SELECT *
            FROM torrents
            WHERE provider = :provider
              AND release_date = :date
            AND dn = 'HD_Zh'
            ORDER BY id ASC
        `;
        const rows =  this.db.query(sql, {provider: 'sehuatang', date});
        return rows.map(toCamel) as Torrent[];
    }

    /** 保存种子：若 magnet 已存在则先删除再插入；magnet 为空直接忽略 */
    async saveTorrent(torrent: Torrent): Promise<void> {
        if(!torrent.magnet) {
            return
        }
        this.db.createOrUpdate('torrents', this._normalizeTorrent(torrent), 'magnet');
    }

    /** magnet 归一化：截断 60 位，并把第 21 位之后转大写 */
    private _normalizeTorrent(t: Torrent): Torrent {
        let {magnet = ''} = t;
        if (magnet.length > 60) magnet = magnet.slice(0, 60);
        magnet = magnet.slice(0, 20) + magnet.slice(20).toUpperCase();
        return {...t, magnet};
    }
}