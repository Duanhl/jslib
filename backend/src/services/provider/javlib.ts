import {FetchOptions, IProvider, RankType} from "./provider";
import {Config} from "../../config";
import {Comment, Movie} from "@jslib/common";
import {RankMovie} from "../types";
import axios from "axios";
import * as cheerio from "cheerio";

export class JavlibProvider implements IProvider {
    private readonly host: string;
    private readonly axiosInstance;

    constructor(config: Config) {
        this.host = config.javlibHost;
        this.axiosInstance = axios.create({
            baseURL: this.host,
            headers: {
                "Accept-Language": "zh-CN,zh;q=0.9",
                "referer": this.host
            }
        });
    }

    private async _requestWithRandomDelay(url: string): Promise<string> {
        // 添加随机延迟（1-3秒）
        const delay = Math.floor(Math.random() * 2000) + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

        const response = await this.axiosInstance.get(url);
        return response.data;
    }

    private _parseMovie($: cheerio.CheerioAPI): Movie {
        const movie = {
            genres: [] as string[],
            actors: [] as string[],
            comments: [] as Comment[],
            previewImages: [] as string[],
        } as Movie;

        // 标题
        movie.title = $('#video_title > h3 > a').text().trim();

        // SN
        movie.sn = $('#video_id .text').text().trim();

        // 发布日期
        movie.releaseDate = $('#video_date .text').text().trim();

        // 时长
        movie.duration = $('#video_length > table > tbody > tr > td:nth-child(2) > span').text().trim();

        // 导演
        movie.director = $('#video_director .text > span > a').text().trim();

        // 制作商
        movie.maker = $('#video_maker .text > span > a').text().trim();

        // 发行商
        movie.publisher = $('#video_label .text > span > a').text().trim();

        // 类型
        $('#video_genres .text .genre').each((_, element) => {
            const genre = $(element).find('a').text().trim();
            if (genre) {
                movie.genres!.push(genre);
            }
        });

        // 演员
        $('#video_cast .star').each((_, element) => {
            const actor = $(element).find('a').text().trim();
            if (actor) {
                movie.actors!.push(actor);
            }
        });

        // 封面图片
        const cover = $('#video_jacket_img').attr('src');
        if (cover) {
            movie.coverUrl = cover.startsWith('//') ? 'https:' + cover : cover;
        }

        // 想看数
        const wantedText = $('#subscribed > a').text().trim();
        movie.wanted = parseInt(wantedText) || 0;

        // 评分
        const scoreText = $('#video_review .score').text().trim();
        if (scoreText) {
            const cleanScore = scoreText.replace(/[()]/g, '');
            movie.score = cleanScore || '0';
        }

        // 评论
        const filterComment = (content: string): boolean => {
            return content.includes('Download') ||
                content.includes('magnet') ||
                content.includes('http') ||
                content.includes('dmm.co.jp');
        };

        // 视频评论
        $('#video_reviews .review').each((_, element) => {
            const content = $(element).find('.t').text().trim();
            if (filterComment(content)) return;

            const comment: Comment = {
                comment: content,
                provider: 'javlib',
                sn: movie.sn,
                user: $(element).find('.userid > a').text().trim(),
                publishDate: $(element).find('.date').text().trim()
            };
            movie.comments!.push(comment);
        });

        // 普通评论
        $('#video_comments .comment').each((_, element) => {
            const content = $(element).find('.t').text().trim();
            if (filterComment(content)) return;

            const comment: Comment = {
                comment: content,
                provider: 'javlib',
                sn: movie.sn,
                user: $(element).find('.userid > a').text().trim(),
                publishDate: $(element).find('.date').text().trim()
            };
            movie.comments!.push(comment);
        });

        // 预览图片
        movie.previewImages = [];
        $('.previewthumbs > a').each((_, element) => {
            const img = $(element).attr('href');
            if (img && img.includes('pics.dmm.co.jp')) {
                movie.previewImages!.push(img);
            }
        });

        return movie;
    }

    private async _getMovieInfoByURL(url: string): Promise<Movie> {
        const html = await this._requestWithRandomDelay(url);
        const $ = cheerio.load(html);
        return this._parseMovie($);
    }

    async fetchMovie(keyword: string): Promise<Movie | undefined> {
        try {
            // 首先通过搜索ID获取电影主页
            const searchUrl = `${this.host}/vl_searchbyid.php?keyword=${encodeURIComponent(keyword)}`;
            const searchHtml = await this._requestWithRandomDelay(searchUrl);
            const $search = cheerio.load(searchHtml);

            let movieHomepage = '';
            let selected = false;

            $search('.videothumblist .videos .video').each((_, element) => {
                const $element = $search(element);
                const sn = $element.find('.id').text().trim();

                if (sn === keyword && !selected) {
                    const href = $element.find('a').attr('href');
                    if (href) {
                        movieHomepage = this.host + href.substring(2); // 去掉开头的../

                        // 特殊前缀处理
                        if (!sn.startsWith('ABF') && !sn.startsWith('MIDV')) {
                            selected = true;
                        }
                    }
                }
            });

            // 如果找到了具体的主页，直接获取详细信息
            if (movieHomepage) {
                return await this._getMovieInfoByURL(movieHomepage);
            }

            // 如果没有找到具体主页，尝试从搜索结果页面解析
            const movie = this._parseMovie($search);

            // 如果解析到了有效信息，返回
            if (movie.sn && movie.title) {
                return movie;
            }

            return undefined;
        } catch (error) {
            console.error('Error fetching movie from JavLib:', error);
            return undefined;
        }
    }

    async fetchRankMovie(type: RankType, options: FetchOptions<Movie>): Promise<RankMovie[]> {
        const rankMovies: RankMovie[] = [];
        const limit = 100;
        let releaseDate = new Date().toISOString().split('T')[0]; // 当前日期
        if(type === 'bestRated' || type === 'mostWanted') {
            releaseDate = releaseDate.substring(0,7)
        }

        try {
            let maxPages = 10;
            if (type === 'popular') {
                maxPages = 1; // 热门只有一页
            }

            for (let page = 1; page <= maxPages && rankMovies.length < limit; page++) {
                let url: string;

                switch (type) {
                    case 'bestRated':
                        url = `${this.host}/vl_bestrated.php?model=1&page=${page}`;
                        break;
                    case 'mostWanted':
                        url = `${this.host}/vl_mostwanted.php?model=1&page=${page}`;
                        break;
                    case 'popular':
                        url = `${this.host}/`;
                        break;
                    default:
                        continue;
                }

                const html = await this._requestWithRandomDelay(url);
                const $ = cheerio.load(html);

                $('.videothumblist .videos .video').each((_, element) => {
                    if (rankMovies.length >= limit) return;

                    const $element = $(element);
                    const rankMovie: RankMovie = {
                        sn: $element.find('.id').text().trim(),
                        thumbUrl: $element.find('img').attr('src') || '',
                        title: $element.find('.title').text().trim(),
                        homepage: '',
                        provider: 'javlib',
                        type: type,
                        releaseDate: releaseDate
                    };

                    const href = $element.find('a').attr('href');
                    if (href) {
                        rankMovie.homepage = this.host + href.substring(2);
                    }

                    rankMovies.push(rankMovie);
                });

                // 如果是热门类型，只处理一页
                if (type === 'popular') {
                    break;
                }
            }
        } catch (error) {
            console.error('Error fetching rank movies from JavLib:', error);
        }

        return rankMovies;
    }
}