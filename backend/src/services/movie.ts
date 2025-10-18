import {IMovieService, Movie, Torrent, Video, Comment, MovieListType, ActorInfo} from "@jslib/common";
import {DB} from "../db";
import {RankMovie} from "./types";
import {calcActorScore} from "./score";
import os from "node:os";

export function formatterDate(date?: Date) {
    if (!date) {
        date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }
    return date.toISOString().split('T')[0];
}

interface ActorMovie {
    actor: string;
    sn: string;
    releaseDate: string;
}

const isPersonal = os.homedir().indexOf("1336") > -1;

export class MovieService implements IMovieService {

    constructor(private readonly db: DB) {
    }

    async delMovie(args: { sn: string; }): Promise<void> {
        this.db.transaction(() => {
            const {sn} = args;
            this.db.execute(`delete
                             from movies
                             where sn = :sn`, {sn});
            this.db.execute(`delete
                             from actor_movie_relation
                             where sn = :sn`, {sn});
            this.db.execute(`delete
                             from genre_movie_relation
                             where sn = :sn`, {sn});
            this.db.execute(`delete
                             from comments
                             where sn = :sn`, {sn});
            this.db.execute(`delete
                             from torrents
                             where sn = :sn`, {sn});
        });
    }

    async colMovie(args: { sn: string; }): Promise<void> {
        const {sn} = args;
        this.db.execute('update movies set coled = 1 where sn = :sn', {sn});
    }

    async unColMovie(args: { sn: string; }): Promise<void> {
        const {sn} = args;
        this.db.execute('update movies set coled = 0 where sn = :sn', {sn});
    }

    async createMovie(movie: Movie): Promise<void> {
        this.db.transaction(() => {
            const {sn, comments} = movie;

            const exists: Movie[] = this.db.query(`select * from movies where sn = :sn`, {sn});
            if(exists.length > 0) {
                movie.coled = exists[0].coled
            }

            this.db.execute(`delete
                             from movies
                             where sn = :sn`, {sn});
            this.db.create('movies', movie, ['comments', 'torrents']);

            if(movie.actors && movie.actors.length > 0) {
                this.db.execute(`delete
                             from actor_movie_relation
                             where sn = :sn`, {sn});
                for (const actor of movie.actors!) {
                    this.db.create('actor_movie_relation', {actor, sn, releaseDate: movie.releaseDate});
                }
            }

            if(movie.genres && movie.genres.length > 0) {
                this.db.execute(`delete
                             from genre_movie_relation
                             where sn = :sn`, {sn});
                for (const genre of movie.genres!) {
                    this.db.create('genre_movie_relation', {genre, sn, releaseDate: movie.releaseDate});
                }
            }


            if (comments && comments.length > 0) {
                this.db.execute(`delete
                                 from comments
                                 where sn = :sn`, {sn});
                for (const comment of comments) {
                    this.db.create('comments', comment);
                }
                movie.comments = comments;
            }
        });
    }

    async listVideos(args: { name: string, page?: number; pageSize?: number; }): Promise<{
        data: Video[];
        total: number;
    }> {
        let {name, page = 1, pageSize = 10} = args;

        // 参数验证
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;

        const offset = (page - 1) * pageSize;

        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM videos WHERE file_name LIKE :fileName COLLATE NOCASE",
            {fileName: `%${name}%`}
        );
        const total = countResult[0]?.count || 0;

        // 获取分页数据
        const data = this.db.query<Video>(
            "SELECT * FROM videos WHERE file_name LIKE :fileName COLLATE NOCASE LIMIT :limit OFFSET :offset",
            {fileName: `%${name}%`, limit: pageSize, offset}
        );

