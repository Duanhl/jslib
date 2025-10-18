
export type RankType = 'bestRated' | 'mostWanted' | 'popular';

export interface RankMovie {
    sn?: string;
    title?: string;
    releaseDate?: string;
    type?: RankType;
    thumbUrl?: string;
    homepage?: string;
    provider?: string;
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
    location?: string;
    coled?: number;

    genres?: string[];
    associates?: string[];
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
    listHighCh(args: { keyword?: string, page?: number, pageSize?: number }): Promise<{torrents: Torrent[], total: number}>;
}

export interface Video {
    sn: string;
    fileName: string;
    mime: string;
    filePath: string;
    size: string;
}

export interface EventMsg {
    taskId: number;
    total: number;
    status: 'success' | 'error' | 'processing';
    current: number;
    message: string;
}

export interface ISyncService {

    syncMovie(args: { sn: string }): Promise<Movie>;

    syncStar(args: { name: string }): Promise<number>;

    syncSeries(args: {name: string }): Promise<number>;

    taskDetails(args: { taskId: number }): Promise<EventMsg>;

    syncRank(args: {type: RankType, start?: number, end?: number}): Promise<RankMovie[]>
}

export interface ConfigItem {
    key: string;
    value: string | boolean | number;
    description?: string;
}

export interface IConfigService {
    list(): Promise<ConfigItem[]>;
    update(args: {key: string, value: string | boolean | number}): Promise<void>;
}

export function extractCode(text: string): string | undefined {
    const m = text.match(/\b([A-Z]{1,6})-?(\d{2,5})\b/);
    return m ? `${m[1]}-${m[2]}` : undefined;
}

export function extractAmateurCode(text: string): string | undefined {
    const m = text.match(/\b(\d{3,4})([A-Z]{1,6})-?(\d{2,5})\b/);
    return m ? `${m[1]}${m[2]}-${m[3]}` : undefined;
}

export function extractFC2(text: string): string | undefined {
    const fc2Match = text.match(/\b(FC2)-?(PPV)-?(\d{5,8})\b/i);
    if (fc2Match) {
        return `FC2PPV-${fc2Match[3]}`;
    }
    const fc2Match2 = text.match(/\b(FC)-?(\d{5,8})\b/i)
    if (fc2Match2) {
        return `FC2PPV-${fc2Match2[2]}`;
    }
    return undefined;
}

export function extractT38(text: string): string | undefined {
    const t38Match = text.match(/\b(T38)-?(\d{3,4})\b/i);
    if(t38Match) {
        return `T38-${t38Match[2]}`;
    }
    return undefined;
}

export function extractFC2OrCode(text: string): string | undefined {
    return extractFC2(text) || extractAmateurCode(text) || extractT38(text) || extractCode(text);
}

