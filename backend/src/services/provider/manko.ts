import {decode91, extractFC2} from "../../common/utils";
import {FetchOptions, IProvider, RankType} from "./provider";
import {RankMovie} from "../types";
import {Config} from "../../config";
import {ActorInfo, Movie, Torrent} from "@jslib/common";

interface MankoMovie {
    _id: string;
    title: string;
    share_date: string;
    category: string;
    rating: string;
    genre?: string[];
    imdb_score?: string
    thumbnail_image?: string;
}

interface MankoActor {
    _id: string;
    person_id: string;
    url: string;
    name: string;
    also_known_as: Record<string, string>;
}

interface MankoTorrent {
    url: string;
    hash: string;
    quality: string;
}

interface MankoMovieDetails {
    _id: string;
    njav_player: string[];
    upload18_player: string[];
    discription: { language: string; overview: string }[];
    title_display_name: { language: string; title: string }[];
    video_duration: number;
    cover_image: string;
    backdrop_images: string[];
    country: string;
    imdb_score: string;
    torrent_url_2: MankoTorrent;
    share_date: string;
}

const TOP_RATED = "top_rated";
const MOST_POPULAR = "most_popular";

export class Manko implements IProvider {
    private readonly host;

    constructor(config: Config) {
        this.host = config.mankoHost;
    }

    async fetchMovie(keyword: string): Promise<Movie | undefined> {
        let searchWord = keyword;
        const maybeFC2 = extractFC2(searchWord);
        if (maybeFC2) {
            searchWord = maybeFC2.replace('FC2', 'FC2-');
        }

        const res = await fetch(`${this.host}/swx/movie/search?keyword=${searchWord}&size=24&page=1`);
        const resJ = await res.json();
        const parsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoMovie[];
        if (parsed.length > 0) {
            return this.convert(await this.fetchMovieById(parsed[0]._id), keyword);
        }
        return undefined;
    }

    async fetchActor(keyword: string, options?: FetchOptions<Movie>): Promise<{ actor?: ActorInfo; movies: Movie[] }> {
        const res = await fetch(`${this.host}/swx/searchBy?keyword=${keyword}&by=actress&size=24&page=1`);
        const resJ = await res.json();
        const parsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoActor[];
        let actressId: string | undefined = undefined;
        if (parsed.length > 0) {
            actressId = parsed[0].person_id;
        }
        if (!actressId) {
            return {movies: []};
        }

        let page = 1;
        const allMovies: MankoMovie[] = [];
        const pageSize = 30;
        while (page <= 10) {
            const listRes = await fetch(`${this.host}/swx/movie/search?person_id=${actressId}&size=${pageSize}&page=${page}`);
            const listJson = await listRes.json();
            const listParsed = JSON.parse(decode91(listJson['data'])) as unknown as MankoMovie[];
            allMovies.push(...listParsed);
            page += 1;
            if (listParsed.length < pageSize) {
                break;
            }
        }
        const movies: Movie[] = [];
        for (const movie of allMovies) {
            if (options && options.needNextLevel) {
                if (options.needNextLevel(movie as unknown as Movie)) {
                    const outMovie = this.convert(await this.fetchMovieById(movie._id), movie.title);
                    movies.push(outMovie);
                    if (options.save) {
                        await options.save(outMovie);
                    }
                }
            } else {
                movies.push(this.convert2(movie));
            }
        }
        return {movies};
    }

    async fetchRankMovie(type: RankType, options?: FetchOptions<Movie>): Promise<RankMovie[]> {
        const res: RankMovie[] = [];
        if (type === 'bestRated') {
            for (let i = 1; i <= 10; i++) {
                res.push(... await this._fetchRankMovie(type, `${this.host}/swx/movie/search?page=${i}&size=30&${TOP_RATED}=true`, options))
            }
            for (const m of res) {
                m.releaseDate = m.releaseDate ? m.releaseDate.substring(0,7) : m.releaseDate;
            }
        } else if(type === 'popular') {
            res.push(... await this._fetchRankMovie(type, `${this.host}/swx/movie/search?page=1&size=30&${MOST_POPULAR}=true`, options));
        }
        return res;
    }

    private async _fetchRankMovie(type: RankType, url: string, options?: FetchOptions<Movie>): Promise<RankMovie[]> {
        const res = await fetch(url);
        const resJ = await res.json();
        const result: RankMovie[] = [];
        const listParsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoMovie[];
        for (const movie of listParsed) {
            if (options && options.needNextLevel) {
                if(options.needNextLevel(movie as unknown as Movie) && options.save) {
                    const outMovie = this.convert(await this.fetchMovieById(movie._id), movie.title);
                    await options.save(outMovie);
                }
            }
            result.push(this.convert2Rank(movie, type));
        }
        return result;
    }


    private async fetchMovieById(id: string): Promise<MankoMovieDetails> {
        const res = await fetch(`${this.host}/swx/movie/detail/${id}`);
        const resJ = await res.json();
        return JSON.parse(decode91(resJ['data'])) as unknown as MankoMovieDetails;
    }

    private convert2Rank(manko: MankoMovie, type: RankType): RankMovie {
        return {
            sn: manko.title,
            title: manko.title,
            releaseDate: manko.share_date,
            type: type,
            provider: 'manko',
            thumbUrl: manko.thumbnail_image
        }
    }

    private convert2(manko: MankoMovie): Movie {
        return {
            sn: manko.title,
            title: manko.title,
            releaseDate: manko.share_date,
            score: manko.imdb_score,
        }
    }

    private convert(manko: MankoMovieDetails, sn: string): Movie {
        const findTitle = (titles: { language: string; title: string }[]) => {
            for (const title of titles) {
                if (title.language === 'jp') {
                    return title.title;
                }
            }
            return undefined;
        }

        const transferTorrent = (mt: MankoTorrent): Torrent => {
            return {
                sn,
                dn: 'hd800',
                magnet: mt.url,
                provider: 'manko',
            }
        }

        const doubleScore = (score: string): string | undefined => {
            if(!score) return undefined;
            try {
                return 2 * parseFloat(score) + '';
            } catch (e) {
                return undefined;
            }
        }

        return {
            sn: findTitle(manko.title_display_name) || sn,
            score: doubleScore(manko.imdb_score),
            players: [...manko.njav_player, ...manko.upload18_player],
            duration: manko.video_duration.toString(),
            publisher: manko.country,
            releaseDate: manko.share_date,
            torrents: [transferTorrent(manko.torrent_url_2)],
            previewImages: manko.backdrop_images,
            coverUrl: manko.cover_image,
            comments: []
        }
    }
}