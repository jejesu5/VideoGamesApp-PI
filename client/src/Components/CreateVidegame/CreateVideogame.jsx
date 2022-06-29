import {React, useState} from "react";
import { checkIfValidDate, isURL } from "./validators";
export function validate(input){
    let error = {};
    if(!input.name){
        error.name = "Name is required";
    }
    if(!input.description){
        error.description = "Description is required";
    } else if(input.description.length < 20){
        error.description = "Description must be longer";
    }
    if(checkIfValidDate(input.date) === false){
        error.date = "Invalid date"
    }
    if(input.rating > 5){
        error.rating = "Rating must be lower than 5"
    } else if(input.rating < 0){
        error.rating = "Invalid rating value"
    }
    if(isURL(input.image) === false) {
        error.image = "Invalid URL"}
    if(!input.platforms){
        error.platforms = "You have to choose at least one platform"
    }
    if(!input.genres){
        error.genres = "You have to choose at least one genre"
    }
}
export default function CreateVideogame(){
    const [input, setInput] = useState(
         {
            name: "",
            description: "",
            date: '',
            rating: null,
            platforms: [],
            image: "",
            genres: ""
        });
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState({});
}