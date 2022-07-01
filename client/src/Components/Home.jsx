import { React, useEffect, useState} from 'react';
import { getAllVideogames, getAllGenres, clearFilter } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Cards from './Cards';
import Loader from './Loader';


export default function Home() {

    const allVideogames = useSelector((state) => state.videogames);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(allVideogames.length < 1){dispatch(getAllVideogames())}
        dispatch(getAllGenres())
        dispatch(clearFilter())
    }, [dispatch])
     
    if(allVideogames && loading) {
        setLoading(false);
    }
    if(allVideogames.length > 0 && !loading){
    return (
        <>
        <NavBar />
        <Cards data={allVideogames}/>
        </>
    )
    }
    return (
        <Loader />
    )
}