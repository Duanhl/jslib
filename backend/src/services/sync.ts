import {ShtProvider} from "./provider/sht";
import {ShtService} from "./sht";
import {TorrentService} from "./torrent";
import {ISyncService, Movie, Thread, Torrent, ActorInfo, EventMsg, RankType, RankMovie} from "@jslib/common";
import {JavlibProvider} from "./provider/javlib";
import {Manko} from "./provider/manko";
import {JavbusProvider} from "./provider/javbus";
import {MovieService} from "./movie";
import {isBlacked} from "./types";
import {Config} from "../config";
import {MissavProvider} from "./provider/missav";
import {extractCode, extractFC2OrCode, mergeMovie} from "../common/utils";
import logger from "../common/logs";


export class SyncService implements ISyncService {
    private taskMessages: Map<number, EventMsg> = new Map();
    private taskTimestamps: Map<number, number> = new Map();
    private taskQueue: Array<{ taskId: number; name: string, type: 'star' | 'series', needAll?: boolean }> = [];
    private isProcessing: boolean = false;
    private nextTaskId: number = 1;
    private cleanupInterval: NodeJS.Timeout;

    constructor(private readonly shtProvider: ShtProvider,
                private readonly javlibProvider: JavlibProvider,
                private readonly mankoProvider: Manko,
                private readonly javbusProvider: JavbusProvider,
                private readonly movieService: MovieService,
                private readonly shtService: ShtService,
                private readonly missavProvider: MissavProvider,
                private readonly torrentService: TorrentService) {
        // 启动定时清理任务，每1分钟检查一次
        this.cleanupInterval = setInterval(() => {
            this._cleanupCompletedTasks();
        }, 60 * 1000);
    }

