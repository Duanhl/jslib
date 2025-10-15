import React from 'react';
import dayjs from 'dayjs';
import zhCN from 'antd/locale/zh_CN';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import {ConfigProvider, notification, theme} from 'antd';
import 'antd/dist/reset.css';
import Navbar from "./view/NavBar";
import MovieSection, {MovieSectionWrapper} from "./view/MovieSection";
import CategoryPage from "./view/CategoryPage";
import MovieDetail from "./view/MovieDetail";
import Actor from "./view/Actor";
import ActorList from "./view/ActorList";
import HighTorrents from "./view/Torrents";
import VideoList from "./view/VideoList";
import Threads from "./view/Threads";
import CategoryTabs from "./view/CategoryTabs";
import ConfigManager from "./view/Settings";

dayjs.locale('zh-cn');


const Application: React.FC = () => {
    // const [epoch, setEpoch] = useState<number>(0);

    const [, contextHolder] = notification.useNotification();

    // useEffect(() => {
    //     const timer = setTimeout(async () => {
    //         try {
    //             const msg = await loopEventMsg();
    //             if (msg.type === 'syncStar') {
    //                 const [actorName, done, all] = msg.msg.split(',');
    //                 const percent = (parseInt(done) + 1) / parseInt(all) * 100;
    //                 api.open({
    //                     key: 'syncStar',
    //                     message: `同步影片: ${actorName}`,
    //                     duration: null,
    //                     description: <Progress size={'small'}
    //                                            percent={percent}
    //                                            format={() => `${parseInt(done) + 1}/${all}`}/>
    //                 });
    //             }
    //             setEpoch(prevState => prevState + 1);
    //         } catch (e) {
    //             // pass
    //             console.log(e);
    //         }
    //     }, 0);
    //     return () => clearTimeout(timer);
    // }, [epoch]);


    return <ConfigProvider locale={zhCN}
                           theme={{
                               algorithm: theme.defaultAlgorithm,
                               token: {
                                   colorPrimary: '#E0282E',
                                   borderRadius: 4
                               },
                               components: {
                                   Descriptions: {
                                       fontSize: 14
                                   }
                               }
                           }}
    >
        {contextHolder}
        <Router>
            <div className="app">
                <Navbar/>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <CategoryTabs/>
                                <MovieSection type="popular"/>
                            </>

                        }/>
                        <Route path={'/mostwanted'} element={<MovieSectionWrapper type="mostWanted"/>}/>
                        <Route path={'/bestrate'} element={<MovieSectionWrapper type={'bestRated'}/>}/>
                        <Route path={'/cols'} element={<MovieSectionWrapper type={'col'}/>}/>
                        <Route path={'/threads'} element={<Threads />}/>

                        <Route path="/movie/:sn" element={<MovieDetail/>}/>
                        <Route path={'/actor/:name'} element={<Actor/>}/>

                        <Route path="/actors" element={<ActorList/>}/>

                        <Route path="/genre/:genre" element={<CategoryPage/>}/>
                        <Route path={'/series/:series'} element={<CategoryPage/>}/>

                        <Route path={'/torrents'} element={<HighTorrents/>}/>
                        <Route path={'/videos'} element={<VideoList/>}/>
                        <Route path="/settings" element={<ConfigManager/>}/>
                    </Routes>
                </main>
            </div>

        </Router>
    </ConfigProvider>;
};

export default Application;
