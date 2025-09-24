import { isUndefined } from '../common/types';
export async function movieDetails(sn) {
    const response = await doRequest(`/api/movie/${sn}`, {});
    if (response.success) {
        return response.data;
    }
    return undefined;
}
export async function getActorInfo(name) {
    const response = await doRequest(`/api/actor/${name}`, {});
    if (response.success) {
        return response.data;
    }
    return undefined;
}
export async function delMovie(sn) {
    const response = await doRequest(`/api/delmovie/${sn}`, {});
    return response.success;
}
export async function colMovie(sn) {
    const response = await doRequest(`/api/colmovie/${sn}`, {});
    return response.success;
}
export async function unColMovie(sn) {
    const response = await doRequest(`/api/uncolmovie/${sn}`, {});
    return response.success;
}
export async function listMovieByType(listOptions) {
    const params = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page?.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize?.toString();
    }
    let response;
    switch (listOptions.type) {
        case 'actress':
        case 'series':
        case 'tag':
        case "col":
            response = await doRequest(`/api/list/${listOptions.type}`, { ...params, key: listOptions.keyword });
            break;
        case 'bestrated':
        case 'popular':
        case 'wanted':
            response = await doRequest(`/api/rank/${listOptions.type}`, { ...params });
            break;
        default:
            throw new Error(`${listOptions.type} is not supported`);
    }
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    }
    else {
        throw new Error(response.error);
    }
}
export async function listActors(listOptions) {
    const params = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize.toString();
    }
    const response = await doRequest(`/api/list/actor`, { ...params, key: listOptions.keyword });
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    }
    else {
        throw new Error(response.error);
    }
}
export async function listLocalVideo(listOptions) {
    const params = {};
    if (!isUndefined(listOptions.page)) {
        params['page'] = listOptions.page.toString();
    }
    if (!isUndefined(listOptions.pageSize)) {
        params['pageSize'] = listOptions.pageSize.toString();
    }
    const response = await doRequest(`/api/locals`, { name: listOptions.keyword, ...params });
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    }
    else {
        throw new Error(response.error);
    }
}
export async function listTorrents(listOptions) {
    const response = await doRequest(`/api/torrent`, { date: listOptions.keyword });
    if (response.success) {
        return ({
            total: response.total,
            data: response.data
        });
    }
    else {
        throw new Error(response.error);
    }
}
export async function syncMovie(sn) {
    const response = await doRequest(`/api/sync/movie/${sn}`, {});
    if (response.success) {
        return true;
    }
    else {
        throw new Error(response.error);
    }
}
export async function syncMovieByStar(name) {
    const response = await doRequest(`/api/sync/star/${name}`, {});
    if (response.success) {
        return response.data;
    }
    else {
        throw new Error(response.error);
    }
}
export async function loopEventMsg() {
    const response = await doRequest('/api/event', {});
    if (response.success) {
        return response.data;
    }
    else {
        throw new Error(response.error);
    }
}
export async function searchThread(title, pageNo, pageSize) {
    const response = await doRequest(`/api/threads/search`, {
        title, pageNo: pageNo.toString(), pageSize: pageSize.toString()
    });
    if (response.success) {
        return ({
            threads: response.data,
            total: response.total
        });
    }
    throw new Error(response.error);
}
const HOST = "http://localhost:3123";
function doRequest(url, query) {
    return new Promise((resolver, reject) => {
        const uri = `${HOST}${url}?${new URLSearchParams(query).toString()}`;
        fetch(uri)
            .then(async (r) => {
            if (r.status !== 200) {
                return reject(new Error('badRequest:' + r.statusText));
            }
            else {
                const json = await r.json();
                return resolver(json);
            }
        })
            .catch(e => reject(new Error(e)));
    });
}
//# sourceMappingURL=api.js.map