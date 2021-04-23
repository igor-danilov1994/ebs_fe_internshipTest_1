import React from 'react'
import zivertImgProfile from './img/zivertImgProfile.jpg'
import style from './TrackProfilePage.module.css'

const TrackProfilePage = () => {
    return (
        <div className={style.trackProfilePage}>
            <img src={zivertImgProfile} alt="img"/>
        </div>
    )
}

export default TrackProfilePage