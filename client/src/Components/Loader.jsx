import React from "react";
import LoaderImage from "../resources/load.gif";
import "../Styles/Home.css";

export default function Loader(){
    return (
      <div className="Loader">
        <img src={LoaderImage} alt="loading..." />
        </div>
    );
}