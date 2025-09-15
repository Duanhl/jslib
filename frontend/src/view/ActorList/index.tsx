import {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Card, Col, List, Row, Space, Statistic, Typography} from 'antd';
import {FireOutlined} from '@ant-design/icons';
import './index.css';
import {ActorInfo, listActors} from "../../api/api.ts";
import {getDmmThumbURL, round} from "../../common/utils.ts";

const {Text } = Typography;

const ActorList = () => {

    const pageSize = 16;
    const [total, setTotal] = useState(0);
    const [actors, setActors] = useState<ActorInfo[]>([]);
    const navigate = useNavigate();

    let page = 1;
    const [params] = useSearchParams();
    if (params.has('pageNo')) {
        page = parseInt(params.get('pageNo') || '1');
    }

    useEffect(() => {
        (async () => {
            const pageResult = await listActors({ page, pageSize });
            setTotal(pageResult.total || 0);
            setActors(pageResult.data);
        })();
    }, [page]);

    const onPageChange = (page: number) => {
        navigate(`/actors?pageNo=${page}`);
    };

    return (
        <div className="creator-list">
            <List
                grid={{
                    gutter: 24,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={actors}
                renderItem={actor => (
                    <List.Item>
                        <Link to={`/actor/${actor.name}`}>
                            <Card
                                className="creator-card"
                                cover={
                                    <div className="video-cover">
                                        <img src={getDmmThumbURL(actor.sn)} alt={actor.sn} />
                                    </div>
                                }
                            >
                                <Card.Meta
                                    title={actor.name}
                                    description={
                                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                            <Row gutter={16}>
                                                <Col span={10}>
                                                    <Statistic
                                                        value={round(actor.score)}
                                                        prefix={<FireOutlined />}
                                                    />
                                                </Col>
                                                <Col span={14}>
                                                    <div  className="latest-video">
                                                        <Text strong>最新：{actor.sn}</Text>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Link>
                    </List.Item>
                )}
                pagination={{
                    pageSize,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    defaultCurrent: 1,
                    current: page,
                    total,
                    hideOnSinglePage: true,
                    onChange: onPageChange,
                    align:'center'
                }}
            />
        </div>
    );
};

export default ActorList;
