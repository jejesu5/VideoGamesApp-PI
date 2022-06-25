import React from "react";
import "../Styles/Card.css"
import { AiFillStar, AiOutlineStar, AiFillCalendar } from 'react-icons/ai';

export default function Card(props){
    let rating = [];
    for(let i = 1; i <= Math.floor(props.rating); i++){
        rating.push(<AiFillStar />)
    }
    let date = props.released.split('-').map(e => e[0] === '0' ? e.slice(1) : e);
        date = date[1] + '/' + date[2] + '/' + date[0];
    return (
        <div className="card">
            <div className="card_image">
            <img src={props.image} alt={props.name} />
            </div>
            <div className="main_info">
            <h1>{props.name}</h1>
            <h3>{props.genres.join(" | ")}</h3>
                <ul>
                    <li>
                 {rating ? rating.map(el => (<p id="rating">{el}</p>)) : <AiOutlineStar />}
                    </li>
                    <li>
                    <p><AiFillCalendar />  {date}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}