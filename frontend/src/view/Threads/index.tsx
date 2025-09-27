import React, {useState, useEffect} from 'react';
import {List, Pagination, Empty} from 'antd';
import './index.css';
import {Thread} from "@jslib/common";
import {threadService} from "../../common/proxy.ts";
import {useSearchParams} from "react-router-dom";

interface SearchResult {
    threads: Thread[];
    total: number;
}

const SearchPage: React.FC = () => {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(18);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SearchResult>({threads: [], total: 0});

    let title: string = '';
    const [params] = useSearchParams();
    if (params.has('title')) {
        title = params.get('title') || ''
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await threadService.search({
                    title: title || '', pageNo, pageSize
                });
                setData(res);
            } finally {
                setLoading(false);
            }
        })()
    }, [title, pageNo]);

    return (
        <div className="search-page">
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