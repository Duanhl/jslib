import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, message, Popconfirm, Space, Typography} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import './index.css';
import MovieSection from "../MovieSection";
import {syncMovieByStar} from "../../api/api.ts";
import {ActorInfo} from "@jslib/common";
import {movieService} from "../../common/proxy.ts";

const { Title, Text } = Typography;

const Actor = () => {
    const { name } = useParams();
    const [actor, setActor] = useState<ActorInfo | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if(name) {
                const res = await movieService.actor({name});
                setActor(res);
            }
        })()
    }, [name]);

    const onConfirm = async () => {
        const msg = await syncMovieByStar(name as string);
        message.warning(msg);
    };

    return (
        <div className="creator-detail">
            <div className="creator-header">
                <div className="header-content">
                    <div className="basic-info">
                        {/*<Avatar*/}
                        {/*    size={100}*/}
                        {/*    src={actor.images}*/}
                        {/*    className="creator-avatar"*/}
                        {/*/>*/}
                        <div className="info-content">
                            <Space direction="vertical" size={12}>
                                <Title level={4}>{name}</Title>
                                <Text type="secondary">{actor?.hobby}</Text>
                                <Space size={32}>
                                    <Space>
                                        <Text>{actor?.height}</Text>
                                        <Text type="secondary">cm</Text>
                                    </Space>
                                    <Space>
                                        <Text>{actor?.cup}</Text>
                                        <Text type="secondary">cup</Text>
                                    </Space>
                                    <Space>
                                        <Text>{actor?.birthday}</Text>
                                    </Space>
                                    <Space>
                                        <Popconfirm title={'是否同步所有电影'}
                                                    onConfirm={() => onConfirm()}
                                                    okText={'是'}
                                                    cancelText={'否'}>
                                            <Button icon={<SyncOutlined/>} type="primary">同步</Button>
                                        </Popconfirm>
                                    </Space>
                                </Space>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            <div className="creator-content">
                <div className="content-wrapper">
                    <MovieSection type={'actress'} keyword={name} closeTitle={true} />
                </div>
            </div>
        </div>
    );
};

export default Actor;
