import {React} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearFilter } from "../../Redux/actions";
import LoaderImage from "../../resources/netherite-pickaxe-minecraft.gif";
import "../Home/Home.css";

export default function Notvideogame(){
    const dispatch = useDispatch();
   
    function HandleReset(){
        dispatch(clearFilter())
    }

    return (
      <div className="notfund-loader">
        <h1>Sorry, We couldn't find any results</h1>
        <img src={LoaderImage} alt="loading..." />
        <h2>Go back home or create a new videogame!</h2>
        <div className="option-buttons">
        <button id="back" onClick={HandleReset}>Go back!</button>
        <Link to={"/videogames/create" }>
        <button id="create">Create Videogame!</button>
        </Link>
        </div>
        </div>
    );
}