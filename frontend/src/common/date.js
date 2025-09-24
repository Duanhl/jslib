export function formatDate(date, fmt) {
    let result = fmt || 'yyyy-MM-dd';
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(result)) {
        result = result.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(result)) {
            const replace = RegExp.$1.length === 1 ? o[k].toString() : ('00' + o[k]).substring(('' + o[k]).length);
            result = result.replace(RegExp.$1, replace);
        }
    }
    return result;
}
//# sourceMappingURL=date.js.map