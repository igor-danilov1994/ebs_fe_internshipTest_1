import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "./ProgressBar.module.css";
import {Context} from "../../../App";

type ProgressBarPropsType = {
    audio: any
}

const ProgressBar: React.FC<ProgressBarPropsType> = ({audio}) => {

    // @ts-ignore
    const {play, currentAudio} = useContext(Context);

    const [progressAudio, setProgressAudio] = useState<number>(0)
    const [audioDuration, setAudioDuration] = useState(0)
    const audioSrc = useRef<string>()

    useEffect(() => {
        if (play) {
            audio.addEventListener('timeupdate', () => {
                setProgressAudio(audio.currentTime)
            })
            audio.addEventListener('pause', () => {
                setProgressAudio(audio.currentTime)
                setAudioDuration(audio.duration)
                audioSrc.current = currentAudio.source
            })
            audio.addEventListener('play', () => {
                audio.currentTime = 0
                //audio.currentTime = progressAudio
            })
            audio.addEventListener('loadeddata', function () {
                setAudioDuration(audio.duration)
            })
        }
        return () => {
            audio.removeEventListener('timeupdate', () => {
                setProgressAudio(audio.currentTime)
            })
            audio.removeEventListener('pause', () => {
                setProgressAudio(audio.currentTime)
                setAudioDuration(audio.duration)
            })
            audio.removeEventListener('loadeddata', function () {
                setAudioDuration(audio.duration)
            })
        }
    },[play])

    const ChangeProgress = (e: any) => {
        let progress = Number(e.target.value)
        setProgressAudio(progress)
    }

    return (
        <div className={style.audioPlayer_progressBar}>
            {currentAudio &&
            <div>
                <span>{currentAudio.executor + '-' + currentAudio.name}</span>
            </div>}
            <input min={0} max={audioDuration}
                   style={{width: '100px'}}
                   value={progressAudio}
                   onChange={(e) => ChangeProgress(e)}
                   type="range"/>
            <span>{progressAudio ? progressAudio : ''}</span>
            <span>{audioDuration ? audioDuration : ''}</span>
        </div>
    )
}

export default ProgressBar