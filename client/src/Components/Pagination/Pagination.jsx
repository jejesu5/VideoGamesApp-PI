import React from "react";
import '../Home/Home.css';
import {Link} from 'react-router-dom';

export default function Pagination({cardsPerPage, allVideoGames, page}){
    let pageNumber = [];
    for(let i = 1; i <= Math.ceil(allVideoGames / cardsPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <div className="pagination">
        {pageNumber.map((el) => (
            <Link to={pageNumber.length > 1 ? `/videogames/${el}` : '#'} key={el}>
            <button className="pagination-button" key={el} onClick={() => page(el)}>{el}</button>
            </Link>
        ))}
        </div>
    )
}