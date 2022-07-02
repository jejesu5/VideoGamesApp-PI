import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByName, sortByRating, filterByGenre, filterBySource, getAllGenres, clearFilter } from "../Redux/actions";
import '../Styles/Filters.css'

export default function Filters(){
const genres = useSelector((state) => state.genres);
const dispatch = useDispatch();
useEffect(() => {
    if(genres.length < 1){
        dispatch(getAllGenres())
    }
},[dispatch, genres])

function handleSource(e) {
    dispatch(filterBySource(e.target.value))
}
function handleGenre(e){
    dispatch(filterByGenre(e.target.value))
}
function handleName(e){
    dispatch(sortByName(e.target.value))
}
function handleRating(e){
    dispatch(sortByRating(e.target.value))
}
function handleClear(){
    dispatch(clearFilter())
}
return (
<div className="filters">
<button className="button-clear" onClick={handleClear}>Clear filters</button>
<div>
    <h3>Filter By:</h3>
    <select className="selection" onChange={handleSource}>
        <option value="All">All</option>
        <option value="Created">Created</option>
        <option value="Database">Database</option>
    </select>
    <select className="selection" onChange={handleGenre}>
        <option value="All">All</option>
        {genres?.map((el) => <option value={el.name} key={el.id + 's'}>{el.name}</option>)}
    </select>
</div>
<div>
    <h3>Sort By:</h3>
    <select className="selection" onChange={handleName}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
    </select>
    <select className="selection" onChange={handleRating}>
        <option value="Lower">Lower</option>
        <option value="Higher">Higher</option>
    </select>
</div>
</div>
)
}
