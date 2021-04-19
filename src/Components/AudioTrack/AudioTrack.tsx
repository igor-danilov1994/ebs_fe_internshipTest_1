import React, {useContext, useState} from 'react'
import style from './AudioTrack.module.css'
import playIcon from './img/play_icon2.jpg'
import pauseIcon from './img/pause_icon2.jpg'
import toggleTrack_icon from './img/toggleTrack_icon.svg'
import {Context} from "../../App";

type AudioTrackPropsType = {
    onChange: (e: any) => void
}

const AudioTrack: React.FC<AudioTrackPropsType> = ({onChange}) => {

    //const [play, setPlay] = useState(false)
    // @ts-ignore
    const {play, setPlay} = useContext(Context);

    return (
        <div className={style.audioTrack}>
            <div className={style.audioTrack_control}>
                <img src={toggleTrack_icon} alt="icon"/>
                <img onClick={() => setPlay(!play)} src={play ? pauseIcon : playIcon} alt="icon"/>
                <img src={toggleTrack_icon} alt="icon"/>
            </div>
            <div className={style.audioTrack_progressBar}>
                <span>audio Name</span>
                <input onChange={onChange} className={style.audioTrack_range} min={0} max={100} step='0.01' type="range"/>
            </div>
            <div className={style.audioTrack_options}>

            </div>
        </div>
    )
}

export default AudioTrack