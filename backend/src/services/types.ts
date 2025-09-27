import {RankType} from "./provider/provider";

export interface RankMovie {
    sn?: string;
    title?: string;
    releaseDate?: string;
    type?: RankType;
    thumbUrl?: string;
    homepage?: string;
    provider?: string;
}

const BLACKLIST = ['HTHD', 'FGAN', 'JRZE', 'XMOM', 'EUUD', 'Access']

export function isBlacked(sn: string): boolean {
    for (const item of BLACKLIST) {
        if (sn.indexOf(item) !== -1) {
            return true;
        }
    }
    return false;
}