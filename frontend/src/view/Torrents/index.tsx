import {Button, Col, DatePicker, Row, Space} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {MovieCard} from "../MovieSection";
import {listTorrents, Movie, Torrent} from "../../api/api.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {formatDate} from "../../common/date.ts";
import type {DatePickerProps} from "antd/es/date-picker";
import "./index.css"


const HighTorrents = () => {
    const [torrents, setTorrents] = useState<Torrent[]>([]);
    const navigate = useNavigate();

    let date = formatDate(new Date(), 'yyyy-MM-dd');
    const [params] = useSearchParams();
    if (params.has('date')) {
        date = params.get('date') || '';
    }

    useEffect(() => {
        (async () => {
            const torrents = (await listTorrents({keyword: date})).data;
            setTorrents(torrents);
        })();
    }, [date]);

    const onDayChange = (value: DatePickerProps['value']): void => {
        navigate(`/torrents?date=${value?.format('YYYY-MM-DD')}`);
    };

    const disableDay = (value: Dayjs): boolean => {
        return !value.isBefore(dayjs());
    };

    return (
        <div className={"torrents-page"}>
            <div className={"torrents-header"}>
                <div className={"torrents-header-content"}>
                    <Space direction={'horizontal'}>
                        <Button onClick={() => onDayChange(dayjs(date).add(-1, 'day'))}>上一天</Button>
                        <DatePicker
                            value={dayjs(date)}
                            disabledDate={disableDay}
                            onChange={day => onDayChange(day)}
                            style={{width: 220}}
                        />
                        <Button
                            onClick={() => onDayChange(dayjs(date).add(1, 'day'))}
                            disabled={date === dayjs().format('YYYY-MM-DD')}>下一天</Button>
                    </Space>
                </div>
            </div>
            <div className={"movie-section"}>
                <Row gutter={[16, 24]}>
                    {torrents.map((t, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                            <MovieCard movie={{sn: t.sn} as Movie} magnet={t.magnet}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default HighTorrents;