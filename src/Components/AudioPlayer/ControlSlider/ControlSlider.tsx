import React, {useContext, useEffect, useRef, useState} from 'react'
import {Context} from "../../../App";
import style from './ControlSlider.module.css'
import playIcon from '../img/play_icon2.jpg'
import pauseIcon from '../img/pause_icon2.jpg'
import toggleTrack_icon from '../img/toggleTrack_icon.svg'
import {TrackListType} from "../../AudioBox/AudioBox";

type ControlSliderPropsType = {
    audio: any
    isRepeat: boolean
}

const ControlSlider: React.FC<ControlSliderPropsType> = ({audio, isRepeat}) => {
    // @ts-ignore
    const {play, setPlay, currentAudio, TrackList, setCurrentAudio} = useContext(Context);

    const [backBtn, serBackBtn] = useState(false)
    const [nextBtn, setNextBtn] = useState(false)
    const playing = useRef(false)

    useEffect(() => {
        if (currentAudio) {
            currentAudio.id === 0 ? serBackBtn(false) : serBackBtn(true)

            currentAudio.id === (TrackList.length - 1) ? setNextBtn(false) : setNextBtn(true)
        }
    }, [currentAudio])

    useEffect(() => {
        if (play) {
            audio.addEventListener('ended', () => {
                if (isRepeat) {
                    audio.play()
                } else {
                    NextTrack()
                }
            })
        }
    }, [isRepeat, play])

    useEffect(() => {
        if (play) {
            let audioSource = localStorage.getItem('audioSource')

            audio.src = audioSource ? audioSource : currentAudio.source
            audio.play()
        } else {
            audio.pause();
        }
        return () => {
            audio.removeEventListener('ended', () => {
                NextTrack()
            })
        }
    }, [play, currentAudio, playing.current])

    const NextTrack = () => {
        let nextTrackID = TrackList[currentAudio.id].id + 1
        setCurrentAudio(TrackList[nextTrackID])
        playing.current = true
    }

    const BackTrack = () => {
        let backTrackID = TrackList[currentAudio.id].id - 1
        setCurrentAudio(TrackList[backTrackID])
    }

    const Played = () => {
        let audioSource = localStorage.getItem('audioSource')
        if (!audioSource) {
            !currentAudio && setCurrentAudio(TrackList[0])
        } else {
            let currentTrack = TrackList.find((audio: TrackListType) => audio.source === audioSource)
            setCurrentAudio(currentTrack)
        }
        setPlay(!play)
    }

    return (
        <div className={style.audioPlayer_control}>
            <button disabled={!backBtn} onClick={BackTrack}>
                <img style={{opacity: !backBtn ? '0.5' : '1'}}
                     src={toggleTrack_icon} alt="icon"/>
            </button>

            <button onClick={Played}>
                <img src={play ? pauseIcon : playIcon} alt="icon"/>
            </button>

            <button disabled={!nextBtn} onClick={NextTrack}>
                <img style={{opacity: !nextBtn ? '0.5' : '1'}}
                     src={toggleTrack_icon} alt="icon"/>
            </button>
        </div>
    )
}

export default ControlSlider