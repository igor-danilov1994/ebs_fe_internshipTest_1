import React, {useRef} from 'react'
import style from './AudioPlayer.module.css'
import ProgressBar from './ProgressBar/ProgressBar'
import Volume from "./Volume/Volume";
import Repeat from './Repeat/Repeat'
import Shuffle from "./Shuffle/Shuffle";
import ControlSlider from './ControlSlider/ControlSlider';


const AudioPlayer = () => {

    type TrackListType = {
        id: number,
        name: string,
        executor: string,
        source: string,
    }

    type ContextType = {
        play: boolean
        setPlay: (play: boolean) => void
        currentAudio: any | null
    }

    const audio = useRef(new Audio())

    return (
        <div className={style.audioPlayer}>
            <ControlSlider audio={audio.current} />

            <ProgressBar audio={audio.current}/>

            <div className={style.audioPlayer_options}>
                <Volume audio={audio.current} />
                <Repeat audio={audio.current}  />
                <Shuffle audio={audio.current}  />
            </div>
        </div>
    )
}

export default AudioPlayer