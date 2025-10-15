import path from "node:path";
import os from "node:os";
import * as fs from "node:fs";
import EventEmitter from "node:events";
import {ConfigItem, IConfigService} from "@jslib/common";


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

export interface ConfigData {
    dbpath: string;
    dbTracing: boolean;
    shtHost: string;
    shtTracing: boolean;
    mankoHost: string;
    javbusHost: string;
    javlibHost: string;
    missavHost: string;
}

export class Config extends EventEmitter {
    private _data: ConfigData;
    private readonly configPath: string;

    constructor(configPath?: string) {
        super();
        this.configPath = configPath || path.join(os.homedir(), '.jslib', 'config.json');
        this._data = this.loadConfig();
    }

    private loadConfig(): ConfigData {
        const defaultConfig = {
            dbpath: path.join(os.homedir(), '.jslib', 'lib.db'),
            dbTracing: true,
            shtHost: 'https://espa.3n852.net/',
            shtTracing: false,
            mankoHost: 'https://quickmessenger.org',
            javbusHost: 'https://www.fanbus.ink/',
            javlibHost: 'https://www.y94i.com/cn',
            missavHost: 'https://javxx.com/ja/',
        } as ConfigData;
        try {
            if (fs.existsSync(this.configPath)) {
                const data = fs.readFileSync(this.configPath, 'utf-8');
                return {...defaultConfig, ...JSON.parse(data)};
            }
        } catch (error) {
            console.warn('Failed to load config, using defaults:', error);
        }

        return defaultConfig;
    }

    private saveConfig(): void {
        try {
            const dir = path.dirname(this.configPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.configPath, JSON.stringify(this._data, null, 2));
            this.emit('configChanged', this._data);
        } catch (error) {
            console.error('Failed to save config:', error);
        }
    }

    get data(): ConfigData {
        return { ...this._data };
    }

    get dbpath(): string {
        return this._data.dbpath;
    }

    get isDbTracing(): boolean {
        return this._data.dbTracing;
    }

    get shtHost(): string {
        return this._data.shtHost;
    }

    get isShtTracing(): boolean {
        return this._data.shtTracing;
    }

    get mankoHost(): string {
        return this._data.mankoHost;
    }

    get javbusHost(): string {
        return this._data.javbusHost;
    }

    get javlibHost(): string {
        return this._data.javlibHost;
    }

    get missavHost(): string {
        return this._data.missavHost;
    }

    updateConfig(updates: Partial<ConfigData>): void {
        this._data = { ...this._data, ...updates };
        this.saveConfig();
    }

    static get blackList(): Set<string> {
        return filterSet;
    }

    static defaultConfig(): Config {
        return new Config();
    }
}


export class ConfigService implements IConfigService {
    private config: Config;

    constructor(config?: Config) {
        this.config = config || new Config();
    }

    async list(): Promise<ConfigItem[]> {
        const data = this.config.data;

        return [
            {
                key: 'dbpath',
                value: data.dbpath,
                description: '数据库文件路径'
            },
            {
                key: 'dbTracing',
                value: data.dbTracing,
                description: '是否启用数据库调试日志'
            },
            {
                key: 'shtHost',
                value: data.shtHost,
                description: 'SHT服务主机地址'
            },
            {
                key: 'shtTracing',
                value: data.shtTracing,
                description: '是否启用SHT服务调试日志'
            },
            {
                key: 'mankoHost',
                value: data.mankoHost,
                description: 'Manko Host'
            },
            {
                key: 'javbusHost',
                value: data.javbusHost,
                description: 'JavBus Host'
            },
            {
                key: 'javlibHost',
                value: data.javlibHost,
                description: 'JavLib Host'
            },
            {
                key: 'missavHost',
                value: data.missavHost,
                description: 'MissAv Host'
            }
        ];
    }

    async update(args: {key: string, value: string | boolean | number}): Promise<void> {
        const validKeys = ['dbpath', 'dbTracing', 'shtHost', 'shtTracing', 'mankoHost', 'javbusHost', 'javlibHost', 'missavHost'];

        if (!validKeys.includes(args.key)) {
            throw new Error(`Invalid config key: ${args.key}`);
        }

        const updateData: any = {};
        updateData[args.key] = args.value;

        this.config.updateConfig(updateData);
    }
}

