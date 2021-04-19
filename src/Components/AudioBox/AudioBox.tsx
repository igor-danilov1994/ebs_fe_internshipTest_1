import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "../StremPage/StreamPage.module.css";
import Player from "../Player/Player";
import {Context} from "../../App";

export type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

type AudioBoxPropsType = {
    audio: TrackListType
}

const AudioBox: React.FC<AudioBoxPropsType> = ({audio}) => {
// @ts-ignore
    const {currentAudioURL, play} = useContext(Context);
    const [trackURL, setTrackURL] = useState<string | null>()
    const [trackDuration, setTrackDuration] = useState<number | null>()
    const audioTrack = useRef(new Audio())


    useEffect(() => {
        audioTrack.current.src = audio.source

        audioTrack.current.addEventListener('loadeddata', function () {
            setTrackDuration((Math.floor(audioTrack.current.duration / 60 * 100) / 100))
        })
    }, [])

    return (
        <div className={style.streamPage_track}>
            <div className={style.streamPage_track_data}>
                <div
                    className={`${style.btn} ${currentAudioURL === audio.source ? `${style.btn_pause}` : `${style.btn_play}`}`}>
                    <Player url={audio.source}/>

                </div>
                <span>{audio.name}</span>
            </div>
            <span> {trackDuration} </span>
        </div>
    )
}

export default AudioBox
