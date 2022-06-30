import { React, useEffect, useState} from 'react';
import { getAllVideogames, getAllGenres } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Cards from './Cards';
import Loader from './Loader';


export default function Home() {

    const AllVideoGames = useSelector((state) => state.videogames);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(AllVideoGames.length < 1){dispatch(getAllVideogames())}
        dispatch(getAllGenres())
    }, [dispatch])
     
    if(AllVideoGames && loading) {
        setLoading(false);
    }
    if(AllVideoGames.length > 0 && !loading){
    return (
        <>
        <NavBar />
        <Cards data={AllVideoGames}/>
        </>
    )
    }
    return (
        <Loader />
    )
}