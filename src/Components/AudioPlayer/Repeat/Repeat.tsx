import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "./Repeat.module.css";
import repeatIcon from "../img/repeat.png";
import {Context} from "../../../App";

type RepeatPropsType = {
    audio: any
    setRep: (value: boolean) => void
}

const Repeat: React.FC<RepeatPropsType> = ({audio, setRep}) => {

    //const isRepeat = useRef(false)
    const [isRepeatAudio, setRepeatAudio] = useState(false)

    const setRepeat = () => {
        setRep(!isRepeatAudio)
        setRepeatAudio(!isRepeatAudio)
    }

    return (
        <div className={style.audioPlayer__repeat}>
            <img style={{background: isRepeatAudio ? 'antiquewhite' : ''}}
                 onClick={setRepeat} src={repeatIcon} alt="repeatIcon"/>
        </div>
    )
}

export default Repeat