import {React, useState, useEffect} from "react";
import { checkIfValidDate, isURL, containsSpecialChars } from "./validators";
import { useHistory } from "react-router-dom";
import { createVideogame, getAllGenres, getPlatforms, getAllVideogames } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import AltNavBar from "../NavBar/AltNavBar";
import Loader from '../ToolComponents/Loader';
import Swal from 'sweetalert2';
import './CreateVideogame.css';

export function validate(input){
    let error = {};
    if(!input.name){
        error.name = "Name is required";
    } else if(containsSpecialChars(input.name)){
        error.name = "Name may not contain special characters" 
    } else if(input.name.trim() === ''){
        error.name = "Name may not be empty"
    } else if(input.name.length > 50){
        error.name = "Name can only have max 50 characters"
    }
    if(!input.description){
        error.description = "Description is required";
    } else if(input.description.length < 10){
        error.description = "Description must be longer";
    } else if(input.description.length > 300){
        error.description = "Description can only have max 300 characters"
    }
    if(checkIfValidDate(input.released) === false){
            error.released = "Invalid date"
        }
    if(input.rating > 5){
        error.rating = "Rating must be lower than 5"
    } else if(input.rating < 0){
        error.rating = "Invalid rating value"
    } else if (isNaN(parseInt(input.rating))){
        error.rating = "only Numbers allowed"
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
    const history = useHistory();
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
        return () => {dispatch(getAllVideogames())}
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
            Swal.fire({
                title: "Alert",
                text: "You cant choose the same option twice",
                icon: "warning",
                confirmButtonText: "Ok"
            })
        }
        setInput({...input, 
        [selection]: allSelections})
    }
    
    function handleSubmit(e){
        e.preventDefault();
        let videogame = validate(input);
        if(videogame.name || videogame.description || videogame.released || videogame.rating || videogame.image || videogame.genres || videogame.platforms){
            Swal.fire({
                title: "Alert",
                text: "Some required fields are missing",
                icon: "warning",
                confirmButtonText: "Ok"
            })
        } else {
            dispatch(createVideogame(input));
            setTimeout(() => {history.push('/videogames')}, 5000);
        }
    }
    if(genres.length && platforms.length && !loading){
        return (
            <>
            <AltNavBar />
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
                                <input type="number" placeholder="" name="rating" onChange={handleInput} value={input.rating} min={0} max={5} step="any"/>
                                {error.rating && (<p className="error">{error.rating}</p>)}
                            </div>
                            <div className="input-box">
                                <span className="details">Image</span>
                                <input type="text" placeholder="" name="image" onChange={handleInput} value={input.image}/>
                                {error.image && (<p className="error">{error.image}</p>)}
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
                             <input type="submit" value="Create" />
                             </div>
                    </form>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <Loader />
        )
    }
   
}