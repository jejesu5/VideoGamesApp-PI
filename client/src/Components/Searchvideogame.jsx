import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchVideogames, clearSearch } from '../Redux/actions';
import Cards from './Cards';
import Loader from './Loader';
import NavBar from './NavBar';

export default function Searchvideogame(){
    const { name }= useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const videogames = useSelector((state) => state.searchVideogame);
 useEffect(() => {
        dispatch(searchVideogames(name));
        return () => dispatch(clearSearch())
    }, [])

    if(videogames && loading) {
        setLoading(false);
    }
    
    if(videogames.length > 0 && !loading){
        return (
            <>
            <NavBar />
            <Cards data={videogames}/>
            </>
        )
        } else {
            return (
                <Loader />
            )
        }
}