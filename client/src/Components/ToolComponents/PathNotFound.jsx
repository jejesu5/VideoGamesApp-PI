import React from "react";
import LoaderImage from '../../resources/kirby-notfound.gif';
import { Link } from "react-router-dom";
import '../Home/Home.css';

export default function  PathNotFound(){
    return (
        <div className="notfund-loader">
            <h1>Oops! It seems that the route you're looking for doesn't exist</h1>
            <h2>...yet</h2>
            <img src={LoaderImage} alt="loading..." />
            <Link to={'/videogames'}>
            <button>Go Back</button>
            </Link>
        </div>
    )
}