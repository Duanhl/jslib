const BLACKLIST = ['HTHD', 'FGAN', 'JRZE', 'XMOM', 'EUUD', 'Access']

export function isBlacked(sn: string): boolean {
    for (const item of BLACKLIST) {
        if (sn.indexOf(item) !== -1) {
            return true;
        }
    }
    return false;
}