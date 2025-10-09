export interface Thread {
    threadId: number;
    form: number;
    title: string;
    url: string;
    publishDate?: string;
    sn?: string;
    ftype?: string;
    magnet?: string;
    img?: string;
    size?: string;
}

export interface IThreadService {
    search(args: { title: string, pageNo?: number, pageSize?: number }): Promise<{
        threads: Thread[];
        total: number;
    }>;
}

export interface Movie {
    sn: string;
    title?: string;
    actors?: string[];
    director?: string;
    duration?: string;
    maker?: string;
    publisher?: string;
    releaseDate?: string;
    series?: string;
    score?: string;
    wanted?: number;
    liked?: number;
    location?: string;
    coled?: number;

    genres?: string[];
    thumbUrl?: string;
    coverUrl?: string;
    previewImages?: string[];
    players?: string[];
    torrents?: Torrent[];
    comments?: Comment[];
}

export interface Comment {
    sn: string;
    provider: string;
    user: string;
    comment: string;
    publishDate: string;
    replyId?: string;
}

export interface Torrent {
    sn: string;
    magnet: string;
    size?: string;
    dn?: string;
    provider?: string;
    releaseDate?: string;
}

export type MovieListType = 'actress' | 'series' | 'genre' | 'popular' | 'bestRated' | 'mostWanted' | 'col';

export interface IMovieService {
    details(args: { sn: string }): Promise<Movie>;

    list(args: { keyword: string, type: MovieListType, page?: number, pageSize?: number }): Promise<{
        data: Movie[],
        total: number
    }>;

    actor(args: { name: string }): Promise<ActorInfo>;

    listActors(args: { name?: string, page?: number, pageSize?: number }): Promise<{
        data: ActorInfo[],
        total: number
    }>;

    listVideos(args: { name?: string, page?: number, pageSize?: number }): Promise<{ data: Video[], total: number }>

    delMovie(args: { sn: string }): Promise<void>;

    colMovie(args: {sn: string}): Promise<void>;

    unColMovie(args: {sn: string}): Promise<void>;
}

export interface ActorInfo {
    name: string;
    hobby?: string;
    height?: string;
    cup?: string;
    chest?: string;
    hip?: string;
    waist?: string;
    aliases?: string[];
    images?: string[];
    birthday?: string;
    debutDate?: string;
    sn?: string;
    score?: number;
}

export interface ITorrentService {
    listHighCh(args: { keyword: string, page?: number, pageSize?: number }): Promise<Torrent[]>;
}

export interface Video {
    sn: string;
    fileName: string;
    mime: string;
    filePath: string;
    size: string;
}

export interface EventMsg {
    type?: 'syncStar';
    msg: string;
    timestamp?: string;
}

export interface ISyncService {

    syncMovie(args: { sn: string }): Promise<Movie>;

    syncStar(args: { name: string }): Promise<Movie[] | string>;
}

