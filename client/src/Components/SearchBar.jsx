import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch } from '../Redux/actions';
import '../Styles/Searchbar.css';

export default function SearchBar(){
    const[name, setName] = useState("")
    const [state, setState] = useState(true);
    const videogames = useSelector((state) => state.videogameById);
    const dispatch = useDispatch();
    
    function handleSubmit(e) {
        if(videogames.length > 0){
            dispatch(clearSearch());
        }
            e.preventDefault();
            setName("")
    }

    function handleInputChange(e){
        setName(e.target.value)
        if(e.target.value){
            setState(false);
        }
    }
    return (
    <div className="search-bar">
      <form className="search-form form" onSubmit={(e) => handleSubmit(e)}>
            <input type="search" className="search-field" placeholder="Type something..." value={name} onChange={(e) => handleInputChange(e)} />
        <Link to={`/results/${name}`}>
        <input type="submit" className="search-submit" disabled={state}/>
        </Link>
    </form>
    </div>

    )
}