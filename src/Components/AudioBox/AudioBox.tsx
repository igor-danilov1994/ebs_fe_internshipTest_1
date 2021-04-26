import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "./AudioBox.module.css";
import playIcon from '../AudioPlayer/img/play_icon2.jpg'
import pauseIcon from '../AudioPlayer/img/pause_icon2.jpg'
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

    const setDurationAudio = (InitDuration: number) => {
        let durationHour = Math.floor(InitDuration / 60 / 60)
        let durationMinutes = Math.floor(InitDuration / 60 - (durationHour * 60))
        let durationSeconds = Math.floor(InitDuration % 60)

        return [durationHour, durationMinutes, durationSeconds]
    }


    // @ts-ignore
    const {play, setPlay, currentAudio, setCurrentAudio,} = useContext(Context);
    const [audioDuration, setAudioDuration] = useState<number[]>([])
    const audioTrack = useRef(new Audio())
    const [playing, setPlaying] = useState(false)
    //const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>()

    useEffect(() => {
        if (currentAudio) {
            let audioSource = localStorage.getItem('audioSource')

            if (audioSource === audio.source && play) {
                setPlaying(true)
            } else {
                setPlaying(false)
            }
        }
    }, [currentAudio, play])

    useEffect(() => {
        audioTrack.current.src = audio.source
        audioTrack.current.addEventListener('loadeddata', function () {
            let audioDurations = setDurationAudio(audioTrack.current.duration)
            setAudioDuration(audioDurations)
        })
        audioTrack.current.addEventListener('playing', () => {
            let audioSource = localStorage.getItem('audioSource')

            if (audioSource !== audio.source) {
                audioTrack.current.currentTime = 0
            }
        })
        return (
            () => {
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
        <div className={style.audioBox_track}>
            <div className={style.audioBox_track_name}>
                <button onClick={TogglePlay}>
                    <img src={playing ? pauseIcon : playIcon} alt=""/>
                </button>
                <span>{audio.name}</span>
            </div>
            <div className={style.audioBox_track_duration}>
                <span>{audioDuration[1] + ':' + audioDuration[2]}</span>
            </div>
        </div>
    )
}

export default AudioBox
