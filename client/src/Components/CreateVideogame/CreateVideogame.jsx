import {React, useState, useEffect} from "react";
import { checkIfValidDate, isURL } from "./validators";
import './CreateVideogame.css';
import { createVideogame, getAllGenres, getPlatforms } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Home/Loader';

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
    if(checkIfValidDate(input.released) === false){
        error.released = "Invalid date"
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
    if(input.genres.length < 1){
        error.genres = "You have to choose at least one genre"
    } 
    if(input.platforms.length < 1){
        error.platforms = "You have to choose at least one platform"
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
            released: "",
            rating: 0,
            platforms: [],
            image: "",
            genres: []
        });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(genres.length === 0) {
            dispatch(getAllGenres())
        }
        dispatch(getPlatforms())
    }, [dispatch, genres])
    
    if(genres.length && platforms.length && loading){
        setLoading(false)
    }

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
    function handleSelectionInput(e){
        let selection = e.target.name
        let position = parseInt(e.target.id)
        let allSelections = [...input[selection]];
        if(!allSelections.includes(e.target.value)){
            allSelections[position] = e.target.value
        } else {
            alert('You cant choose the same option twice')
        }
        setInput({...input, 
        [selection]: allSelections})
    }
    console.log(input)
    function handleSubmit(e){
        e.preventDefault();
        let videogame = validate(input);
        if(videogame.name || videogame.description || videogame.released || videogame.rating || videogame.image || videogame.genres || videogame.platforms){
            alert("Some required fields missing");
        } else {
            dispatch(createVideogame(input))
        }
    }
    if(genres.length && platforms.length && !loading){
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
                                <span className="details">Released Date</span>
                                <input type="date" placeholder="" name="released" onChange={handleInput} value={input.released}/>
                                {error.date && (<p className="error">{error.released}</p>)}
                            </div>
                            <div className="input-box">
                                <span className="details">Rating</span>
                                <input type="number" placeholder="" name="rating" onChange={handleInput} value={input.rating} min={0} max={5}/>
                                {error.rating && (<p className="error">{error.rating}</p>)}
                            </div>
                            <div className="input-box">
                                <span className="details">Image</span>
                                <input type="text" placeholder="" name="image" onChange={handleInput} value={input.image}/>
                                {error.rating && (<p className="error">{error.image}</p>)}
                            </div>
                            <div className="input-box">
                                <span className="details">Platforms (at least one)</span>
                                <div className="select-box">
                                <select className="selector" name="platforms" id='0' onChange={handleSelectionInput}>
                                {platforms?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                <select className="selector" name="platforms" id='1'onChange={handleSelectionInput}>
                                {platforms?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                <select className="selector" name="platforms" id='2' onChange={handleSelectionInput}>
                                {platforms?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                </div>
                        
                            </div>
                            <div className="input-box">
                                <span className="details">Genres (at least one)</span>
                                <div className="select-box">
                                <select className="selector" name="genres" id='0' onChange={handleSelectionInput}>
                                {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                <select className="selector" name="genres" id='1' onChange={handleSelectionInput}>
                                {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                <select className="selector" name="genres" id='2' onChange={handleSelectionInput}>
                                {genres?.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
                                </select>
                                </div>
                                
                            </div>
                        </div>
                             <div className="button">
                             <input type="submit" value="Register"/>
                             </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
   
}