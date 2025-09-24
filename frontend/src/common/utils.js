const standardRegex = new RegExp('([A-Z]{2,6})([-\\s]?)(\\d{3,5})', 'g');
export function extractStandardJavSn(sn) {
    const result = { isJavSn: false };
    if (standardRegex.test(sn)) {
        result.isJavSn = true;
        const replace = sn.replace(standardRegex, '$1,$2,$3');
        result.series = replace.split(',')[0];
        result.number = replace.split(',')[2];
    }
    return result;
}
const prefixMap = {
    "1": ['stars', 'fsdss', 'dldss', 'start', 'moon', 'rctd', 'mtall', 'sdde', 'star',
        'hbad', 'nhdtc', 'svsha', 'wawa', 'ienf', 'mtata', 'dandy', 'sw', 'fns', 'sgki'],
    "2": ["dfe"],
    "118": ['abp', 'abw', 'abf', 'abs', 'spb', 'kit', 'mgt'],
    "24": ['vdd'],
    "h_139": ['dmow'],
    "h_113": ['hr'],
    "h_346": ['rebd', 'rebdb'],
    "h_237": ['clot', 'ambi', 'nacr'],
    "h_086": ["jura"],
    "h_955": ["kv"],
    "h_1712": ["kbr", "fft"],
};
const lookupMap = Object.entries(prefixMap).reduce((acc, [key, values]) => {
    values.forEach(v => acc[v] = key);
    return acc;
}, {});
export function getDmmThumbURL(sn, cover) {
    if (cover) {
        return cover;
    }
    const jvn = extractStandardJavSn(sn);
    if (!jvn.isJavSn) {
        return onNoCover(sn);
    }
    let sns = "";
    if (sn.indexOf('-') > 0) {
        sns = sn.substring(0, sn.indexOf('-')).toLowerCase();
        sn = sn.replace('-', '').toLowerCase();
    }
    else {
        return onNoCover(sn);
    }
    const prefix = lookupMap[sns];
    if (sns === 'nmsl') {
        sn = sn.replace(sns, sns + "00");
        return `https://pics.dmm.co.jp/digital/video/h_1814${sn}/h_1814${sn}pl.jpg`;
    }
    if (!prefix) {
        return `https://pics.dmm.co.jp/mono/movie/adult/${sn}/${sn}pl.jpg`;
    }
    else {
        return `https://pics.dmm.co.jp/mono/movie/adult/${prefix}${sn}/${prefix}${sn}pl.jpg`;
    }
}
export function round(d, r = 1) {
    return d.toFixed(r);
}
function stringHashMod(str) {
    // 步骤1：生成哈希值
    let hash = 5381; // djb2哈希算法的初始值
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash * 33) ^ char; // 位运算提高性能
    }
    // 步骤2：保证哈希值为正整数
    hash = hash >>> 0; // 无符号右移处理负数
    // 步骤3：取模并返回结果
    return hash % 5;
}
function onNoCover(sn) {
    const number = stringHashMod(sn) + 1;
    return `http://localhost:7777/images/cover-${number}.jpg`;
}
export const GENRES = ['美少女', '苗条', '荡妇', '戏剧', '女同性恋', '女佣', '兔女郎', '角色扮演'];
export const SERIES = ['SONE', 'MIMK', 'NIMA', 'IPZZ', 'START', 'MIDA', 'MIDV', 'ABF', 'JUR', 'BBAN'];
//# sourceMappingURL=utils.js.map