import {Radio, Space} from 'antd';
import './index.css';
import MovieSection from "../MovieSection";
import {useNavigate, useParams} from "react-router-dom";
import {ListType} from "../../api/api.ts";
import {GENRES, SERIES} from "../../common/utils.ts";

const CategoryPage = () => {
    const { series, genre } = useParams();
    const type: ListType = series ?  "series" : "tag";
    const navigate = useNavigate();
    const onChange = (value: string, type: ListType) => {
        if(type === 'series') {
            navigate(`/series/${value}`);
        } else {
            navigate(`/genre/${value}`);
        }
    }

    const renderFilter = (title: string, items: string[], type: ListType, value: string) => (
        <div className="filter-row">
            <div className="filter-label">{title}:</div>
            <Radio.Group value={value} onChange={e => onChange(e.target.value, type)}>
                <Space wrap size={16}>
                    {items.map(item => (
                        <Radio key={item} value={item}>
                            {item}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </div>
    );

    const keyword = series || genre;

    return (
        <div className="category-page">
            <div className="category-header">
            </div>

            <div className="filter-section">
                <div className="filter-container">
                    {renderFilter('标签', GENRES, 'tag', (type === 'tag') ? keyword! : '')}
                    {renderFilter('系列', SERIES, 'series', (type === 'series') ? keyword! : '')}
                </div>
            </div>
            
            <MovieSection type={type} keyword={keyword}/>
        </div>
    );
};

export default CategoryPage;
