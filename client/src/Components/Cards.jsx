import React from "react";
import Card from "./Card";
import '../Styles/Cards.css'

export default function Cards({data}) {
    return (
        <div className="container">
            {data?.map((el) => (
                <div key={el.id}> 
                <Card 
                id={el.id}
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