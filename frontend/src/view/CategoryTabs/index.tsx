import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Space} from 'antd';
import './index.css';
import {GENRES, SERIES} from "../../common/utils.ts";

const CategoryTabs = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="category-tabs">
            <div className="category-container">
                <Space direction={'vertical' } >
                    <Menu
                        mode="horizontal"
                        selectedKeys={[activeTab]}
                        className="main-categories"
                        onClick={({key}) => setActiveTab(key)}
                    >
                        {GENRES.map(genre => (
                            <Menu.Item key={genre}>
                                <Link to={`/genre/${genre}`}>
                                    {genre}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[activeTab]}
                        className="main-categories"
                        onClick={({key}) => setActiveTab(key)}
                    >
                        {SERIES.map(series => (
                            <Menu.Item key={series}>
                                <Link to={`/series/${series}`}>
                                    {series}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Space>
            </div>
        </div>
    );
};

export default CategoryTabs;
