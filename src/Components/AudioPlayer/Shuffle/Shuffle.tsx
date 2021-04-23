import React, {useContext, useEffect, useRef, useState} from 'react'
import style from "./Shuffle.module.css";
import shuffle from "../img/shuffle.png";
import {Context} from "../../../App";


type ShufflePropsType = {
    audio: any
}

const Shuffle: React.FC<ShufflePropsType> = ({audio}) => {

    // @ts-ignore
    const {play, setPlay, TrackList, setCurrentAudio, currentAudio} = useContext<ContextType>(Context);
    const [isShuffleAudio, setShuffleAudio] = useState(false)
    const isShuffle = useRef(false)
    const randomAudio = useRef()

    const ShuffleAudio = () => {
        isShuffle.current = !isShuffle.current
        setShuffleAudio(!isShuffleAudio)
    }
    const RandomInteger = (min: number, max: number) => {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    useEffect(() => {
        if (play) {
            audio.addEventListener('ended', () => {
                if (isShuffle.current){
                    audio.src = currentAudio.source
                    setPlay(true)
                }
            })
        }
        return () => {
            audio.removeEventListener('ended', () => {
                if (isShuffle.current){
                    audio.src = currentAudio.source
                    setPlay(true)
                }
            })
        }
    }, [play])

    useEffect(() => {
        if (isShuffle.current) {
            let rand = RandomInteger(0, TrackList.length - 1)
            let ShuffleAudio = TrackList[rand]
            randomAudio.current = ShuffleAudio
            setCurrentAudio(ShuffleAudio)
        }
    }, [isShuffle.current])

    return (
        <div className={style.audioPlayer__shuffle}>
            <img style={{background: isShuffleAudio ? 'antiquewhite' : ''}}
                 onClick={ShuffleAudio} src={shuffle} alt="repeatIcon"/>
        </div>
    )
}

export default Shuffle