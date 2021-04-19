import './App.css';
import React, {useEffect, useState} from 'react';
import StreamPage from "./Components/StremPage/StreamPage";
import AudioTrack from 'Components/AudioTrack/AudioTrack';


export const Context = React.createContext({});


export type TrackListType = {
    id: number,
    name: string,
    executor: string,
    source: string,
}

function App() {

    const TrackList = [
        {
            id: 1,
            name: "Прятки",
            executor: "HammAli & Navai",
            source: "HammAli_&amp;_Navai_Прятки.mp3"
        },
        {
            id: 2,
            name: "Ocean Drive",
            executor: "Duke Dumont",
            source: "duke_dumont-ocean_drive.mp3"
        },
        {
            id: 3,
            name: "Я сошла с ума",
            executor: "Tatu",
            source: "tatu-я_ошла_с_ума.mp3"
        },
        {
            id: 4,
            name: "Нас не догонят",
            executor: " Tatu",
            source: "tatu_nas_ne_dogonit.mp3"
        },
        {
            id: 5,
            name: "Малиновый свет",
            executor: "Лёша Свик",
            source: "lesha_svik-malinovyy_svet.mp3"
        },
        {
            id: 6,
            name: "Балкон",
            executor: "Elman feat Jony",
            source: "Elman_feat_Jony_Balkon.mp3"
        }
    ]

    const [volume, setVolume] = useState(0.5)
    const [play, setPlaying] = useState(false)
    const [currentAudioURL, onChangURL] = useState<string | null>()

    const setPlay = (value: boolean) => {
        setPlaying(value)
    }

    useEffect(() => {
        //console.log('url')
    }, [play])

    const onChangeVolume = (e: any) => {
        let volume = Number(e.target.value)
        setVolume(volume / 100)
    }

    const setCurrentAudioURL = (url: string) => {
        onChangURL(url)
    }

    return (
        <Context.Provider value={{
            volume, play, setPlay,
            currentAudioURL, setCurrentAudioURL
        }}>
            <StreamPage trackList={TrackList}/>
            <AudioTrack onChange={onChangeVolume}/>
        </ Context.Provider>
    )
}

export default App;
