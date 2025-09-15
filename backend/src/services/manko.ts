import {decode91} from "../common/utils";

interface MankoMovie {
    _id: string;
    title: string;
    share_date: string;
    category: string;
    rating: string;
    genre?: string[];
    imdb_score?: string
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

export class Manko {
    constructor(private readonly host: string) {
    }

    async fetchPopularMovies(page: number, size: number = 24, syncDetails: boolean = false): Promise<MankoMovieDetails[] | MankoMovie[]> {
        return await this.fetchRankingMovies(MOST_POPULAR, page, size, syncDetails);
    }

    async fetchMostWantedMovies(page: number, size: number = 24, syncDetails: boolean = false): Promise<MankoMovieDetails[] | MankoMovie[]> {
        return await this.fetchRankingMovies(TOP_RATED, page, size, syncDetails);
    }

    private async fetchRankingMovies(type: string, page: number, size: number = 24, syncDetails: boolean = false): Promise<MankoMovieDetails[] | MankoMovie[]> {
        const res = await fetch(`${this.host}/swx/movie/search?page=${page}&size=${size}&${type}=true`)
        const resJ = await res.json();
        const parsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoMovie[];
        const movies: MankoMovieDetails[] = [];
        if (syncDetails) {
            for (const item of parsed) {
                movies.push(await this.fetchMovieById(item._id));
            }
            return movies;
        }
        return parsed;
    }

    async searchMovie(keyword: string): Promise<MankoMovieDetails[]> {
        const res = await fetch(`${this.host}/swx/movie/search?keyword=${keyword}&size=24&page=1`);
        const resJ = await res.json();
        const parsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoMovie[];
        let id: string | undefined = undefined;
        const movies: MankoMovieDetails[] = [];
        for (const item of parsed) {
            if (item.title === keyword) {
                movies.push(await this.fetchMovieById(item._id));
                break;
            }
        }
        return movies;
    }

    async searchActors(keyword: string): Promise<MankoMovieDetails[]> {
        const res = await fetch(`${this.host}/swx/searchBy?keyword=${keyword}&by=actress&size=24&page=1`);
        const resJ = await res.json();
        const parsed = JSON.parse(decode91(resJ['data'])) as unknown as MankoMovie[];
        let id: string | undefined = undefined;
        const movies: MankoMovieDetails[] = [];
        for (const item of parsed) {
            if (item.title === keyword) {
                movies.push(await this.fetchMovieById(item._id));
                break;
            }
        }
        return movies;
    }

    private async fetchMovieById(id: string): Promise<MankoMovieDetails> {
        const res = await fetch(`${this.host}/swx/movie/detail/${id}`);
        const resJ = await res.json();
        return JSON.parse(decode91(resJ['data'])) as unknown as MankoMovieDetails;
    }
}