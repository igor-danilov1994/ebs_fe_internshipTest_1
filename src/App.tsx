import './App.css';
import React, {useState} from 'react';
import StreamPage from "./Components/StremPage/StreamPage";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";

export const setDurationAudio = (InitDuration: number) => {

    let durationHour = Math.floor(InitDuration / 60 / 60)
    let durationMinutes = Math.floor(InitDuration / 60 - (durationHour * 60))
    let durationSeconds = Math.floor(InitDuration % 60)

    return [durationHour,  durationMinutes, durationSeconds]
}

export const Context = React.createContext({});

function App() {
    type TrackListType = {
        id: number,
        name: string,
        executor: string,
        source: string,
    }

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

    const [play, setPlaying] = useState(false)
    const [currentAudio, setCurrentsAudio] = useState<TrackListType>()
    const [audioDuration, setAudioDuration] = useState<number[]>([])

    const setCurrentAudio = (audio: TrackListType) => {
        setCurrentsAudio(audio)
    }

    const setPlay = (value: boolean) => {
        setPlaying(value)
    }

    const setTrackAudioDuration = (duration: [] ) => {
        setAudioDuration(duration)
    }

    type StateType = {
        play: boolean
        setPlay: (play: boolean) => void
        currentAudio: any
        setTrackAudioDuration: (duration: []) => void
        audioDuration: number[]
        setCurrentAudio: (audio: TrackListType) => void
        TrackList: TrackListType[]
    }

    const state: StateType = {
        play, setPlay, TrackList,
        currentAudio, setTrackAudioDuration,
        audioDuration, setCurrentAudio,
    }
    return (
        <Context.Provider value={state}>
            <StreamPage trackList={TrackList}/>
            <AudioPlayer/>
        </ Context.Provider>
    )
}

export default App;
