
import {ActorInfo, Movie, RankMovie, RankType, Thread} from "@jslib/common";

export interface FetchOptions<T> {
    save?: (t: T) => void | Promise<void>;
    needNextLevel?: (t: T) => boolean;
    start?: number;
    end?: number;
}

export interface IProvider {

    /* normal */
    fetchMovie?(keyword: string): Promise<Movie | undefined>;

    fetchActor?(keyword: string, options: FetchOptions<Movie>): Promise<{
        actor?: ActorInfo,
        movies: Movie[]
    }>

    /* form class */
    fetchThreads?(form: string | number,
                  start?: number,
                  end?: number,
                  options?: FetchOptions<Thread>): Promise<Thread[]>;

    fetchThread?(url: string, form: string | number): Promise<Thread | undefined>;

    /* rank class */
    fetchRankMovie?(type: RankType, options: FetchOptions<Movie>): Promise<RankMovie[]>;
}