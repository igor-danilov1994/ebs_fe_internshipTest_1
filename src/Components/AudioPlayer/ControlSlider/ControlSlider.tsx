import React, {useContext, useEffect} from 'react'
import {Context} from "../../../App";
import style from '../AudioPlayer.module.css'
import playIcon from '../img/play_icon2.jpg'
import pauseIcon from '../img/pause_icon2.jpg'
import toggleTrack_icon from '../img/toggleTrack_icon.svg'

type ControlSliderPropsType = {
    audio: any
}

const ControlSlider: React.FC<ControlSliderPropsType> = ({audio}) => {

    // @ts-ignore
    const {play, setPlay, currentAudio} = useContext(Context);

    useEffect(() => {
        if (play) {
            audio.src = currentAudio.source
            audio.play()
        } else {
            audio.pause();
        }
    }, [play])

    return (
        <div className={style.audioPlayer_control}>
            <img src={toggleTrack_icon} alt="icon"/>
            <img onClick={() => setPlay(!play)} src={play ? pauseIcon : playIcon}
                 alt="icon"/>
            <img src={toggleTrack_icon} alt="icon"/>
        </div>
    )
}

export default ControlSlider