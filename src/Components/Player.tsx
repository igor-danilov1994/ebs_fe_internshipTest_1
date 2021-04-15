import React, {useState, useEffect, useRef} from "react";
import style from "./StremPage/StreamPage.module.css";

type PlayerType = {
    url: string,
    isPlay: (url: string | null) => void
}

const Player: React.FC<PlayerType> = ({url, isPlay}) => {

    const [play, setPlay] = useState(false)
    const audioTrack = useRef(new Audio())


    useEffect(() => {
        audioTrack.current.src = url

        play ? audioTrack.current.play() : audioTrack.current.pause();
        play ? isPlay(url) : isPlay(null)

    }, [play])

    return (
        <div onClick={() => setPlay(!play)}> </div>
    );
};

export default Player;



