import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchVideogames, clearSearch } from '../../Redux/actions';
import Cards from '../Home/Cards';
import Loader from '../Home/Loader';
import NavBar from '../NavBar/NavBar';

export default function Searchvideogame(){
    const { name }= useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const videogames = useSelector((state) => state.searchVideogame);
 useEffect(() => {
        dispatch(searchVideogames(name));
        return () => {dispatch(clearSearch())}
    }, [dispatch, name])

    if(videogames && loading) {
        setLoading(false);
    }
    
    if(videogames.length > 0 && !loading){
        return (
            <>
            <NavBar />
            <h1 style={{marginTop: 100, color: "white", fontFamily:'Press Start 2P'}}>RESULTS FOR {name.toUpperCase()}</h1>
            <Cards data={videogames}/>
            </>
        )
        } else {
            return (
                <Loader />
            )
        }
}