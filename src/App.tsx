import './App.css';
import React, {useRef, useState} from 'react';
import StreamPage from "./Components/StremPage/StreamPage";

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
        }
    ]

    const [duration, setDuration] = useState(0)

    const song: any = useRef()

    const Play = (url: string) => {
        const audio = new Audio(url);
        audio.play()
        audio.addEventListener('loadedmetadata', function () {
            setDuration(audio.duration / 60)
        });
    }
    return (
        <>
            <div>
                <button onClick={() => Play("HammAli_&amp;_Navai_Прятки.mp3")}>Song2</button>
            </div>

            <StreamPage trackList={TrackList}/>
        </>
    )
}

export default App;
