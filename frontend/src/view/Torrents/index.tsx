import {Col, Pagination, Row} from "antd";
import {useEffect, useState} from "react";
import {MovieCard} from "../MovieSection";
import "./index.css"
import {Movie, Torrent} from "@jslib/common";
import {torrentService} from "../../common/proxy.ts";


const HighTorrents = () => {
    const [torrents, setTorrents] = useState<Torrent[]>([]);
    const pageSize = 16;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            const res = (await torrentService.listHighCh({page, pageSize}));
            setTorrents(res.torrents);
            setTotal(res.total)
        })();
    }, [page]);


    return (
        <div className={"torrents-page"}>
            <div className={"movie-section"}>
                <Row gutter={[16, 24]}>
                    {torrents.map((t, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                            <MovieCard movie={{sn: t.sn, releaseDate: t.releaseDate} as Movie} magnet={t.magnet}/>
                        </Col>
                    ))}
                </Row>
            </div>
            <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={setPage}
                showQuickJumper={true}
                hideOnSinglePage={true}
                align={"center"}
            />
        </div>
    )
}

export default HighTorrents;