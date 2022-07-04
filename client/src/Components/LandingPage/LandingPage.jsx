import React from "react";
import { Link } from 'react-router-dom';
import BackgroundVideo from '../../resources/DampClosedGlobefish.mp4';
import './LandingPage.css';



export default function LandingPage() {
    return (
        <div className="main">
            <div className="overlay"></div>
            <video autoPlay loop muted src={BackgroundVideo} type='video/mp4' />
            <div className="content">
                <h1>Welcome to Videogames APP</h1>
                <Link to={'/videogames'}>
                <button className="btn"><span>GET IN</span></button>
                </Link>
            </div>
            </div>
    )
}