    async syncMovie(args: { sn: string; }): Promise<Movie> {
        const {sn} = args;
        const start = Date.now();
        const providers = [this.javbusProvider, this.javlibProvider, this.mankoProvider, this.missavProvider];
        const promises = providers.map(provider => provider.fetchMovie(sn));
        const results = await Promise.allSettled(promises);

        let movie = {} as Movie;
        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                const value = result.value;
                movie = mergeMovie(movie, value);
            }
        }

        if(movie.sn) {
            await this.movieService.createMovie(movie);
            if(movie.torrents) {
                for (const torrent of movie.torrents) {
                    await this.torrentService.saveTorrent(torrent)
                }
            }
            logger.info(`sync movie for ${sn} successfully. cost: ${(Date.now() - start) / 1000} s`);
            return movie;
        } else {
            logger.info(`sync movie for ${sn} Failed`);
            return movie;
        }
    }


    async syncStar(args: { name: string; needAll?: boolean }, sync?: boolean): Promise<number> {
        const taskId = this.nextTaskId++;
        const initialMsg: EventMsg = {
            taskId,
            total: 0,
            current: 0,
            status: 'processing',
            message: `准备开始 ${args.name}`
        };

        this.taskMessages.set(taskId, initialMsg);
        this.taskTimestamps.set(taskId, Date.now());
        this.taskQueue.push({ taskId, name: args.name, type: 'star', needAll: args.needAll });

        this._processQueue();
        return taskId;
    }

    async syncSeries(args: { name: string }): Promise<number> {
        const taskId = this.nextTaskId++;
        const initialMsg: EventMsg = {
            taskId,
            total: 0,
            current: 0,
            status: 'processing',
            message: `准备开始 ${args.name}`
        }

        this.taskMessages.set(taskId, initialMsg);
        this.taskTimestamps.set(taskId, Date.now());
        this.taskQueue.push({ taskId, name: args.name, type: 'series' });

        this._processQueue();
        return taskId;
    }

    async taskDetails(args: { taskId: number }): Promise<EventMsg> {
        const msg = this.taskMessages.get(args.taskId);
        if (!msg) {
            throw new Error(`task [${args.taskId}] not exists`);
        }
        return msg;
    }

    private async _processQueue(): Promise<void> {
        if (this.isProcessing || this.taskQueue.length === 0) {
            return;
        }

        this.isProcessing = true;

        while (this.taskQueue.length > 0) {
            const task = this.taskQueue.shift()!;
            try {
                if(task.type === 'star') {
                    await this._doSyncStar(task.taskId, task.name, task.needAll);
                } else if (task.type === 'series') {
                    await this._doSyncSeries(task.taskId, task.name);
                }
            } catch (error: any) {
                logger.error(`task ${task.taskId} failed: ${error.message}`);
                // 更新任务状态为错误
                this._updateTaskMessage(task.taskId, {
                    taskId: task.taskId,
                    total: 0,
                    current: 0,
                    status: 'error',
                    message: `任务 ${task.name} 失败`,
                });
            }
        }

        this.isProcessing = false;
    }

    private async _doSyncStar(taskId: number, name: string, needAll: boolean = false): Promise<Movie[]> {
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

        logger.info(`sync movies for ${name}, movies: ${JSON.stringify(needSync)}`);
        this._updateTaskMessage(taskId, {
            taskId,
            total: needSync.length,
            current: 0,
            status: 'processing',
            message: `开始任务 ${name}`,
        });

        this.movieService.insertActor(actor);

        const movies = [] as Movie[];
        let count = 1;
        const stopDate = new Date(new Date().getTime() - 6.1 * 30 * 24 * 3600 * 1000).toISOString().split("T")[0];
        for (const sn of needSync) {
            const movie = await this.syncMovie({sn});
            if(movie.sn) {
                this._updateTaskMessage(taskId, {
                    taskId,
                    total: needSync.length,
                    current: count++,
                    status: 'processing',
                    message: `${movie.sn} 完成`,
                });
                movies.push(movie);
                if(!needAll && movie.releaseDate && movie.releaseDate < stopDate) {
                    break
                }
            } else {
                this._updateTaskMessage(taskId, {
                    taskId,
                    total: needSync.length,
                    current: count++,
                    status: 'processing',
                    message: `${movie.sn} 失败`,
                });
            }
        }

        logger.info(`sync movies for ${name} success`);
        this._updateTaskMessage(taskId, {
            taskId,
            total: needSync.length,
            current: needSync.length,
            status: 'success',
            message: `${name} 完成`,
        });
        await this.movieService.calcActorScore({name});
        return movies;
    }

    private async _doSyncSeries(taskId: number, name: string): Promise<Movie[]> {
        const sns = name + "-123";
        if(!extractCode(sns)) {
            this._updateTaskMessage(taskId, {
                taskId,
                status: 'success',
                total: 0,
                current: 0,
                message: `任务 ${name} 完成`,
            })
            return [] as Movie[];
        }
        const result = [] as Movie[];
        const reallyName = extractCode(sns)?.split('-')[0];
        let lastTime = "";
        let failedCnt = 0
        for (let i = 1; i < 1000; i++) {
            const sn = reallyName + "-" + i.toString().padStart(3, "0");
            try {
                const dbMovie = await this.movieService.details({sn});
                failedCnt = 0
                lastTime = (dbMovie.releaseDate || '0000') > lastTime ? dbMovie.releaseDate! : lastTime;
            } catch (e) {
                const syncMovie = await this.syncMovie({sn});
                if(syncMovie.sn) {
                    failedCnt = 0
                    lastTime = (syncMovie.releaseDate || '0000') > lastTime ? syncMovie.releaseDate! : lastTime;
                    this._updateTaskMessage(taskId, {
                        taskId,
                        total: result.length,
                        current: result.length,
                        status: 'processing',
                        message: `${syncMovie.sn} 完成`,
                    })
                } else {
                    failedCnt++
                    if(failedCnt === 3) {
                        break;
                    }
                }
            }
        }
        this._updateTaskMessage(taskId, {
            taskId,
            total: result.length,
            current: result.length,
            status: 'success',
            message: `任务 ${name} 完成`,
        })
        return result;
    }

    private _updateTaskMessage(taskId: number, msg: EventMsg): void {
        this.taskMessages.set(taskId, msg);
        this.taskTimestamps.set(taskId, Date.now());
    }

    private _cleanupCompletedTasks(): void {
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;

        for (const [taskId, timestamp] of this.taskTimestamps.entries()) {
            const msg = this.taskMessages.get(taskId);
            if (msg && (msg.status === 'success' || msg.status === 'error')) {
                if (now - timestamp > tenMinutes) {
                    this.taskMessages.delete(taskId);
                    this.taskTimestamps.delete(taskId);
                    logger.info(`clean task for ${taskId}`);
                }
            }
        }
    }

    async syncRank(args: {type: RankType, start?: number, end?: number}): Promise<RankMovie[]> {
        const {type, start, end} = args;
        logger.info(`sync rank for ${type}`);
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
        logger.info(`sync rank rank for ${type} sucessfully. size: ${data.length}`);
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
            try {
                logger.info(`sync sht ${JSON.stringify(option, null, 0)}`);
                const threads = await this.shtProvider.fetchThreads(option.form,
                    option.start,
                    option.end,
                    {
                        needNextLevel: (t) => option.syncDetails,
                        save: (t: Thread) => save(t, option.form)
                    }
                )
                logger.info(`sync sht successfully, size: ${threads.length}`);
            } catch (error: any) {
                logger.error(`sync sht failed: ${error.message}}`);
            }
        }
    }

    dispose() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}