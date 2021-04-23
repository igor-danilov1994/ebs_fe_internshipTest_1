import React, {useEffect, useState} from 'react'
import style from "./Volume.module.css";
import offVolume from "../img/offVolume.png";
import onVolume from "../img/onVolume.png";

type VolumePropsType = {
    audio: any
}

const Volume: React.FC<VolumePropsType> = ({audio}) => {

    const [volume, setVolume] = useState(0.5)

    useEffect(() => {
        audio.volume = volume
    }, [volume])

    const onChangeVolume = (e: any) => {
        let volume = (Number(e.target.value))
        setVolume(volume / 100)
    }

    return (
        <div className={style.audioPlayer__volume}>
            <span>
                <input onChange={(e) => onChangeVolume(e)}
                       type="range"/>
            </span>
            <img src={volume === 0 ? offVolume : onVolume} alt="volumeIcon"/>
        </div>
    )
}

export default Volume