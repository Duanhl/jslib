import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Card, message, Popconfirm, Progress, Row, Space, Tag, Typography} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, SyncOutlined} from '@ant-design/icons';
import './index.css';
import MovieSection from "../MovieSection";
import {ActorInfo, EventMsg} from "@jslib/common";
import {movieService, syncService} from "../../common/proxy.ts";

const {Title, Text} = Typography;

const Actor = () => {
    const {name} = useParams();
    const [actor, setActor] = useState<ActorInfo | undefined>(undefined);
    const [syncTask, setSyncTask] = useState<EventMsg | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            if (name) {
                const res = await movieService.actor({name});
                setActor(res);
            }
        })()
    }, [name]);

    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);


    const startPolling = (taskId: number) => {
        stopPolling();

        const timer = setInterval(async () => {
            try {
                const taskDetails = await syncService.taskDetails({taskId});
                setSyncTask(taskDetails);

                // 如果任务完成，停止轮询
                if (taskDetails.status === 'success' || taskDetails.status === 'error') {
                    stopPolling();
                    if (taskDetails.status === 'success') {
                        message.success(`同步任务完成: ${taskDetails.message}`);
                    } else {
                        message.error(`同步任务失败: ${taskDetails.message}`);
                    }
                }
            } catch (error) {
                console.error('轮询任务状态失败:', error);
                stopPolling();
            }
        }, 2000);

        pollingRef.current = timer;
        setIsPolling(true);
    };

    const stopPolling = () => {
        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }
        setIsPolling(false);
    };

    const onConfirm = async () => {
        if (!name) return;

        try {
            message.info('开始提交同步任务...');
            const taskId = await syncService.syncStar({name});

            // 初始化任务状态
            const initialTask: EventMsg = {
                taskId,
                total: 100,
                current: 0,
                status: 'processing',
                message: '任务已提交，等待执行...'
            };
            setSyncTask(initialTask);

            message.success(`同步任务提交成功，任务ID: ${taskId}`);

            // 开始轮询
            startPolling(taskId);

        } catch (error) {
            message.error('提交同步任务失败');
            console.error('同步任务提交失败:', error);
        }
    };

    const renderStatusTag = () => {
        if (!syncTask) return null;

        const statusConfig = {
            processing: {
                color: 'blue',
                icon: <LoadingOutlined />,
                text: '同步中'
            },
            success: {
                color: 'green',
                icon: <CheckCircleOutlined />,
                text: '同步完成'
            },
            error: {
                color: 'red',
                icon: <CloseCircleOutlined />,
                text: '同步失败'
            }
        };

        const config = statusConfig[syncTask.status];
        return (
            <Tag icon={config.icon} color={config.color} className="status-tag">
                {config.text}
            </Tag>
        );
    };


    const renderProgress = () => {
        if (!syncTask || syncTask.status !== 'processing') return null;

        return (
            <div className="progress-section">
                <Progress
                    percent={ Math.round(syncTask.current / syncTask.total * 100)}
                    status="active"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                />
                <Text type="secondary" className="progress-message">
                    {syncTask.message}
                </Text>
            </div>
        );
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
                            <Row>
                                <Space direction="vertical" size={12}>
                                    <Title level={4}>{name}</Title>
                                    <Text type="secondary">{actor?.hobby}</Text>
                                    <Space size={32}>
                                        <Space>
                                            <Text>{(actor?.score || 0).toFixed(2)}</Text>
                                            <Text type="secondary">☆</Text>
                                        </Space>
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
                                            <Popconfirm title={`是否同步 ${name} 所有电影`}
                                                        onConfirm={() => onConfirm()}
                                                        okText={'是'}
                                                        cancelText={'否'}
                                                        disabled={isPolling}
                                            >
                                                <Button icon={<SyncOutlined/>} type="primary"> {isPolling ? '同步中...' : '同步电影'}</Button>
                                            </Popconfirm>
                                        </Space>
                                    </Space>
                                </Space>

                                <Space size={50}/>

                                {syncTask && (
                                    <div className="sync-status-card">
                                        <Card
                                            title={
                                                <Space>
                                                    {renderStatusTag()}
                                                </Space>
                                            }
                                            size="small"
                                            className="status-card"
                                        >
                                            <Space direction="vertical" style={{width: '100%'}} size={16}>
                                                {renderProgress()}
                                                {syncTask.status !== 'processing' && (
                                                    <Button
                                                        size="small"
                                                        onClick={() => setSyncTask(null)}
                                                    >
                                                        清除状态
                                                    </Button>
                                                )}
                                            </Space>
                                        </Card>
                                    </div>
                                )}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>


            <div className="creator-content">
                <div className="content-wrapper">
                    <MovieSection type={'actress'} keyword={name} closeTitle={true}/>
                </div>
            </div>
        </div>
    );
};

export default Actor;
