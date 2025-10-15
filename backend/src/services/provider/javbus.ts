import {FetchOptions, IProvider} from "./provider";
import {ActorInfo, Movie, Torrent} from "@jslib/common";
import {Config} from "../../config";
import axios from 'axios';
import * as cheerio from "cheerio";
import {extractAmateurCode, extractCode, extractFC2} from "../../common/utils";
import * as opencc from "opencc-js"

const t2s   = opencc.Converter({ from: 'tw', to: 'cn' })

interface ActorSearchResult {
    homepage: string;
    name: string;
    provider: string;
}

interface MovieSearchResult {
    homepage: string;
    sn: string;
    provider: string;
}

export class JavbusProvider implements IProvider {

    private host: string;
    private axiosInstance;
    constructor(config: Config) {
        this.host = config.javbusHost;

        const createAxios = (host: string) => {
            return axios.create({
                baseURL: host,
                headers: {
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    "priority": "u=0, i",
                    "referer": host,
                    "Sec-Fetch-Site": "none",
                    "sec-ch-ua": "Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
                    "cache-control": "max-age=0",
                    "Cookie": "existmag=mag; PHPSESSID=lf4334djgca44jmrv1cl5k6db6"
                },
                maxRedirects: 0,
                validateStatus: (status: number) => status < 400
            });
        }
        this.axiosInstance = createAxios(this.host);

        config.on("configChanged", (data) => {
            this.host = data.javlibHost;
            this.axiosInstance = createAxios(this.host);
        })
    }

    private async _requestWithRetry(url: string, maxAttempts: number = 3): Promise<string> {
        let attempt = 0;

        while (attempt < maxAttempts) {
            try {
                const response = await this.axiosInstance.get(url);
                return response.data;
            } catch (error) {
                attempt++;
                if (attempt >= maxAttempts) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
            }
        }
        throw new Error(`Failed to fetch ${url} after ${maxAttempts} attempts`);
    }
    private async _searchActor(name: string): Promise<ActorSearchResult[]> {
        const url = `${this.host}/searchstar/${encodeURIComponent(name)}`;
        const html = await this._requestWithRetry(url);
        const $ = cheerio.load(html);
        const results: ActorSearchResult[] = [];

        $('.avatar-box').each((_, element) => {
            const $element = $(element);
            const actor: ActorSearchResult = {
                homepage: $element.attr('href') || '',
                name: $element.find('div > img').attr('title') || '',
                provider: 'javbus'
            };
            results.push(actor);
        });

        return results;
    }

    private async _searchActorMovie(homepage?: string): Promise<MovieSearchResult[]> {
        if (!homepage) {
            return [];
        }

        const results: MovieSearchResult[] = [];
        let page = 1;

        while (true) {
            let url: string;
            if (page === 1) {
                url = homepage;
            } else {
                url = `${homepage}/${page}`;
            }

            try {
                const html = await this._requestWithRetry(url);
                const $ = cheerio.load(html);
                let cnt = 0;

                $('#waterfall .movie-box').each((_, element) => {
                    const $element = $(element);
                    const movie: MovieSearchResult = {
                        homepage: $element.attr('href') || '',
                        sn: '',
                        provider: 'javbus'
                    };

                    $element.find('.photo-info > span > date').each((i, dateElement) => {
                        if (i === 0) {
                            movie.sn = $(dateElement).text().trim();
                        }
                    });

                    results.push(movie);
                    cnt++;
                });

                if (cnt === 0) {
                    break;
                }

                page++;
            } catch (error) {
                break;
            }
        }

        return results;
    }

    private async _getActorInfoByURL(url: string): Promise<ActorInfo> {
        const html = await this._requestWithRetry(url);
        const $ = cheerio.load(html);
        const actor = {} as ActorInfo;

        const $avatarBox = $('.avatar-box');
        actor.name = $avatarBox.find('.pb10').text().trim();

        $avatarBox.find('.photo-info > p').each((_, element) => {
            const text = $(element).text().trim();
            if (text.startsWith('身高:')) {
                actor.height = text.slice(3).trim();
            } else if (text.startsWith('罩杯:')) {
                actor.cup = text.slice(3).trim();
            } else if (text.startsWith('生日:')) {
                actor.birthday = text.slice(3).trim();
            } else if (text.startsWith('胸圍:')) {
                actor.chest = text.slice(3).trim();
            } else if (text.startsWith('腰圍:')) {
                actor.waist = text.slice(3).trim();
            } else if (text.startsWith('臀圍:')) {
                actor.hip = text.slice(3).trim();
            } else if (text.startsWith('愛好:')) {
                actor.hobby = text.slice(3).trim();
            }
        });

        return actor;
    }

