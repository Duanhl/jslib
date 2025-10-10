import {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Card, Col, message, Pagination, Row, Space, Typography} from 'antd';
import './index.css';
import {isUndefinedOrNull} from "../../common/types.ts";
import {extractStandardJavSn, getDmmThumbURL} from "../../common/utils.ts";
import {PlayCircleOutlined} from "@ant-design/icons";
import {Movie, MovieListType, Video} from "@jslib/common";
import {movieService} from "../../common/proxy.ts";

const {Title} = Typography;

export const MovieCard = (props: { movie: Movie, magnet?: string, video?: Video }) => {
    const {movie, magnet, video} = props;

    const cover = getDmmThumbURL(movie.sn, movie.coverUrl);
    const jvn = extractStandardJavSn(movie.sn)

    const onContextClick = async (e) => {
        e.preventDefault();

        if (magnet) {
            await navigator.clipboard.writeText(magnet + "\n");
            message.info('复制磁力链接成功');
        }
    }

    const renderItem = () => {
        return (
            <Card
                hoverable
                cover={
                    <div className={"thumb-cover"}>
                        <img src={cover} alt={movie.title}/>
                        {
                            (movie.location || !isUndefinedOrNull(props.video)) && (
                                <div className="card-overlay">
                                    <PlayCircleOutlined className="play-icon"/>
                                </div>
                            )
                        }
                    </div>
                }
                className={"movie-card"}
                onContextMenu={(e) => onContextClick(e)}
            >
                <Space direction="vertical">
                    {
                        !!movie.title && <span className={"thumb-title"}>{movie.title}</span>
                    }
                    <Space direction={"horizontal"}><strong>{movie.sn}</strong>
                        <span className={"thumb-date"}>{movie.releaseDate}</span>
                    </Space>
                </Space>
            </Card>
        )
    }

    const renderLink = () => {
        if (!isUndefinedOrNull(video)) {
            return (
                (<Link to={`/movie/${movie.sn}`} state={{local: true, video}} className={"movie-link"}>
                    {renderItem()}
                </Link>)
            )
        } else {
            if (jvn.isJavSn) {
                return (<Link to={`/movie/${movie.sn}`} className={"movie-link"}>
                    {renderItem()}
                </Link>)
            } else {
                return (<div className={"movie-link"}>
                    {renderItem()}
                </div>)
            }
        }
    }

    return (
        <>
            {renderLink()}
        </>
    )
};

const MovieSection = (props: { type: MovieListType, keyword?: string, closeTitle?: boolean }) => {
    const {type, keyword, closeTitle} = props;
    const [total, setTotal] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();
    const pageSize = 16;

    let page = 1;
    const [params] = useSearchParams();
    if (params.has('pageNo')) {
        page = parseInt(params.get('pageNo') || '1');
    }

    useEffect(() => {
        (async () => {
            await loadMovie();
        })();
    }, [page, type, keyword]);

    const loadMovie = async () => {
        let pageResult;
        const type = props.type;
        switch (type) {
            case 'popular':
                pageResult = await movieService.list({keyword: '', type, page, pageSize});
                break;
            case 'bestRated':
            case 'mostWanted':
            case "col":
                pageResult = await movieService.list({keyword: '', type, page, pageSize});
                break;
            case 'actress':
            case 'genre':
            case 'series':
                pageResult = await movieService.list({
                    keyword: keyword!,
                    type, page, pageSize
                });
                break;
        }
        setMovies(pageResult.data);
        const total = isUndefinedOrNull(pageResult.total) ? pageResult.data.length : pageResult.total;
        setTotal(total);
    };

    const onPageChange = (page: number) => {
        switch (type) {
            case 'bestRated':
                navigate(`/bestrate?pageNo=${page}`);
                break;
            case 'mostWanted':
                navigate(`/mostwanted?pageNo=${page}`);
                break;
            case 'actress':
                navigate(`/actor/${keyword}?pageNo=${page}`);
                break;
            case 'series':
                navigate(`/series/${keyword}?pageNo=${page}`);
                break;
            case 'genre':
                navigate(`/genre/${keyword}?pageNo=${page}`);
                break
            case "col":
                navigate(`/cols?pageNo=${page}`);
                break;
            case "popular":
                // do nothing
                navigate(`/?pageNo=${page}`);
                break;
        }
    };

    return (
        <div className={"movie-section"}>
            <div className={"section-header"}>
                {
                    !closeTitle && keyword && (<Title level={3}>{keyword}</Title>)
                }
            </div>
            <Row gutter={[16, 24]}>
                {movies.map(movie => (
                    <Col key={movie.sn} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                        <MovieCard movie={movie}/>
                    </Col>
                ))}
            </Row>
            <div className="pagination-wrapper">
                <Pagination
                    current={page}
                    onChange={onPageChange}
                    total={total}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    showQuickJumper={true}
                    hideOnSinglePage={true}
                />
            </div>
        </div>
    );
};

export const MovieSectionWrapper = (props: { type: MovieListType, keyword?: string, closeTitle?: boolean }) => {
    return (
        <div style={{marginTop: '64px'}}>
            <MovieSection type={props.type} keyword={props.keyword} closeTitle={props.closeTitle}/>
        </div>
    )
}

export default MovieSection;
