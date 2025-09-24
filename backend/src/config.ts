import path from "node:path";
import os from "node:os";


export class Config {
    constructor(private readonly _dbpath: string,
                private readonly _libDbPath: string,
                private readonly _dbTracing: boolean,
                private readonly _shtHost: string,
                private readonly _shtTracing: boolean,
                private readonly _mankoHost: string,
                private readonly _javbusHost: string,
                private readonly _javlibHost: string) {
    }

    get libDbPath(): string {
        return this._libDbPath;
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

    static defaultConfig(): Config {
        return new Config(
            path.join(os.homedir(), '.jslib/index.db'),
            'D:/dev/lib.db',
            true,
            'https://espa.3n852.net/',
            false,
            "https://quickmessenger.org",
            "https://www.fanbus.ink/",
            "https://www.y94i.com/cn"
        )
    }
}