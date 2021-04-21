import React, {useContext, useEffect, useRef, useState} from 'react'
import style from './AudioTrack.module.css'
import playIcon from './img/play_icon2.jpg'
import pauseIcon from './img/pause_icon2.jpg'
import onVolume from './img/onVolume.png'
import offVolume from './img/offVolume.png'
import repeatIcon from './img/repeat.png'
import toggleTrack_icon from './img/toggleTrack_icon.svg'
import {Context} from "../../App";

type AudioTrackPropsType = {
    onChangeVolume: (e: any) => void
}

const AudioTrack: React.FC<AudioTrackPropsType> = ({onChangeVolume}) => {

    // @ts-ignore
    const {play, setPlay, volume, progressAudio, onChangeProgress, audioDuration, isRepeat, setRepeatAudio, currentAudio}  = useContext(Context);


    useEffect(() => {
        console.log(currentAudio)
    }, [currentAudio])

    const ChangeProgress = (e: any) => {
        let progress = Number(e.target.value)
        play && onChangeProgress(progress)
    }

    return (
        <div className={style.audioTrack}>
            <div className={style.audioTrack_control}>
                <img src={toggleTrack_icon} alt="icon"/>
                <img onClick={() => setPlay(!play)} src={play ? pauseIcon : playIcon} alt="icon"/>
                <img src={toggleTrack_icon} alt="icon"/>
            </div>


            <div className={style.audioTrack_progressBar}>
                <span>audio Name</span>
                <input min={0} max={audioDuration[0]}
                       style={{width: '100px'}}
                       onChange={(e) => ChangeProgress(e)}
                       value={progressAudio} type="range"/>
                <span>{progressAudio}</span>
            </div>


            <div className={style.audioTrack_options}>
                <div className={style.audioTrack_options__volume}>
                    <span>
                        <input onChange={(e) => onChangeVolume(e)}
                               className={style.audioTrack_range} type="range"/>
                    </span>
                    <img src={volume === 0 ? offVolume : onVolume} alt="volumeIcon"/>
                </div>
                <div className={style.audioTrack_options__repeat}>
                    <img style={{background: isRepeat ? 'antiquewhite' : ' ' }}
                         onClick={() => setRepeatAudio(!isRepeat)} src={repeatIcon} alt="repeatIcon"/>
                </div>
            </div>
        </div>
    )
}

export default AudioTrack