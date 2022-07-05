import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import './Searchbar.css';

export default function SearchBar(){
    const[name, setName] = useState("")

    function handleSubmit(e) {
            e.preventDefault();
            setName("")
    }

    function handleInputChange(e){
        setName(e.target.value.replace(/\s/g, ''))
    }
    return (
    <div className="search-bar">
      <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
            <input type="search" className="search-field" placeholder="Search" value={name} onChange={(e) => handleInputChange(e)} />
        <Link to={name !== "" ? `/results/${name}` : '#'}>
        <button type="submit" className="search-submit">
            <FaSearch/>
        </button>
        </Link>
    </form>
    </div>

    )
}