import React, {useState, useEffect} from 'react';
import {Input, Card, List, Pagination, Empty} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import './index.css';
import {Thread} from "@jslib/common";
import {threadService} from "../../common/proxy.ts";

interface SearchResult {
    threads: Thread[];
    total: number;
}

const SearchPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(20);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SearchResult>({threads: [], total: 0});

    // 拉取数据
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await threadService.search({
                title, pageNo, pageSize
            });
            setData(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchData(), 1000); // 简单防抖
        return () => clearTimeout(timer);
    }, [title, pageNo]);

    return (
        <div className="search-page">
            {/* 顶部搜索区 */}
            <div className="search-head">
                <Card className="search-card">
                    <Input
                        size="large"
                        placeholder="输入关键词搜索帖子"
                        prefix={<SearchOutlined/>}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setPageNo(1); // 关键词变化回到第一页
                        }}
                        allowClear
                    />
                </Card>
            </div>

            {/* 结果区 */}
            <div className="search-body">
                <List
                    itemLayout="horizontal"
                    loading={loading}
                    dataSource={data.threads}
                    locale={{emptyText: <Empty description="暂无结果"/>}}
                    renderItem={(item) => (
                        <List.Item
                            key={item.threadId}
                            className="thread-item"
                            onClick={() => window.open(`https://espa.3n852.net/${item.url}`, '_blank')}
                        >
                            <div className="thread-content">
                                <div className="thread-title">{item.title}</div>
                                <div className="thread-date">{item.publishDate || '-'}</div>
                            </div>
                        </List.Item>
                    )}
                />
                {data.total > 0 && (
                    <Pagination
                        current={pageNo}
                        pageSize={pageSize}
                        total={data.total}
                        showSizeChanger={false}
                        showQuickJumper
                        showTotal={(t) => `共 ${t} 条`}
                        onChange={(p) => setPageNo(p)}
                        className="pagination"
                    />
                )}
            </div>
        </div>
    );
};

export default SearchPage;