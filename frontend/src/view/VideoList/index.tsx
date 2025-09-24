import {useEffect, useState} from 'react';
import {Col, Input, Pagination, Row, Space} from 'antd';
import './index.css';
import {MovieCard} from "../MovieSection";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Movie, Video} from "@jslib/common";
import {movieService} from "../../common/proxy.ts";

const { Search } = Input;

const VideoList = () => {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [videos, setVideos] = useState<Video[] | null>([]);
    const [total, setTotal] = useState<number>(0);
    const pageSize = 16;
    let page = 1;
    let name = "";
    if(params.has("pageNo")) {
        page = parseInt(params.get("pageNo") || '1');
    }
    if(params.has("name")) {
        name = params.get("name") || '';
    }

    useEffect(() => {
        (async () => {
            const res = await movieService.listVideos({name, page, pageSize});
            setVideos(res.data)
            setTotal(res.total!);
        })()
    }, [page, name]);

    const onSearch = (value: string) => {
        navigate(`/videos?name=${value}`);
    }

    const onPageChange = (page: number) => {
        navigate(`/videos?pageNo=${page}&name=${name}`);
    }

    return (
        <div className={"video-page"}>
            <div className={"video-header"}>
                <div className={"video-header-content"}>
                    <Space direction={'horizontal'}>
                        <Search
                            defaultValue={name}
                            placeholder="搜索影片名称"
                            allowClear
                            onSearch={onSearch}
                        />
                    </Space>
                </div>
            </div>
            <div className={"movie-section"}>
                <Row gutter={[16, 24]}>
                    {videos?.map((video, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                            <MovieCard movie={{sn: video.sn, title: video.fileName} as Movie} video={video}/>
                        </Col>
                    ))}
                </Row>
            </div>
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
        </div>)
};

export default VideoList;