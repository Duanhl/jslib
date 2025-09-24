import {ShtProvider} from "./provider/sht";
import {ShtService} from "./sht";
import {TorrentService} from "./torrent";
import {ISyncService, Movie, Thread, Torrent, Comment} from "@jslib/common";
import {JavlibProvider} from "./provider/javlib";
import {Manko} from "./provider/manko";
import {JavbusProvider} from "./provider/javbus";
import {MovieService} from "./movie";


export class SyncService implements ISyncService {
    constructor(private readonly shtProvider: ShtProvider,
                private readonly javlibProvider: JavlibProvider,
                private readonly mankoProvider: Manko,
                private readonly javbusProvider: JavbusProvider,
                private readonly movieService: MovieService,
                private readonly shtService: ShtService,
                private readonly torrentService: TorrentService) {
    }

    async syncMovie(args: { sn: string; }): Promise<Movie> {
        const {sn} = args;
        const providers = [this.javbusProvider, this.javlibProvider, this.mankoProvider];
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
                movie = {...movie, ...value};
                if(value.actors && value.actors?.length > actors.length) {
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
                if(value.torrents) {
                    torrents.push(...value.torrents);
                }
            }
        }

        movie.actors = actors;
        movie.genres = genres;
        movie.previewImages = previewImages;
        await this.movieService.createMovie(movie);
        for (const torrent of torrents) {
            await this.torrentService.saveTorrent(torrent)
        }

        movie.comments = comments;
        movie.torrents = torrents;
        return movie;
    }


    asyncStar(args: { name: string; }): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async syncSht(options: ({
        form: number;
        start: number;
        end: number;
        syncDetails: boolean;
    })[]) {

        const save = async (t: Thread, form: number) => {
            this.shtService.createOrUpdate(t);
            if(form === 2 || form === 36 || form === 103) {
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
                    needNextLevel:  (t) => option.syncDetails,
                    save: (t: Thread) => save(t, option.form)
                }
            )
        }
    }
}