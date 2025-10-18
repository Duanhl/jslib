import {Movie, Torrent} from "@jslib/common";


/**
 * 从任意文本中提取番号并规范化
 * @param {string} text
 * @returns {string[]}
 */
export function extractCode(text: string): string | undefined {
    const m = text.match(/\b([A-Z]{1,7})-?(\d{2,5})\b/);
    return m ? `${m[1]}-${m[2]}` : undefined;
}

export function extractAmateurCode(text: string): string | undefined {
    const m = text.match(/\b(\d{3,4})([A-Z]{1,6})-?(\d{2,5})\b/);
    return m ? `${m[1]}${m[2]}-${m[3]}` : undefined;
}

export function extractFC2(text: string): string | undefined {
    const fc2Match = text.match(/\b(FC2)-?(PPV)-?(\d{5,8})\b/i);
    if (fc2Match) {
        return `FC2PPV-${fc2Match[3]}`;
    }
    const fc2Match2 = text.match(/\b(FC)-?(\d{5,8})\b/i)
    if (fc2Match2) {
        return `FC2PPV-${fc2Match2[2]}`;
    }
    return undefined;
}

export function extractT38(text: string): string | undefined {
    const t38Match = text.match(/\b(T38)-?(\d{3,4})\b/i);
    if(t38Match) {
        return `T38-${t38Match[2]}`;
    }
    return undefined;
}

export function extractFC2OrCode(text: string): string | undefined {
    return extractFC2(text) || extractAmateurCode(text) || extractT38(text) || extractCode(text);
}

export function pickDate (str: string): string | undefined {
    return str.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '';
}

export function decode91(e: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';
    const getVal = (c: string) => alphabet.indexOf(c);
    const bytes = [];

    let buf = 0, bits = 0, tail = -1;

    for (let i = 0; i < e.length; i++) {
        const v = getVal(e[i]);
        if (v < 0) continue;          // 跳过非法字符

        if (tail < 0) {               // 前一个字符还没用
            tail = v;
        } else {
            tail += 91 * v;             // 拼 91 进制数
            buf |= tail << bits;
            bits += (tail & 8191) > 88 ? 13 : 14;

            while (bits >= 8) {
                bytes.push(buf & 255);
                buf >>>= 8;
                bits -= 8;
            }
            tail = -1;
        }
    }

    if (tail >= 0) bytes.push((buf | (tail << bits)) & 255);

    // Buffer 浏览器可用 Uint8Array + TextDecoder 代替
    return Buffer.from(bytes).toString('utf-8');
}


export function parseRelativeDay(str = '') {
    const now = new Date();

    // 1. 提取所有数字+单位
    const tokens = str.match(/(\d+)\s*(周|天|日|小时|時|分钟|分|秒)/g) || [];
    const delta = { w: 0, d: 0, h: 0, m: 0, s: 0 };

    tokens.forEach(t => {
        // @ts-ignore
        const [, n, unit] = t.match(/(\d+)\s*(.+)/);
        switch (unit[0]) {
            case '周': delta.w = +n; break;
            case '天':
            case '日': delta.d = +n; break;
            case '小':
            case '時': delta.h = +n; break;
            case '分': delta.m = +n; break;
            case '秒': delta.s = +n; break;
        }
    });

    // 2. 计算目标日期（忽略时分秒，只“向下”取整天）
    const target = new Date(now);
    target.setDate(target.getDate()
        - delta.w * 7
        - delta.d
        - (delta.h > 0 || delta.m > 0 || delta.s > 0 ? 1 : 0)); // 只要有余数就算前一天

    // 3. 格式化
    return target.toISOString().slice(0, 10);
}

// naming.ts
type PlainObj = Record<string, any>;

/** 下划线 → 小驼峰 */
export function toCamel(obj: PlainObj): PlainObj {
    const res: PlainObj = {};
    for (const key of Object.keys(obj)) {
        const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        res[camel] = obj[key];
    }
    return res;
}

/** 小驼峰 → 下划线 */
export function toSnake(obj: PlainObj): PlainObj {
    const res: PlainObj = {};
    for (const key of Object.keys(obj)) {
        const snake = key.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);
        res[snake] = obj[key];
    }
    return res;
}

export function mergeMovie(a: Movie, b: Movie): Movie {
    const result: Movie = {} as Movie;

    // 合并普通属性
    const simpleFields: (keyof Movie)[] = [
        'sn', 'title', 'director', 'duration', 'maker', 'publisher',
        'releaseDate', 'series', 'score', 'wanted', 'location', 'coled'
    ];

    simpleFields.forEach(field => {
        const aValue = a[field];
        const bValue = b[field];

        if (hasValue(bValue)) {
            // @ts-ignore
            result[field] = bValue;
        } else if (hasValue(aValue)) {
            // @ts-ignore
            result[field] = aValue;
        }
    });

    // 合并数组属性 - actors
    if (a.actors || b.actors) {
        result.actors = mergeArrays(a.actors, b.actors);
    }

    // 合并数组属性 - associates
    if (a.associates || b.associates) {
        result.associates = mergeArrays(a.associates, b.associates);
    }

    // 合并数组属性 - players
    if (a.players || b.players) {
        result.players = mergeArrays(a.players, b.players);
    }

    // 合并数组属性 - previewImages
    if (a.previewImages || b.previewImages) {
        result.previewImages = mergeArrays(a.previewImages, b.previewImages);
    }

    // 合并 genres - 去重合并
    if (a.genres || b.genres) {
        const allGenres = [...(a.genres || []), ...(b.genres || [])];
        result.genres = Array.from(new Set(allGenres)).filter(hasValue);
    }

    // 合并 torrents - 按 magnet 去重
    if (a.torrents || b.torrents) {
        const torrentMap = new Map<string, Torrent>();

        // 先添加 a 的 torrents
        (a.torrents || []).forEach(torrent => {
            if (torrent.magnet) {
                torrentMap.set(torrent.magnet, torrent);
            }
        });

        // 再添加/覆盖 b 的 torrents
        (b.torrents || []).forEach(torrent => {
            if (torrent.magnet) {
                torrentMap.set(torrent.magnet, torrent);
            }
        });

        result.torrents = Array.from(torrentMap.values());
    }

    // 合并 comments
    if (a.comments || b.comments) {
        result.comments = [...(a.comments || []), ...(b.comments || [])];
    }

    // 合并 coverUrl - 优先级处理
    result.coverUrl = mergeCoverUrl(a.coverUrl, b.coverUrl);

    return result;
}

// 辅助函数：检查值是否有意义
function hasValue(value: any): boolean {
    if (value === undefined || value === null) return false;
    if (value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (value === 0) return false; // 根据需求，0 被认为是空值
    return true;
}

// 辅助函数：合并数组
function mergeArrays(a?: any[], b?: any[]): any[] {
    const aArray = a || [];
    const bArray = b || [];

    return bArray.length >= aArray.length ? [...bArray] : [...aArray];
}

// 辅助函数：合并 coverUrl，带优先级
function mergeCoverUrl(a?: string, b?: string): string | undefined {
    const urls = [a, b].filter(hasValue) as string[];

    if (urls.length === 0) return undefined;

    // 优先级排序：'cosmoimport' > 'healertanker' > 其他
    const priorityUrls = urls.filter(url => url.includes('cosmoimport'));
    if (priorityUrls.length > 0) return priorityUrls[0];

    const secondaryUrls = urls.filter(url => url.includes('healertanker'));
    if (secondaryUrls.length > 0) return secondaryUrls[0];

    // 返回第一个有效的 URL
    return urls[0];
}