import React from "react";
import '../Styles/Home.css'

export default function Pagination({cardsPerPage, allVideoGames, page}){
    let pageNumber = [];
    for(let i = 1; i <= Math.ceil(allVideoGames / cardsPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <div className="pagination">
        {pageNumber.map((el) => (
            <button className="pagination-button" key={el} onClick={() => page(el)}>{el}</button>
        ))}
        </div>
    )
}