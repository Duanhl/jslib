export interface Movie {
    sn?: string;
    title?: string;
    actors?: string[];
    director?: string;
    duration?: string;
    maker?: string;
    publisher?: string;
    releaseDate?: string;
    series?: string;
    score?: string;
    wanted?: string;
    liked?: string;
    location?: string;
    coled?: number;

    genres?: string[];
    thumbUrl?: string;
    coverUrl?: string;
    previewImages?: string[];
    torrents?: Torrent[];
    comments?: Comment[];
}

export interface Comment {
    sn?: string;
    site?: string;
    user?: string;
    comment?: string;
    publishDate?: string;
    replyId?: string;
}

export interface Torrent {
    sn?: string;
    magnet?: string;
    size?: string;
    dn?: string;
    site?: string;
    publishDate?: string;
}

export interface ActorInfo {
    name?: string;
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

export interface Video {
    sn?: string;
    fileName?: string;
    mime?: string;
    filePath?: string;
    size?: string;
}

export interface EventMsg {
    type?: 'syncStar';
    msg?: string;
    timestamp?: string;
}