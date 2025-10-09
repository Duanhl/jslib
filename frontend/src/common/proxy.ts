import {Response} from "../api/api";
import {IMovieService, ISyncService, IThreadService, ITorrentService} from "@jslib/common";

const HOST = "/api";

export function toService<T extends object>(path: string): T {
    return new Proxy({}, {
        get(_target: T, propKey: PropertyKey): unknown {
            if (typeof propKey === 'string') {
                return async function (...args: unknown[]): Promise<unknown> {
                    const url = `${HOST}/${path}/${propKey}`;
                    let body = {} as Record<string, unknown>;
                    if (args.length > 0) {
                        if (typeof args[0] !== 'object') {
                            throw new TypeError(`Expected ${typeof args[0]} to be an object`);
                        }
                        body = args[0] as Record<string, unknown>;
                    }
                    const res = await doRequest(url, body);
                    if (res.success) {
                        return res.data;
                    }
                    throw new Error(`request failed with ${res.error}`);
                }
            }
            throw new Error(`Property not found: ${String(propKey)}`);
        }
    }) as T;
}

async function doRequest<T>(url: string, body: Record<string, unknown>): Promise<Response<T>> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res.json();
}

export const threadService = toService<IThreadService>('thread');
export const movieService = toService<IMovieService>('movie');
export const torrentService = toService<ITorrentService>('torrent');
export const syncService = toService<ISyncService>('sync');