import {React, useState, useEffect} from "react";
import { checkIfValidDate, isURL } from "./validators";
import '../../Styles/CreateVideogame.css';
import { createVideogame, getAllGenres, getPlatforms } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";

export function validate(input){
    let error = {};
    if(!input.name){
        error.name = "Name is required";
    }
    if(!input.description){
        error.description = "Description is required";
    } else if(input.description.length < 10){
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
    if(input.image){
        if(isURL(input.image) === false) {
            error.image = "Invalid URL"}
    }

    return error
}
export default function CreateVideogame(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)
    const [input, setInput] = useState(
         {
            name: "",
            description: "",
            date: "",
            rating: 0,
            platforms: [],
            image: "",
            genres: []
        });
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState({});

    useEffect(() => {
        if(genres.length === 0) {
            dispatch(getAllGenres())
        }
        dispatch(getPlatforms())
    }, [dispatch, genres])
    
    function handleInput(e) {
        setError(validate({
            ...input,
            [e.target.name]: e.target.value 
        }))
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    function handlePlatforms(e){
        let selectedPlatforms = [...input.platforms];
        if(!selectedPlatforms.includes(e.target.value)){
            selectedPlatforms.push(e.target.value)
        }
        setInput({...input,
        [e.target.name]: selectedPlatforms})
    }
    function handleGenres(e){
        let selectedGenres = [...input.genres];
        if(!selectedGenres.includes(e.target.value)){
            selectedGenres.push(e.target.value)
        }
        if(selectedGenres.length > 3){
            let aux = selectedGenres.pop();
            selectedGenres.pop();
            selectedGenres = [...selectedGenres, aux]
        }
        setInput({...input,
        [e.target.name]: selectedGenres})
    }

console.log(input)
    function handleSubmit(e){
        e.preventDefault();
        let videogame = validate(input);
        if(videogame.name || videogame.description || videogame.date || videogame.rating || videogame.image){
            alert("Some required fields missing");
        } else {
            dispatch(createVideogame(input))
        }
    }
    return (
        <div className="creator-container">
            <div className="creator-title">ADD YOUR VIDEOGAME!</div>
            <div className="content-creator">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="videogame-details">
                        <div className="input-box">
                            <span className="details">Name</span>
                            <input type="text" placeholder="" name="name" onChange={handleInput} value={input.name}/>
                             {error.name && (<p className="error">{error.name}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Description</span>
                            <input type="text" placeholder="" name="description" onChange={handleInput} value={input.description}/>
                            {error.description && (<p className="error">{error.description}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Date</span>
                            <input type="date" placeholder="" name="date" onChange={handleInput} value={input.date}/>
                            {error.date && (<p className="error">{error.date}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Rating</span>
                            <input type="number" placeholder="" name="rating" onChange={handleInput} value={input.rating}/>
                            {error.rating && (<p className="error">{error.rating}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Image</span>
                            <input type="text" placeholder="" name="image" onChange={handleInput} value={input.image}/>
                            {error.rating && (<p className="error">{error.rating}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Platforms (at least one)</span>
                            <div className="select-box">
                            <select className="selector" name="platforms" onChange={handlePlatforms}>
                            {platforms?.map((el) => <option value={el} key={el}>{el}</option>)}
                            </select>
                            <select className="selector" name="platforms" onChange={handlePlatforms}>
                            {platforms?.map((el) => <option value={el} key={el}>{el}</option>)}
                            </select>
                            <select className="selector" name="platforms" onChange={handlePlatforms}>
                            {platforms?.map((el) => <option value={el} key={el}>{el}</option>)}
                            </select>
                            </div>
                            {error.platforms && (<p className="error">{error.platforms}</p>)}
                        </div>
                        <div className="input-box">
                            <span className="details">Genres (at least one)</span>
                            <div className="select-box">
                            <select className="selector" name="genres" onChange={handleGenres}>
                            {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                            </select>
                            <select className="selector" name="genres" onChange={handleGenres}>
                            {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                            </select>
                            <select className="selector" name="genres" onChange={handleGenres}>
                            {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                            </select>
                            </div>
                            {error.genres && (<p className="error">{error.genres}</p>)}
                        </div>
                    </div>
                         <div className="button">
                         <input type="submit" value="Register"/>
                         </div>
                </form>
            </div>
        </div>
    )
}