import './App.css';
import React, {useState} from 'react';
import StreamPage from "./Components/StremPage/StreamPage";
import AudioTrack from 'Components/AudioTrack/AudioTrack';


export const Context = React.createContext({});

export const setDurationAudio = (InitDuration: number) => {

    let durationHour = Math.floor(InitDuration / 60 / 60)
    let durationMinutes = Math.floor(InitDuration / 60 - (durationHour * 60))
    let durationSeconds = Math.floor(InitDuration % 60)

    //let audioDuration = `${durationMinutes} : ${durationSeconds}`
    let audioDuration = durationMinutes + ' :' + durationSeconds

    return [InitDuration ,durationHour,  durationMinutes, durationSeconds]
}

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
        },
        {
            id: 7,
            name: "Безумный мир",
            executor: "Мираж",
            source: "mirazh_-_bezumnyy-mir.mp3"
        }
    ]

    const [volume, setVolume] = useState(0.5)
    const [play, setPlaying] = useState(false)
    const [isRepeat, setRepeat] = useState(false)
    const [currentAudioURL, onChangURL] = useState<string | null>()
    const [currentAudio, setCurrentsAudio] = useState<TrackListType>()
    const [progressAudio, setProgressAudio] = useState(0)
    const [audioDuration, setAudioDuration] = useState<number[]>([])

    const setCurrentAudio = (audio: TrackListType) => {
        setCurrentsAudio(audio)
    }

    const setPlay = (value: boolean) => {
        setPlaying(value)
    }

    const setRepeatAudio = (repeat: boolean) => {
        setRepeat(repeat)
    }

    const setTrackAudioDuration = (duration: [] ) => {
        setAudioDuration(duration)
    }

    const onChangeVolume = (e: any) => {
        let volume = Number(e.target.value)
        setVolume(volume / 100)
    }

    const onChangeProgress = (progress: number) => {
        setProgressAudio(progress)
    }

    const setCurrentAudioURL = (url: string) => {
        onChangURL(url)
    }

    return (
        <Context.Provider value={{
            volume, play, setPlay, progressAudio, onChangeProgress,
            currentAudioURL, setCurrentAudioURL, isRepeat, setRepeatAudio,
            setTrackAudioDuration, audioDuration, setCurrentAudio, currentAudio,
        }}>
            <StreamPage trackList={TrackList}/>
            <AudioTrack onChangeVolume={onChangeVolume}/>
        </ Context.Provider>
    )
}

export default App;