        return {
            data,
            total
        };
    }

    async videoDetails(sn: string): Promise<Video | undefined> {
        const videos = this.db.query<Video>("SELECT * FROM videos WHERE sn = :sn", {sn});
        if (!videos.length) {
            return undefined;
        }
        return videos[0];
    }

    async actor(args: { name: string; }): Promise<ActorInfo> {
        const {name} = args;

        const results = this.db.query<ActorInfo>(
            "SELECT * FROM actors WHERE name = :name",
            {name: name}
        );

        if (results.length === 0) {
            throw new Error(`Actor not found: ${name}`);
        }

        return results[0];
    }


    async listActors(args: { name?: string; page?: number; pageSize?: number; }): Promise<{
        data: ActorInfo[];
        total: number;
    }> {
        const {name, page = 1, pageSize = 20} = args;
        const offset = (page - 1) * pageSize;

        const where = name ? `where name like '%${name}%' ` : '';

        // 获取演员总数
        const countResult = this.db.query<{ count: number }>(
            `SELECT COUNT(*) as count
             FROM actors ${where}`
        );
        const total = countResult[0]?.count || 0;

        // 获取分页的演员数据，按分数降序排列
        const data: ActorInfo[] = this.db.query<ActorInfo>(
            `SELECT *
             FROM actors ${where}
             ORDER BY score DESC LIMIT :limit
             OFFSET :offset`,
            {limit: pageSize, offset}
        );

        if (data.length === 0) {
            return {
                data: [],
                total
            };
        }

        // 提取所有演员名字
        const names = data.map(actor => actor.name);
        const placeholders = names.map(() => '?').join(',');

        // 获取每个演员的最新电影信息
        const movies: ActorMovie[] = this.db.query<ActorMovie>(
            `SELECT actor, sn, MAX(release_date) as release_date
             FROM actor_movie_relation
             WHERE actor IN (${placeholders})
             GROUP BY actor`,
            names
        );

        // 将最新电影信息关联到演员数据
        const actorMap = new Map();
        movies.forEach(movie => {
            actorMap.set(movie.actor, movie.sn);
        });

        const enhancedData = data.map(actor => ({
            ...actor,
            sn: actorMap.get(actor.name) || null
        }));

        return {
            data: enhancedData,
            total
        };
    }


    async details(args: { sn: string }): Promise<Movie> {
        const {sn} = args;

        // 获取电影基本信息
        const movieResults = this.db.query<Movie>(
            "SELECT * FROM movies WHERE sn = :sn",
            {sn}
        );

        if (movieResults.length === 0) {
            throw new Error("Movie not found");
        }

        const movie = movieResults[0];
        const actors = movie.actors as unknown as string || '[]';
        movie.actors = JSON.parse(actors.replace("{", "[").replace("}", "]"));

        const genres = movie.genres as unknown as string || '[]';
        movie.genres = JSON.parse(genres.replace("{", "[").replace("}", "]"));

        const previews = movie.previewImages as unknown as string;
        if (previews) {
            movie.previewImages = JSON.parse(previews.replace("{", "[").replace("}", "]"));
        }
        const players = movie.players as unknown as string;
        if (players) {
            movie.players = JSON.parse(players.replace("{", "[").replace("}", "]"));
        }
        const associates = movie.associates as unknown as string || '[]';
        movie.associates = JSON.parse(associates.replace("{", "[").replace("}", "]"));

        // 获取种子信息，按发布日期降序排列
        const torrents = this.db.query<Torrent>(
            "SELECT * FROM torrents WHERE sn = :sn ORDER BY release_date DESC",
            {sn}
        );
        movie.torrents = torrents;

        // 获取评论信息，按ID降序排列
        const comments = this.db.query<Comment>(
            "SELECT * FROM comments WHERE sn = :sn ORDER BY id DESC",
            {sn}
        );
        movie.comments = comments;

        // 获取视频文件路径
        const videoResults = this.db.query<Video>(
            "SELECT * FROM videos WHERE sn = :sn",
            {sn}
        );

        // 如果没有找到视频记录，不抛出错误（类似于Golang中的ErrRecordNotFound处理）
        if (videoResults.length > 0) {
            movie.location = videoResults[0].filePath;
        }

        return movie;
    }

    async list(args: { keyword: string, type: MovieListType, page?: number, pageSize?: number }): Promise<{
        data: Movie[],
        total: number
    }> {
        const {keyword, type, page = 1, pageSize = 20} = args;
        const offset = (page - 1) * pageSize;

        switch (type) {
            case 'col':
                return await this._listColMovies(page, pageSize, offset);
            case 'genre':
                return await this._listMoviesByGenre(keyword, page, pageSize, offset);
            case 'series':
                return await this._listMovieBySNPrefix(keyword, page, pageSize, offset);
            case 'popular':
            case 'bestRated':
            case 'mostWanted':
                return await this._listMovieByRank(type, keyword, page, pageSize, offset);
            case 'actress':
                return await this._listMoviesByActor(keyword, page, pageSize, offset);
            default:
                throw new Error(`Unsupported list type: ${type}`);
        }
    }

    private async _listColMovies(page: number, size: number, offset: number): Promise<{
        data: Movie[],
        total: number
    }> {
        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM movies WHERE coled = :coled",
            {coled: 1}
        );
        const total = countResult[0]?.count || 0;

        // 获取数据
        const data = this.db.query<Movie>(
            "SELECT * FROM movies WHERE coled = :coled ORDER BY release_date DESC LIMIT :limit OFFSET :offset",
            {coled: 1, limit: size, offset}
        );

        // 添加本地视频位置信息
        const moviesWithLocation = await this._addLocationsToMovies(data);

        return {
            data: moviesWithLocation,
            total
        };
    }

    private async _listMoviesByGenre(genre: string, page: number, size: number, offset: number): Promise<{
        data: Movie[],
        total: number
    }> {
        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM genre_movie_relation WHERE genre = :genre",
            {genre}
        );
        const total = countResult[0]?.count || 0;

        // 获取数据
        const data = this.db.query<Movie>(
            `SELECT m.*
             FROM movies m
                      JOIN genre_movie_relation gmr ON gmr.sn = m.sn
             WHERE gmr.genre = :genre
             ORDER BY m.release_date DESC LIMIT :limit
             OFFSET :offset`,
            {genre, limit: size, offset}
        );

        const moviesWithLocation = await this._addLocationsToMovies(data);

        return {
            data: moviesWithLocation,
            total
        };
    }

    private async _listMovieBySNPrefix(snPrefix: string, page: number, size: number, offset: number): Promise<{
        data: Movie[],
        total: number
    }> {
        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM movies WHERE sn LIKE :sn",
            {sn: snPrefix + '%'}
        );
        const total = countResult[0]?.count || 0;

        // 获取数据
        const data = this.db.query<Movie>(
            "SELECT * FROM movies WHERE sn LIKE :sn ORDER BY sn DESC LIMIT :limit OFFSET :offset",
            {sn: snPrefix + '%', limit: size, offset}
        );

        const moviesWithLocation = await this._addLocationsToMovies(data);

        return {
            data: moviesWithLocation,
            total
        };
    }

    private async _listMovieByRank(rankType: 'popular' | 'bestRated' | 'mostWanted', date: string, page: number, size: number, offset: number): Promise<{
        data: Movie[],
        total: number
    }> {

        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM rank_movie WHERE type = :type",
            {type: rankType}
        );
        const total = countResult[0]?.count || 0;

        // 获取数据
        const data = this.db.query<Movie>(
            "SELECT *, thumb_url as coverUrl FROM rank_movie WHERE type = :type order by release_date desc LIMIT :limit OFFSET :offset",
            {type: rankType, limit: size, offset}
        );

        for (const m of data) {
            if(m.coverUrl) {
                m.coverUrl = m.coverUrl.replace("ps.jpg", "pl.jpg");
            }
        }

        return {
            data,
            total
        };
    }

    async insertRankMovie(movie: RankMovie) {
        this.db.transaction(() => {
            this.db.execute('delete from rank_movie where sn = :sn and type = :type', {
                sn: movie.sn,
                type: movie.type
            });
            this.db.create('rank_movie', movie);
        })
    }

    listSnByActor(actor: string): string[] {
        const movies = this.db.query<Movie>(`SELECT *
                                             FROM actor_movie_relation
                                             WHERE actor = :actor`, {actor});
        return movies.map(m => m.sn!);
    }

    insertActor(actor: ActorInfo): void {
        this.db.createOrUpdate('actors', actor, 'name');
    }

    async calcActorScore(actor: string) {
        const cutDate = new Date(new Date().getTime() - 6.1 * 30 * 24 * 3600 * 1000).toISOString().split("T")[0];
        await calcActorScore(this.db, actor, cutDate)
    }

    private async _listMoviesByActor(actor: string, page: number, size: number, offset: number): Promise<{
        data: Movie[],
        total: number
    }> {
        // 获取总数
        const countResult = this.db.query<{ count: number }>(
            "SELECT COUNT(*) as count FROM actor_movie_relation WHERE actor = :actor",
            {actor}
        );
        const total = countResult[0]?.count || 0;

        // 构建查询
        let query = `SELECT m.*
                     FROM movies m
                              JOIN actor_movie_relation amr ON amr.sn = m.sn
                     WHERE amr.actor = :actor
                     ORDER BY m.release_date DESC`;

        const params: any = {actor};

        // 如果有分页参数，添加LIMIT和OFFSET
        if (size > 0) {
            query += " LIMIT :limit OFFSET :offset";
            params.limit = size;
            params.offset = offset;
        }

        const data = this.db.query<Movie>(query, params);
        const moviesWithLocation = await this._addLocationsToMovies(data);

        return {
            data: moviesWithLocation,
            total
        };
    }

    private async _addLocationsToMovies(movies: Movie[]): Promise<Movie[]> {
        if (movies.length === 0 || !isPersonal) {
            return movies;
        }

        // 获取所有SN的视频文件路径
        const snList = movies.map(m => m.sn);
        const placeholders = snList.map((v) => `'${v}'`).join(',');

        const videoResults = this.db.query<{ sn: string, file_path: string }>(
            `SELECT sn, file_path
             FROM videos
             WHERE sn IN (${placeholders})`
        );

        // 创建SN到文件路径的映射
        const snLocations = new Map();
        videoResults.forEach(video => {
            snLocations.set(video.sn, video.file_path);
        });

        // 为每个电影添加位置信息
        return movies.map(movie => ({
            ...movie,
            location: snLocations.get(movie.sn) || null
        }));
    }

}