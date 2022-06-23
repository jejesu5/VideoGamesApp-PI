import React from "react";
import Card from "./Card";
import '../Styles/Cards.css'

export default function Cards({AllVideoGames}) {
    return (
        <div className="container">
            {AllVideoGames?.map((el) => (
                <div key={el.id}> 
                <Card 
                name={el.name}
                genres={el.genres}
                image={el.image}
                rating={el.rating}
                released={el.released}
                />
                </div>
            ))}
        </div>
    )
}