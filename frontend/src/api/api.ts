import {isUndefined} from '../common/types';

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
    total: number,
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

export type ListType = 'actress' | 'series' | 'tag' | 'popular' | 'bestrated' | 'wanted' | 'col'

export interface ListOptions extends PageOptions {
    keyword?: string;
    type?: ListType;
}


export async function movieDetails(sn: string): Promise<Movie | undefined> {
    const response = await doRequest(`/api/movie/${sn}`, {});
    if (response.success) {
        return response.data as Movie;
    }
    return undefined;
}

export async function getActorInfo(name: string): Promise<ActorInfo | undefined> {
    const response = await doRequest(`/api/actor/${name}`, {});
    if (response.success) {
        return response.data as ActorInfo;
    }
    return undefined;
}

export async function delMovie(sn: string): Promise<boolean> {
    const response = await doRequest(`/api/delmovie/${sn}`, {});
    return response.success;
}

export async function colMovie(sn: string): Promise<boolean> {
    const response = await doRequest(`/api/colmovie/${sn}`, {});
    return response.success;
}

export async function unColMovie(sn: string): Promise<boolean> {
    const response = await doRequest(`/api/uncolmovie/${sn}`, {});
    return response.success;
}

export async function listMovieByType(listOptions: ListOptions): Promise<PageResult<Movie>> {
    const params: any = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize.toString();
    }
    let response: Response<Movie[]>;
    switch (listOptions.type) {
        case 'actress':
        case 'series':
        case 'tag':
        case "col":
            response = await doRequest(`/api/list/${listOptions.type}`,
                {...params, key: listOptions.keyword!});
            break;
        case 'bestrated':
        case 'popular':
        case 'wanted':
            response = await doRequest(`/api/rank/${listOptions.type}`, {...params});
            break;
        default:
            throw new Error(`${listOptions.type} is not supported`);
    }
    if (response.success) {
        return ({
            total: response.total,
            data: response.data as Movie[]
        });
    } else {
        throw new Error(response.error);
    }
}

export async function listActors(listOptions: ListOptions): Promise<PageResult<ActorInfo>> {
    const params: any = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize.toString();
    }

    const response: Response<ActorInfo[]> = await doRequest(`/api/list/actor`,
        {...params, key: listOptions.keyword!});
    if (response.success) {
        return ({
            total: response.total,
            data: response.data as ActorInfo[]
        });
    } else {
        throw new Error(response.error);
    }
}

export async function listLocalVideo(listOptions: ListOptions): Promise<PageResult<Video>> {
    const params: any = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize.toString();
    }
    const response: Response<Video[]> = await doRequest(`/api/locals`, {name: listOptions.keyword, ...params});
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    } else {
        throw new Error(response.error);
    }
}

export async function listTorrents(listOptions: ListOptions): Promise<PageResult<Torrent>> {
    const response: Response<Torrent[]> = await doRequest(`/api/torrent`, {date: listOptions.keyword!});
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    } else {
        throw new Error(response.error);
    }
}

export async function syncMovie(sn: string): Promise<boolean> {
    const response = await doRequest(`/api/sync/movie/${sn}`, {});
    if (response.success) {
        return true;
    } else {
        throw new Error(response.error);
    }
}

export async function syncMovieByStar(name: string): Promise<string> {
    const response = await doRequest(`/api/sync/star/${name}`, {});
    if (response.success) {
        return response.data as string;
    } else {
        throw new Error(response.error);
    }
}

export async function loopEventMsg(): Promise<EventMsg> {
    const response = await doRequest('/api/event', {});
    if (response.success) {
        return response.data as EventMsg;
    } else {
        throw new Error(response.error);
    }
}

export async function searchThread(title: string, pageNo: number, pageSize: number): Promise<{threads: Thread[], total: number}> {
    const response = await doRequest(`/api/threads/search`, {
        title, pageNo: pageNo.toString(), pageSize: pageSize.toString()
    })
    if (response.success) {
        return ({
            threads: response.data as Thread[],
            total: response.total
        })
    }
    throw new Error(response.error);
}

const HOST = "http://localhost:3123";

function doRequest<T>(url: string,
                      query: Record<string, string>): Promise<Response<T>> {
    return new Promise((resolver, reject) => {
        const uri = `${HOST}${url}?${new URLSearchParams(query).toString()}`;
        fetch(uri)
            .then(async r => {
                if (r.status !== 200) {
                    return reject(new Error('badRequest:' + r.statusText));
                } else {
                    const json = await r.json();
                    return resolver(json as Response<T>);
                }
            })
            .catch(e => reject(new Error(e)));
    });
}