import {useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Image, Layout, message, Popconfirm, Row, Space, Spin, Typography} from 'antd';
import {
    CloseOutlined, DeleteFilled,
    EyeOutlined,
    PlayCircleOutlined,
    ReloadOutlined,
    StarFilled,
    StarOutlined
} from '@ant-design/icons';
import Comments from '../Comments';
import './index.css';
import VideoPlayer from '../VideoPlayer';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {isUndefinedOrNull} from "../../common/types.ts";
import {getDmmThumbURL} from "../../common/utils.ts";
import {movieService, syncService} from "../../common/proxy.ts";
import {Movie} from "@jslib/common";

const {Title, Text} = Typography;

const MovieDetail = () => {
    const location = useLocation();
    const {sn} = useParams();
    const {local, video} = location.state || {};
    const [movie, setMovie] = useState<Movie | undefined>(undefined);
    const [showPlayer, setShowPlayer] = useState(false);
    const navigate = useNavigate();
    const [messageApi] = message.useMessage();

    useEffect(() => {
        (async () => {
            if (sn) {
                let movie = {} as Movie;
                try {
                    movie = await movieService.details({sn});
                } catch (e: any) {
                    if (e.message.indexOf('Movie not found') !== -1) {
                        if (local) {
                            movie = ({
                                sn: video.sn!,
                                coverUrl: "",
                                title: video.fileName!,
                                comments: [],
                                previewImages: [],
                                torrents: [],
                                location: video.fileName!,
                            }) as Movie
                        } else {
                            movie = await syncService.syncMovie({sn});
                        }
                    }
                }
                setMovie(movie);
            }
        })();
    }, [sn]);

    const reload = async () => {
        if (movie?.sn) {
            const movieInfo = await syncService.syncMovie({sn: movie?.sn});
            setMovie(movieInfo);
        }
    };

    const onColMovie = async () => {
        if (movie?.sn) {
            await movieService.colMovie({sn: movie?.sn});
            const movieInfo = await movieService.details({sn: movie?.sn});
            setMovie(movieInfo);
        }
    }

    const onUnColMovie = async () => {
        if (movie?.sn) {
            await movieService.unColMovie({sn: movie?.sn});
            const movieInfo = await movieService.details({sn: movie?.sn});
            setMovie(movieInfo);
        }
    }

    const onClickCopy = async (magnet: string) => {
        await navigator.clipboard.writeText(magnet + "\n");
        messageApi.open({
            type: 'info',
            content: '复制成功'
        });
    };

    const onDelete = async () => {
        if(movie?.sn) {
            await movieService.delMovie({sn: movie?.sn});
            const canGoBack = window.history.length > 1;

            if (canGoBack) {
                navigate(-1);
            } else {
                navigate('/', { replace: true });
            }
        }
    }

    let bigCover = movie?.coverUrl;
    if (bigCover?.startsWith('//')) {
        bigCover = 'https:' + bigCover;
    }
    if (!bigCover) {
        bigCover = getDmmThumbURL(sn!)
    }

    const isLocalPlayer = !!(movie?.location);
    const isRemotePlayer = movie?.players && movie.players.length > 0;

    const onPlayClick = () => {
        if (isLocalPlayer) {
            setShowPlayer(true);
            return
        }
        if (isRemotePlayer) {
            for (const url of movie?.players || []) {
                if(url.indexOf('upload18') !== -1) {
                    open(url);
                    return;
                }
            }
            open(movie?.players![0]);
        }
    }

    return (
        <Spin spinning={isUndefinedOrNull(movie)}>
            {!isUndefinedOrNull(movie) && (
                <Layout className="movie-detail">
                    <div className="movie-header">
                        <div className="movie-header-content">
                            <div className="movie-cover">
                                <img src={bigCover} alt={movie.title}/>
                                {
                                    (isLocalPlayer || isRemotePlayer) && (
                                        <div className="play-overlay" onClick={onPlayClick}>
                                            <Space direction="vertical" align="center">
                                                <PlayCircleOutlined className="play-icon"/>
                                                <Text style={{color: '#fff'}}>立即播放</Text>
                                            </Space>
                                        </div>)
                                }
                            </div>
                            <div className="movie-info">
                                <Title level={4} style={{
                                    color: '#fff',
                                    marginBottom: 16,
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                                }}>
                                    {movie.sn}
                                </Title>
                                <Title level={5} style={{
                                    color: '#fff',
                                    marginBottom: 16,
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                                }}>
                                    {movie.title}
                                </Title>

                                <Space className="movie-score" style={{marginBottom: 24}}>
                                    <Text style={{color: '#ffa726', fontSize: 20}}>{movie.score}</Text>
                                    <div className="score-divider"/>
                                    <EyeOutlined/>
                                    <Text style={{color: '#fff'}}>{movie.wanted}</Text>
                                    <div className="score-divider"/>
                                    <div className="movie-actions">
                                        <Popconfirm title={'确认是否更新数据'}
                                                    okText={'是'}
                                                    cancelText={'否'}
                                                    onConfirm={reload}
                                        >
                                            <Button
                                                type="text"
                                                icon={<ReloadOutlined/>}
                                                style={{color: 'rgba(255,255,255,0.9)'}}
                                            />
                                        </Popconfirm>
                                    </div>
                                    <div className="score-divider"/>
                                    {!movie.coled && <Button
                                        type="text"
                                        icon={<StarOutlined/>}
                                        onClick={onColMovie}
                                        size={"middle"}
                                    />}
                                    {movie.coled === 1 && <Button
                                        type="text"
                                        icon={<StarFilled width={200}/>}
                                        onClick={onUnColMovie}
                                        size={"middle"}
                                    />}
                                    <div className="score-divider"/>

                                    <Popconfirm title={'是否删除此影片'}
                                                okText={'是'}
                                                cancelText={'否'}
                                                onConfirm={onDelete}>
                                        <Button type="text" icon={<DeleteFilled />} style={{color: 'rgba(255,255,255,0.9)'}}/>
                                    </Popconfirm>

                                </Space>

                                <Descriptions
                                    column={1}
                                    className="movie-meta"
                                    labelStyle={{color: 'rgba(255,255,255,0.75)', width: 42}}
                                    contentStyle={{color: 'rgba(255,255,255,0.95)'}}
                                >
                                    <Descriptions.Item label="导演">{movie.director}</Descriptions.Item>
                                    <Descriptions.Item label="主演">{movie.actors?.map(actress => <span
                                        style={{paddingLeft: '6px'}}
                                        onClick={() => navigate(`/actor/${actress}`)}
                                        key={actress}
                                    >
                                        {actress}
                                    </span>)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="类型">{movie.series}</Descriptions.Item>
                                    <Descriptions.Item label="标签">
                                        {movie.genres?.map(tag => (<span style={{paddingLeft: '6px'}}
                                                                         onClick={() => navigate(`/genre/${tag}`)}
                                                                         key={tag}
                                        >
                                            {tag}
                                        </span>))
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="发行">{movie.maker}</Descriptions.Item>
                                    <Descriptions.Item label="上映">{movie.releaseDate}</Descriptions.Item>
                                    <Descriptions.Item label="片长">{movie.duration}分钟</Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    </div>

                    <div className="movie-content">
                        <Card className="section-card">
                            <Space direction="vertical" size={32} style={{width: '100%'}}>
                                <div>
                                    <Space align="center" style={{marginBottom: 20}}>
                                        <Title level={5} style={{margin: 0}}>预览</Title>
                                    </Space>
                                    <Image.PreviewGroup>
                                        <Row gutter={[10, 10]}>
                                            {movie.previewImages?.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    src={image}
                                                    // width={240}
                                                    height={180}
                                                    alt={`Preview ${index + 1}`}
                                                    className={'prew-img'}
                                                />
                                            ))}
                                        </Row>
                                    </Image.PreviewGroup>
                                </div>

                                <div >
                                    <Title level={5}>下载地址</Title>
                                    <Row gutter={[10, 10]}>
                                        {movie.torrents?.map((torrent, index) => (
                                            <Col span={4} key={index}>
                                                <Card className="download-card"
                                                      onClick={() => onClickCopy(torrent.magnet)}>
                                                    <Space direction="horizontal" size={4} align="center"
                                                           style={{width: '100%'}}>
                                                        <Space direction='vertical'>
                                                            <Text strong>{torrent.dn}</Text>
                                                            <Text type="secondary">{torrent.size}</Text>
                                                        </Space>
                                                    </Space>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Space>
                        </Card>

                        <Card className="section-card" title={"评论"}>
                            <Comments comments={movie.comments || []}/>
                        </Card>
                    </div>

                    {showPlayer && (
                        <div className="player-modal">
                            <div className="player-modal-content">
                                <VideoPlayer
                                    sn={sn!}
                                    title={movie.title!}
                                    cover={movie.coverUrl!}
                                />
                            </div>
                            <div className="player-modal-close" onClick={() => setShowPlayer(false)}>
                                <CloseOutlined/>
                            </div>
                        </div>
                    )}
                </Layout>
            )}
        </Spin>
    );
};

export default MovieDetail;