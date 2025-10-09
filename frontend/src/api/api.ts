import {EventMsg} from "@jslib/common";
export interface Response<T> {
    success: boolean;
    data: T;
    total: number,
    error: string;
}


export async function loopEventMsg(): Promise<EventMsg> {
    const response = await doRequest('/api/event', {});
    if (response.success) {
        return response.data as EventMsg;
    } else {
        throw new Error(response.error);
    }
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