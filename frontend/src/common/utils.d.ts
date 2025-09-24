export interface JavSn {
    isJavSn: boolean;
    series?: string;
    number?: string;
}
export declare function extractStandardJavSn(sn: string): JavSn;
export declare function getDmmThumbURL(sn: string, cover?: string): string;
export declare function round(d: number, r?: number): string;
export declare const GENRES: string[];
export declare const SERIES: string[];
