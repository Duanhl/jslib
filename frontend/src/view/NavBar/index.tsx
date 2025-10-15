import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button, Input, Space} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './index.css';
import {extractStandardJavSn} from "../../common/utils.ts";

const { Search } = Input;

const seriesRegex = new RegExp('[A-Z]{2,6}');

const Navbar = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const onSearch = async (keyword: string) => {
        keyword = keyword.trim();
        if(pathname === '/threads') {
            navigate('/threads?title=' + keyword);
            return;
        }

        const toUpperKeyword = keyword.toUpperCase();
        const javSn = extractStandardJavSn(toUpperKeyword);
        if (javSn.isJavSn) {
            // standard sn direct goto
            navigate(`/movie/${javSn.series}-${javSn.number}`);
        } else if (toUpperKeyword.startsWith('FC2-')) {
            navigate(`/movie/${toUpperKeyword}`);
        } else if (seriesRegex.test(toUpperKeyword)) {
            navigate(`/series/${toUpperKeyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <span className="logo-text">PiliPili</span>
                </Link>
                <div className="nav-links">
                    <Link to="/threads">论坛贴</Link>
                    <Link to="/mostwanted">最想要</Link>
                    <Link to="/bestrate">最高分</Link>
                    <Link to="/actors" >
                        <UserOutlined /> 影星
                    </Link>
                    <Link to="/torrents">高清</Link>
                    <Link to="/videos">本地视频</Link>
                    <Link to="/cols">收藏</Link>
                </div>
                <div className="search-box">
                    <Search
                        placeholder="搜索影片、演员"
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <Space size={16} className="user-actions">
                    <Link to={"/settings"}>
                        <Button type="primary" icon={<UserOutlined />}>
                            设置
                        </Button>
                    </Link>
                </Space>
            </div>
        </nav>
    );
};

export default Navbar;
