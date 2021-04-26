import './App.css';
import React, {useState} from 'react';
import StreamPage from "./Components/StremPage/StreamPage";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import {Redirect, Route } from 'react-router-dom';
import TrackProfilePage from 'Components/TrackProfilePage/TrackProfilePage';


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
            id: 0,
            name: "Beverly Hills",
            executor: "Zivert",
            source: "Zivert_Beverly_Hills.mp3"
        },
        {
            id: 1,
            name: "Credo",
            executor: "Zivert",
            source: "Zivert_Credo.mp3"
        },
        {
            id: 2,
            name: "Зеленые волны",
            executor: "Zivert",
            source: "Zivert_ZelenieVolni.mp3"
        },
        {
            id: 3,
            name: "Шарик",
            executor: " Zivert",
            source: "Zivert_sharik.mp3"
        },
        {
            id: 4,
            name: "Сияй",
            executor: "Zivert",
            source: "Zivert_Siyai.mp3"
        },
        {
            id: 5,
            name: "ЯТЛ",
            executor: "Zivert",
            source: "Zivert_YTL.mp3"
        },
        {
            id: 6,
            name: "shortAudio",
            executor: "sec",
            source: "5-sekund-5.mp3"
        },
        {
            id: 7,
            name: "Fly",
            executor: "Zivert",
            source: "Zivert_Fly.mp3"
        },
    ]

    const [play, setPlaying] = useState(false)
    const [currentAudio, setCurrentsAudio] = useState<TrackListType | null>()
    const [audioDuration, setAudioDuration] = useState<number[]>([])

    const setCurrentAudio = (audio: TrackListType) => {
        setCurrentsAudio(audio)
        localStorage.setItem('audioSource', audio.source)
    }

    const setPlay = (value: boolean) => {
        setPlaying(value)
    }

    const setTrackAudioDuration = (duration: []) => {
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
        <div className="main">
            <Context.Provider value={state}>
                <Route path='' render={() => <Redirect to='/StreamPage' />} />

                <Route path='/StreamPage' render={() =>
                    <div className="container">
                        <TrackProfilePage />
                        <StreamPage trackList={TrackList}/>
                    </div>
                }/>
                <div className="player">
                    <AudioPlayer/>
                </div>
            </ Context.Provider>
        </div>

    )
}

export default App;
