import {React} from "react";
import { useHistory } from "react-router-dom";
import './NavBar.css'

export default function AltNavBar(){
    const history = useHistory();

    return (
        <div className="Top-bar">
        <button className="Top-button" onClick={() => history.goBack()}>Go Back</button>
       </div>
    )
}