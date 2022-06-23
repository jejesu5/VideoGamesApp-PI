import React from "react";
import "../Styles/Card.css"
import { AiFillStar, AiOutlineStar, AiFillCalendar } from 'react-icons/ai';

export default function Card(props){
    let rating = [];
    for(let i = 1; i <= Math.floor(props.rating); i++){
        rating.push(<AiFillStar />)
    }
    return (
        <div className="card">
            <div className="card_image">
            <img src={props.image} alt={props.name} />
            </div>
            <div className="main_info">
            <h1>{props.name}</h1>
            <h2>{props.genres.join(" | ")}</h2>
                <ul>
                    <li>
                 {rating ? rating.map(el => (<p id="rating">{el}</p>)) : <AiOutlineStar />}
                    </li>
                    <li>
                    <p><AiFillCalendar />  {props.released}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}