    private async _getMovieInfoByURL(rawURL: string): Promise<Movie> {
        const url = new URL(rawURL);
        const sn = url.pathname.split('/').pop() || '';

        const info = {
            sn,
            previewImages: [] as string[],
            actors: [] as string[],
        } as Movie;

        const html = await this._requestWithRetry(rawURL);
        const $ = cheerio.load(html);

        // Image+Title
        const $bigImage = $('a.bigImage img');
        info.title = $bigImage.attr('title') || '';

        // Fields
        $('div.col-md-3.info p').each((_, element) => {
            const $element = $(element);
            const spanText = $element.find('span').first().text().trim();
            const content = $element.contents().filter((_, node) => node.nodeType === 3).text().trim();

            switch (spanText) {
                case '識別碼:':
                    info.sn = $element.find('span').eq(1).text().trim();
                    break;
                case '發行日期:':
                    info.releaseDate = content.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '';
                    break;
                case '長度:':
                    info.duration = content.match(/\d{2,3}/)?.[0] || '';
                    break;
                case '導演:':
                    info.director = $element.find('a').text().trim();
                    break;
                case '製作商:':
                    info.maker = $element.find('a').text().trim();
                    break;
                case '發行商:':
                    info.publisher = $element.find('a').text().trim();
                    break;
                case '系列:':
                    info.series = $element.find('a').text().trim();
                    break;
            }
        });

        // Previews
        $('#sample-waterfall a').each((_, element) => {
            const img = $(element).attr('href');
            if (img && img.includes('dmm.co.jp')) {
                info.previewImages!.push(img);
            }
        });

        info.genres = $('span.genre > label > a').map((_, element) => {
            const genre = $(element).text().trim();
            return t2s(genre);
        }).get().filter(Boolean)

        // Actors
        $('div.star-name').each((_, element) => {
            const actorName = $(element).find('a').attr('title');
            if (actorName) {
                info.actors!.push(actorName);
            }
        });

        const associates = $('#related-waterfall .movie-box').map((_, el) => {
                const href = $(el).attr('href');
                if (!href) return null;
                // 2. 解析 pathname 并取最后一段
                try {
                    const pathname = new URL(href).pathname; // "/REBD-951"
                    return extractCode(pathname.split('/').pop()!);        // "REBD-951"
                } catch {
                    return null;
                }
            })
            .get().filter(Boolean);
        info.associates = [...new Set(associates)];

        // magnetUrl
        const script = $('body > script:nth-child(9)').html();
        if (script) {
            const gidMatch = script.match(/gid\s*=\s*([^;]+)/);
            const img = $('.movie .screencap > a').attr('href');

            if (gidMatch && img) {
                const gid = gidMatch[1].trim();
                const magnetUrl = `${this.host}ajax/uncledatoolsbyajax.php?gid=${gid}&lang=zh&img=${img}&uc=0&floor=895`;
                info.torrents = await this._getTorrentsByURL(magnetUrl);
                info.torrents.forEach(torrent => {
                    torrent.provider = 'javbus'
                    torrent.sn = info.sn
                })
            }
        }

        return info;
    }

    private async _getTorrentsByURL(rawUrl: string): Promise<Torrent[]> {
        const html = await this._requestWithRetry(rawUrl);
        const fullHtml = `<html><head></head><body><table>${html}</table></body></html>`
        const $ = cheerio.load(fullHtml);
        const torrents: Torrent[] = [];

        $('tr').each((_, element) => {
            const $element = $(element);
            const torrent = {} as Torrent;

            $element.find('td').each((i2, child) => {
                const $child = $(child);
                if (i2 === 0) {
                    torrent.dn = $child.find('a').text().trim();
                    const onclick = $child.attr('onclick');
                    if (onclick) {
                        const magnetMatch = onclick.match(/'([^']+)'/);
                        if (magnetMatch) {
                            torrent.magnet = magnetMatch[1].substring(0, 60);
                        }
                    }
                } else if (i2 === 1) {
                    torrent.size = $child.find('a').text().trim();
                } else if (i2 === 2) {
                    torrent.releaseDate = $child.find('a').text().trim();
                }
            });

            if (torrent.dn) {
                torrents.push(torrent);
            }
        });

        return torrents;
    }


    async fetchMovie(keyword: string): Promise<Movie | undefined> {
        if(extractFC2(keyword) || extractAmateurCode(keyword)) {
            return
        }
        if(!extractCode(keyword)) {
            return
        }
        try {
            return await this._getMovieInfoByURL(`${this.host}${keyword}`);
        } catch (error: any) {
            console.error(`Error fetching movie [${keyword}], error: ${error.message}`);
            return undefined;
        }
    }

    async fetchActor(keyword: string, options: FetchOptions<Movie>): Promise<{ actor?: ActorInfo; movies: Movie[] }> {
        try {
            // 获取演员信息
            const actorSearch = await this._searchActor(keyword);
            let actor: ActorInfo | undefined;
            let homepage: string | undefined;

            for (const result of actorSearch) {
                if (result.name === keyword) {
                    actor = await this._getActorInfoByURL(result.homepage);
                    homepage = result.homepage;
                    break;
                }
            }

            // 获取演员的电影
            const movieSearchResults = await this._searchActorMovie(homepage);
            const movies: Movie[] =[];

            for (const movieResult of movieSearchResults) {
                if(options.needNextLevel && options.needNextLevel(movieResult as unknown as Movie)) {
                    try {
                        const movieInfo = await this._getMovieInfoByURL(movieResult.homepage);
                        if(options.save) {
                            await options.save(movieInfo);
                        }
                        movies.push(movieInfo);
                    } catch (error: any) {
                        console.error(`Error fetching movie ${movieResult.sn}:`, error);
                    }
                } else {
                    movies.push(movieResult as unknown as Movie);
                }
            }
            return { actor, movies };
        } catch (error) {
            console.error('Error fetching actor:', error);
            return { actor: undefined, movies: [] };
        }
    }

}