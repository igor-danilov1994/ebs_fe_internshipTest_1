import React, {useState, useEffect, useRef, useContext} from "react";
import {Context} from "../../App";

type PlayerType = {
    url: string
}

const Player: React.FC<PlayerType> = ({url}) => {

    // @ts-ignore
    const {volume, play, setPlay, currentAudioURL, setCurrentAudioURL} = useContext(Context);

    const audio = useRef(new Audio())


    useEffect(() => {
        if (play) {
            audio.current.src = url
            audio.current.volume = 0.5
        } else {
            setCurrentAudioURL(null)
        }
        currentAudioURL === url ? audio.current.play() : audio.current.pause();
    }, [currentAudioURL, play])


    useEffect(() => {
        audio.current.volume = volume
    }, [volume])

    const TogglePlay = () => {
        setPlay(!play)
        setCurrentAudioURL(url)
    }
    return (
        <div onClick={TogglePlay}></div>
    );
};

export default Player;



