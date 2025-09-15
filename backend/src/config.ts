

export class Config {
    constructor(private readonly _dbpath: string,
                private readonly _dbTracing: boolean,
                private readonly _shtHost: string,
                private readonly _shtTracing: boolean,
                private readonly _monkuHost: string) {
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

    get monkuHost(): string {
        return this._monkuHost;
    }
}