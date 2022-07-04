import {React} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import './NavBar.css'


export default function NavBar(){
   
    return (
        <div className="header">
	<SearchBar />
	<ul>
        <Link className="Link" to={'/videogames'}>
		<li><span>Home</span></li>
        </Link>
        <Link className="Link" to={'/videogames/create'}>
		<li><span>Create Videogame</span></li>
        </Link>
        <Link className="Link" to={'/'}>
		<li><span>Exit</span></li>
        </Link>
	</ul>
    </div>
    )
}