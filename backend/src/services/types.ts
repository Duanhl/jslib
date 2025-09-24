import {RankType} from "./provider/provider";

export interface RankMovie {
    sn?: string;
    title?: string;
    score?: string;
    releaseDate?: string;
    rankType?: RankType;
    thumbURL?: string;
    homepage?: string;
    provider?: string;
}