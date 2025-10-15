import {IProvider} from "./provider";
import {Movie} from "@jslib/common";
import {extractCode, extractFC2, extractFC2OrCode} from "../../common/utils";
import {Config} from "../../config";
import * as cheerio from "cheerio";
import {BrowserService} from "./browser";

export class MissavProvider implements IProvider {
    private _host: string | undefined;
    // private axios: AxiosInstance;

    constructor(config: Config, private readonly browser: BrowserService) {
        this._host = config.missavHost;

        // const createAxios = (host: string) => {
        //     return axios.create({
        //         timeout: 10000,
        //         baseURL: host,
        //         headers: {
        //             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        //             Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        //             'Accept-Language': 'zh-CN,zh;q=0.9',
        //             'Accept-Encoding': 'gzip, deflate, br',
        //             'Sec-Fetch-Dest': 'document',
        //             'Sec-Fetch-Mode': 'navigate',
        //             'Sec-Fetch-Site': 'none',
        //             'Sec-Fetch-User': '?1',
        //             'Upgrade-Insecure-Requests': '1'
        //         },
        //         httpsAgent: new https.Agent({ maxVersion: 'TLSv1.3' })
        //     })
        // }

        // this.axios = createAxios(this._host);
        config.on('configChanged', data => {
            this._host = data.missavHost;
            // this.axios = createAxios(this._host!);
        })
    }

    async fetchMovie(keyword: string): Promise<Movie | undefined> {
        if(!extractFC2OrCode(keyword)) {
            return
        }
        let path = extractFC2OrCode(keyword)!.toLowerCase();
        if(extractFC2(keyword)) {
            path = path.replace('fc2', 'fc2-')
        }
        const url = this._host + `v/${path}`
        // const response = await this.axios.get(url);
        const page = await this.browser.openPage();
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        const html = await page.content();
        const $search = cheerio.load(html);
        return this._parseMovieDetails($search, `${this._host}v/${path}-uncensored-leaked`);
    }

    private _parseMovieDetails($: cheerio.CheerioAPI, url: string): Movie {
        const result: Record<string, string | string[]> = {}
        $('.meta > div').each((_, row) => {
            const label = $(row).find('label').text().replace(':', ''); // 去掉冒号
            const values = [] as string[];
            $(row).find('span, a').each((_, el) => {
                values.push($(el).text().trim());
            });
            result[label] = values.length === 1 ? values[0] : values; // 单值直接字符串，多值保持数组
        });
        return {
            sn: extractCode(result['代码'] as string)!,
            releaseDate: result['发布日期'] as string,
            duration: result['时长'] as string,
            genres: result['类别'] as string[],
            maker: result['制作商'] as string,
            series: result['行李电视'] as string,
            players: [url]
        }
    }
}