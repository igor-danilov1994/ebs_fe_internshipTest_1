import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "../StremPage/StreamPage.module.css";
import {Context, setDurationAudio} from "../../App";

export type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

type AudioBoxPropsType = {
    audioSource: string
    audio: TrackListType
}

type AudioDuration = {
    hours: number,
    minutes: number,
    seconds: number,
}

const AudioBox: React.FC<AudioBoxPropsType> = ({audio, audioSource}) => {

    // @ts-ignore
    const {play, setPlay, currentAudio, setCurrentAudio,} = useContext(Context);
    const [audioDuration, setAudioDuration] = useState<number[]>([])
    const audioTrack = useRef(new Audio())
    const playing = useRef<number | null>()

    useEffect(() => {
        if (currentAudio) {
           if(currentAudio.id === audio.id) {
               playing.current = currentAudio.id
           }
        }
    }, [currentAudio, play])

    useEffect(() => {
        audioTrack.current.src = audio.source
        audioTrack.current.addEventListener('loadeddata', function () {
            let audioDurations = setDurationAudio(audioTrack.current.duration)
            setAudioDuration(audioDurations)
        })
        return (
            () => {
                playing.current = null
                audioTrack.current.removeEventListener('loadeddata', function () {
                    let audioDurations = setDurationAudio(audioTrack.current.duration)
                    setAudioDuration(audioDurations)
                })
            }
        )
    }, [play])

    const TogglePlay = () => {
        setPlay(!play)
        setCurrentAudio(audio)
    }

    return (
        <div className={style.streamPage_track}>
            <div className={style.streamPage_track_data}>
                <div
                    className={`${style.btn} ${playing.current === audio.id && play ? `${style.btn_pause}` : `${style.btn_play}`}`}>
                    <div onClick={TogglePlay}> </div>
                </div>
                <span>{audio.name}</span>
            </div>
            <div>
                <span>{audioDuration[1] + ':' + audioDuration[2]}</span>
            </div>
        </div>
    )
}

export default AudioBox
