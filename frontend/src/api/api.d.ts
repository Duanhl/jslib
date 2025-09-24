export interface Movie {
    sn: string;
    title: string;
    actors: string[];
    director: string;
    duration: string;
    maker: string;
    publisher: string;
    releaseDate: string;
    series: string;
    score: string;
    wanted: string;
    liked: string;
    location: string;
    coled: number;
    genres: string[];
    thumbUrl: string;
    coverUrl: string;
    previewImages: string[];
    torrents: Torrent[];
    comments: Comment[];
}
export interface Comment {
    sn: string;
    site: string;
    user: string;
    comment: string;
    publishDate: string;
    replyId: string;
}
export interface Torrent {
    sn: string;
    magnet: string;
    size: string;
    dn: string;
    site: string;
    publishDate: string;
}
export interface ActorInfo {
    name: string;
    hobby: string;
    height: string;
    cup: string;
    chest: string;
    hip: string;
    waist: string;
    aliases: string[];
    images: string[];
    birthday: string;
    debutDate: string;
    sn: string;
    score: number;
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
export interface PageOptions {
    page?: number;
    pageSize?: number;
    total?: number;
}
export interface PageResult<T> extends PageOptions {
    data: T[];
}
export interface Response<T> {
    success: boolean;
    data: T;
    total: number;
    error: string;
}
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
}
export type ListType = 'actress' | 'series' | 'tag' | 'popular' | 'bestrated' | 'wanted' | 'col';
export interface ListOptions extends PageOptions {
    keyword?: string;
    type?: ListType;
}
export declare function movieDetails(sn: string): Promise<Movie | undefined>;
export declare function getActorInfo(name: string): Promise<ActorInfo | undefined>;
export declare function delMovie(sn: string): Promise<boolean>;
export declare function colMovie(sn: string): Promise<boolean>;
export declare function unColMovie(sn: string): Promise<boolean>;
export declare function listMovieByType(listOptions: ListOptions): Promise<PageResult<Movie>>;
export declare function listActors(listOptions: ListOptions): Promise<PageResult<ActorInfo>>;
export declare function listLocalVideo(listOptions: ListOptions): Promise<PageResult<Video>>;
export declare function listTorrents(listOptions: ListOptions): Promise<PageResult<Torrent>>;
export declare function syncMovie(sn: string): Promise<boolean>;
export declare function syncMovieByStar(name: string): Promise<string>;
export declare function loopEventMsg(): Promise<EventMsg>;
export declare function searchThread(title: string, pageNo: number, pageSize: number): Promise<{
    threads: Thread[];
    total: number;
}>;
