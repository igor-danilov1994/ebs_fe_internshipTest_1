import Player from 'Components/Player';
import React, {useEffect, useRef, useState} from 'react';
import style from './StreamPage.module.css'

type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

type StreamPagePropsType = {
    trackList: Array<TrackListType>
}

const StreamPage: React.FC<StreamPagePropsType> = ({trackList}) => {


    const [trackURL, setTrackURL] = useState<string | null>()

    const isPlay = (url: string | null) => {
        setTrackURL(url)
    }


    return (
        <div className={style.streamPage}>
            <div className={style.streamPage_header}>
                <span className={style.streamPage_resume}>Resume</span>

                {trackList.map((track: TrackListType) =>
                    <div key={track.id} className={style.streamPage_track}>
                        <div className={style.streamPage_track_data}>
                            <div
                                className={`${style.btn} ${trackURL === track.source ? `${style.btn_pause}` : `${style.btn_play}`}`}>
                                <Player isPlay={isPlay} url={track.source}/>

                            </div>
                            <span>{track.name}</span>
                        </div>
                        <span> duration </span>
                    </div>
                )}
            </div>
        </div>)
}

export default StreamPage