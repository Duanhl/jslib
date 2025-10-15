import {ShtProvider} from "./provider/sht";
import {ShtService} from "./sht";
import {TorrentService} from "./torrent";
import {ISyncService, Movie, Thread, Torrent, Comment, ActorInfo} from "@jslib/common";
import {JavlibProvider} from "./provider/javlib";
import {Manko} from "./provider/manko";
import {JavbusProvider} from "./provider/javbus";
import {MovieService} from "./movie";
import {RankType} from "./provider/provider";
import {isBlacked, RankMovie} from "./types";
import {Config} from "../config";
import {isUndefinedOrNull} from "../common/types";
import {MissavProvider} from "./provider/missav";
import {extractFC2OrCode} from "../common/utils";


export class SyncService implements ISyncService {
    constructor(private readonly shtProvider: ShtProvider,
                private readonly javlibProvider: JavlibProvider,
                private readonly mankoProvider: Manko,
                private readonly javbusProvider: JavbusProvider,
                private readonly movieService: MovieService,
                private readonly shtService: ShtService,
                private readonly missavProvider: MissavProvider,
                private readonly torrentService: TorrentService) {
    }

    async syncMovie(args: { sn: string; }): Promise<Movie> {
        const {sn} = args;
        const providers = [this.javbusProvider, this.javlibProvider, this.mankoProvider, this.missavProvider];
        const promises = providers.map(provider => provider.fetchMovie(sn));
        const results = await Promise.allSettled(promises);

        let movie = {} as Movie;
        let actors: string[] = [];
        let genres: string[] = [];
        let previewImages: string[] = [];
        let comments: Comment[] = [];
        let torrents: Torrent[] = [];

        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                const value = result.value;
                movie = {...movie, ...Object.fromEntries(
                        Object.entries(value).filter(([_, v]) => {
                            return !isUndefinedOrNull(v);
                        })
                    )};
                if (value.actors && value.actors?.length > actors.length) {
                    actors = value.actors;
                }
                if (value.genres && value.genres.length > genres.length) {
                    genres = value.genres;
                }
                if (value.previewImages && value.previewImages.length > previewImages.length) {
                    previewImages = value.previewImages;
                }
                if (value.comments && value.comments.length > comments.length) {
                    comments = value.comments;
                }
                if (value.torrents) {
                    torrents.push(...value.torrents);
                }
            }
        }

        movie.actors = actors;
        movie.genres = genres;
        movie.previewImages = previewImages;
        movie.comments = comments;

        await this.movieService.createMovie(movie);
        for (const torrent of torrents) {
            await this.torrentService.saveTorrent(torrent)
        }
        movie.torrents = torrents;

        console.log(`sync movie for ${sn} successfully.`);
        return movie;
    }


    async syncStar(args: { name: string; }, sync?: boolean): Promise<Movie[] | string> {
        if (sync) {
            return await this._doSyncStar(args);
        }
        this._doSyncStar(args);
        return `start sync for ${args.name}`;
    }

    private async _doSyncStar(args: { name: string; }): Promise<Movie[]> {
        const {name} = args;
        const sns = this.movieService.listSnByActor(name);
        const snSet = sns.reduce((acc, s) => acc.add(s), new Set<string>());
        const blackList = Config.blackList;
        const isBlack = (sn: string) => blackList.has(sn.split('-')[0]);

        const allPromises = [
            this.mankoProvider.fetchActor(name, {}),
            this.javbusProvider.fetchActor(name, {}),
        ]

        const needSync = [] as string[];

        const allResults = await Promise.allSettled(allPromises);
        let actor = {} as ActorInfo;
        for (const result of allResults) {
            if (result.status === 'fulfilled' && result.value) {
                if (result.value.actor) {
                    actor = {...actor, ...result.value.actor};
                }
                for (const movie of result.value.movies) {
                    if (!snSet.has(movie.sn) && !isBlack(movie.sn) && needSync.indexOf(movie.sn) === -1) {
                        needSync.push(movie.sn);
                    }
                }
            }
        }

        console.info(`sync movies for ${name}, movies: ${JSON.stringify(needSync)}`);
        this.movieService.insertActor(actor);

        const movies = [] as Movie[];
        for (const sn of needSync) {
            movies.push(await this.syncMovie({sn}));
        }
        await this.movieService.calcActorScore(name);
        return movies;
    }

    async syncRank(args: {type: RankType, start?: number, end?: number}): Promise<RankMovie[]> {
        const {type, start, end} = args;
        const allPromises = [
            this.javlibProvider.fetchRankMovie(type, {start, end}),
            this.mankoProvider.fetchRankMovie(type, {start, end}),
            this.missavProvider.fetchRankMovie(type, {start, end}),
        ]
        const allResults = await Promise.allSettled(allPromises);
        const data = [] as RankMovie[];
        const exists = new Set<string>();
        for (const result of allResults) {
            if (result.status === 'fulfilled' && result.value) {
                for (const movie of result.value) {
                    if(!movie.sn) {
                        continue
                    }
                    // filter duplicate
                    if (!isBlacked(movie.sn!) && !exists.has(movie.sn!) && extractFC2OrCode(movie.sn!)) {
                        data.push(movie);
                        exists.add(movie.sn!);
                    }
                }
            }
        }
        for (const r of data) {
            await this.movieService.insertRankMovie(r);
        }
        return data
    }

    async syncSht(options: ({
        form: number;
        start: number;
        end: number;
        syncDetails: boolean;
    })[]) {
        const save = async (t: Thread, form: number) => {
            this.shtService.createOrUpdate(t);
            if (form === 2 || form === 36 || form === 103) {
                const torrent = {
                    sn: t.sn || t.title,
                    magnet: t.magnet,
                    size: t.size,
                    releaseDate: t.publishDate,
                    provider: 'sehuatang'
                } as Torrent;
                switch (form) {
                    case 2 :
                        torrent.dn = 'GC'
                        break
                    case 36:
                        torrent.dn = 'HD'
                        break
                    case 103:
                        torrent.dn = 'HD_Zh'
                }
                await this.torrentService.saveTorrent(torrent)
            }

        }

        for (const option of options) {
            await this.shtProvider.fetchThreads(option.form,
                option.start,
                option.end,
                {
                    needNextLevel: (t) => option.syncDetails,
                    save: (t: Thread) => save(t, option.form)
                }
            )
        }
    }
}