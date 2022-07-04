import React from "react";
import "./Card.css"
import { AiFillStar, AiOutlineStar, AiFillCalendar } from 'react-icons/ai';
import img from '../../resources/image-not-found.jpg';
import { Link } from "react-router-dom";

export default function Card(props){
    let rating = [];
    //Change the number value, put a star icon instead
    if(props.rating){
        for(let i = 1; i <= Math.floor(props.rating); i++){
            rating.push(<AiFillStar />)
        }
    }
    //change the date format, from YYYY/MM/DD to DD/MM/YYYY
    if(props.released){
        var date = props.released.split('-').map(e => e[0] === '0' ? e.slice(1) : e);
            date = date[2] + '/' + date[1] + '/' + date[0];
    }

    return (
        <div className="card">
            <div className="card_image">
            <Link to={`/videogame/${props.id}`}>
            <img src={props.image ? props.image : img} alt={props.name} />
            </Link>
            </div>
            <div className="main_info">
            <h1>{props.name}</h1>
            <h3>{props.genres ? props.genres.join(" | ") : "Genres not Found"}</h3>
               <ul >
                    <li>
                 {props.rating ? rating.map(el => (<p id="rating" key={props.rating + 1 * Math.random()}>{el}</p>)) : <AiOutlineStar />}
                    </li>
                    <li>
                    <p><AiFillCalendar /> {date ? date : "date not found"}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}