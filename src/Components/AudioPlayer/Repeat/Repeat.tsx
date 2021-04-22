import React, {useContext, useEffect, useRef, useState} from 'react'
import {renderToNodeStream} from "react-dom/server";
import style from "../AudioPlayer.module.css";
import repeatIcon from "../img/repeat.png";
import {Context} from "../../../App";

type RepeatPropsType = {
    audio: any
}

const Repeat: React.FC<RepeatPropsType> = ({audio}) => {

    // @ts-ignore
    const {play, setPlay} = useContext<ContextType>(Context);

    const isRepeat = useRef(false)
    const [isRepeatAudio, setRepeatAudio] = useState(false)

    useEffect(() => {
        if (play) {
            audio.addEventListener('ended', () => {
                setPlay(!play)
                audio.currentTime = 0
                if (isRepeat.current) {
                    setPlay(true)
                }
            })
        }
        return () => {
            audio.removeEventListener('ended', () => {
                setPlay(!play)
                audio.currentTime = 0
                if (isRepeat.current) {
                    setPlay(true)
                }
            })
        }
    }, [play])

    const setRepeat = () => {
        isRepeat.current = !isRepeat.current
        setRepeatAudio(!isRepeatAudio)
    }

    return (
        <div className={style.audioPlayer_options__repeat}>
            <img style={{background: isRepeatAudio ? 'antiquewhite' : ''}}
                 onClick={setRepeat} src={repeatIcon} alt="repeatIcon"/>
        </div>
    )
}

export default Repeat