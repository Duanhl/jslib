import {useEffect, useRef} from 'react';
import Artplayer from 'artplayer';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import './index.css';

const VideoPlayer = (props: { sn: string, cover: string, title: string }) => {
    const artRef = useRef<HTMLDivElement>(null);
    const {sn, cover, title} = props;

    useEffect(() => {
        const art = new Artplayer({
            container: artRef.current!,
            url: `http://localhost:7777/video?sn=${sn}`,
            poster: cover,
            volume: 0.7,
            isLive: false,
            muted: false,
            autoplay: true,
            pip: true,
            autoSize: true,
            autoMini: true,
            screenshot: true,
            setting: true,
            loop: false,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            subtitleOffset: true,
            miniProgressBar: true,
            mutex: true,
            backdrop: true,
            playsInline: true,
            autoPlayback: true,
            theme: '#fb7299',
            plugins: [
                artplayerPluginDanmuku({
                    danmuku: [],
                    speed: 5,
                    opacity: 1,
                    fontSize: 25,
                    color: '#FFFFFF',
                    mode: 0,
                    margin: [0, '0%'],
                    antiOverlap: true,
                    synchronousPlayback: false,
                    lockTime: 5,
                    maxLength: 100,
                    theme: 'dark',
                }),
            ],
            controls: [
                {
                    name: 'quality',
                    position: 'right',
                    html: '清晰度',
                    selector: [
                        {
                            html: '1080P',
                            default: true,
                        },
                    ],
                },
            ],
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, [sn, cover, title]);

    return (
        <div className="video-player-container">
            <div className="artplayer-app" ref={artRef} />
        </div>
    );
};

export default VideoPlayer;
