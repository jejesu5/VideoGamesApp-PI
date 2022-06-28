import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import "../Styles/SearchBar.css";

export default function SearchBar(){
    const[name, setName] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault();
        setName("")
    }

    function handleInputChange(e){
        setName(e.target.value)
    }
    return (
    <div className="search-bar">
      <form className="search-form form" onClick={(e) => handleSubmit(e)}>
        <label>
            <span className="screen-reader-text">Search for...</span>
            <input type="search" className="search-field" placeholder="Type something..." value={name} onChange={(e) => handleInputChange(e)} />
        </label>
        <Link to={`/results/${name}`}>
        <input type="submit" className="search-submit button" />
        </Link>
    </form>
    </div>

    )
}