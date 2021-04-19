import React, {useState, useEffect, useRef} from "react";

export type PlayerType = {
    url: string,
    isPlay: (url: string | null) => void
}

const Player: React.FC<PlayerType> = ({url, isPlay}) => {

    const [play, setPlay] = useState(false)
    const audioTrack = useRef(new Audio())


    useEffect(() => {
        audioTrack.current.src = url

        play ? audioTrack.current.play() : audioTrack.current.pause();
        //play ? isPlay(url) : isPlay(null)

    }, [play])

    return (
        <div style={{border: 'solid 1px red', width: '200px', height: '200px'}} onClick={() => setPlay(!play)}> </div>
    );
};

export default Player;



