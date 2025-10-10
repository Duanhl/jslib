import path from "node:path";
import os from "node:os";


const filterSet = new Set<string>([
    "ENKI",
    "TIKB",
    "BBSS",
    "FCDSS",
    "BMW",
    "PHD",
    "UMSO",
    "REXD",
    "MMB",
    "MIZD",
    "OFJE",
    "IDBD",
    "ATAD",
    "ATKD",
    "RBB",
    "TRE",
    "PPT",
    "FIR",
    "PBD",
    "PPBD",
    "MKCK",
    "OMTP",
    "MBYD",
    "OMHD",
    "KIBD",
    "RVG",
    "APAO",
    "HNDB",
    "MDBK",
    "MUCD",
    "GAID",
    "KSBJ",
    "CJOB",
    "HJBB",
    "PFES",
    "KWBD",
    "SQTE",
    "CADV",
    "DVAJ",
    "UMD",
    "NACX",
    "NASH",
    "XRW",
    "JUSD",
    "MDB",
    "MCSR",
    "SSHN",
    "LZBS",
    "HFD",
    "MMXD",
    "AVS",
    "AVSA",
    "SERO",
    "MIBD",
    "NASS",
    "IENE",
    "TOMN",
    "DOKS",
    "CLUB",
    "MMYM",
    "KFNE",
    "DKSB",
    "HDKA",
    "SVS",
    "GNE",
    "HRV",
    "DMOW",
    "YPAA",
    "GAH",
    "OKAX",
    "AGMX",
    "KAGP",
    "MXDLP",
    "MXSPS",
])

export class Config {
    constructor(private readonly _dbpath: string,
                private readonly _dbTracing: boolean,
                private readonly _shtHost: string,
                private readonly _shtTracing: boolean,
                private readonly _mankoHost: string,
                private readonly _javbusHost: string,
                private readonly _javlibHost: string) {
    }

    get dbpath(): string {
        return this._dbpath;
    }

    get isDbTracing(): boolean {
        return this._dbTracing;
    }

    get shtHost(): string {
        return this._shtHost;
    }

    get isShtTracing(): boolean {
        return this._shtTracing
    }

    get mankoHost(): string {
        return this._mankoHost;
    }

    get javbusHost(): string {
        return this._javbusHost;
    }

    get javlibHost(): string {
        return this._javlibHost;
    }

    static get blackList(): Set<string> {
        return filterSet;
    }

    static defaultConfig(): Config {
        return new Config(
            path.join(os.homedir(), '.jslib/lib.db'),
            true,
            'https://espa.3n852.net/',
            false,
            "https://quickmessenger.org",
            "https://www.fanbus.ink/",
            "https://www.y94i.com/cn"
        )
    }
}