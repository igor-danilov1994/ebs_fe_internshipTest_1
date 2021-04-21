import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "../StremPage/StreamPage.module.css";
import Player from "../Player/Player";
import {Context, setDurationAudio} from "../../App";

export type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

type AudioBoxPropsType = {
    audio: TrackListType
}

type AudioDuration = {
    hours: number,
    minutes: number,
    seconds: number,
}

const AudioBox: React.FC<AudioBoxPropsType> = ({audio}) => {
// @ts-ignore
    const {currentAudioURL} = useContext(Context);
    const [audioDuration, setAudioDuration] = useState<number[]>([])
    const audioTrack = useRef(new Audio())


    useEffect(() => {
        audioTrack.current.src = audio.source
        audioTrack.current.addEventListener('loadeddata', function () {
            let audioDurations = setDurationAudio(audioTrack.current.duration)
            setAudioDuration(audioDurations)
        })
    }, [])

    return (
        <div className={style.streamPage_track}>
            <div className={style.streamPage_track_data}>
                <div
                    className={`${style.btn} ${currentAudioURL === audio.source ? `${style.btn_pause}` : `${style.btn_play}`}`}>
                    <Player currentAudio={audio} url={audio.source}/>
                </div>
                <span>{audio.name}</span>
            </div>
            <div>
                <span>{audioDuration[2] + ':' + audioDuration[3]}</span>
            </div>

        </div>
    )
}

export default AudioBox
