import React, {useState, useEffect, useRef, useContext} from "react";
import {Context, setDurationAudio} from "../../App";

export type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

type PlayerType = {
    url: string
    currentAudio: TrackListType
}

const Player: React.FC<PlayerType> = ({url, currentAudio}) => {

    // @ts-ignore
    const {volume, play, setPlay, currentAudioURL, setCurrentAudioURL, progressAudio, onChangeProgress, setTrackAudioDuration, isRepeat, setCurrentAudio,
    } = useContext(Context);


    const [rep, setRep] = useState(false)

    const audio = useRef(new Audio())


   useEffect(() => {
       if (rep) {
           setPlay(true)
           setCurrentAudioURL(url)
           setRep(isRepeat)
           console.log(isRepeat)
       }
   }, [rep])

    useEffect(() => {
        if (play && currentAudioURL === url){
            audio.current.src = url
            audio.current.volume = volume
            audio.current.play()
        }
        !play && audio.current.pause();
    }, [play])

    useEffect(() => {
        if (play && currentAudioURL === url) {

            audio.current.addEventListener('play', () => {
                audio.current.currentTime = progressAudio
            })
            audio.current.addEventListener('ended', () => {
                setPlay(!play)
                setRep(true)
            })
            audio.current.addEventListener('loadeddata', function () {
                let duration = setDurationAudio(audio.current.duration)
                setTrackAudioDuration(duration)
            })
        } else if(currentAudioURL === url) {
            audio.current.addEventListener('pause', () => {
                onChangeProgress(audio.current.currentTime)
            })
                setCurrentAudioURL(null)
        }
        return () => {
            audio.current.currentTime = 0
            audio.current.removeEventListener('play', () => {
                audio.current.currentTime = 0
            })
        }
    }, [])

    useEffect(() => {
        audio.current.addEventListener('timeupdate', () => {
            onChangeProgress(audio.current.currentTime)
        })
        return () => {
            audio.current.removeEventListener('timeupdate', () => {
                onChangeProgress(audio.current.currentTime)
            })
        }
    }, [])


    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    const TogglePlay = () => {
        setPlay(!play)
        setCurrentAudioURL(url)
        setCurrentAudio(currentAudio)
    }
    return (
        <div onClick={TogglePlay}> </div>
    );
};

export default Player;



