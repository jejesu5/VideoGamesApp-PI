import {React} from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import '../Styles/NavBar.css'


export default function NavBar(){
   
    return (
        <div className="header">
	<SearchBar />
	<ul>
        <Link to={'/'}>
		<li><span>Home</span></li>
        </Link>
        <Link to={'/videogames'}>
		<li><span>Videogames</span></li>
        </Link>
        <Link to={'/videogames/create'}>
		<li><span>Create Videogame</span></li>
        </Link>
	</ul>
    </div>
    )
}