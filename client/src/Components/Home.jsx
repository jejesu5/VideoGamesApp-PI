import { React, useEffect, useState} from 'react';
import { getAllVideogames, getAllGenres } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Cards';
import Loader from './Loader';


export default function Home() {

    const AllVideoGames = useSelector((state) => state.videogames);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    }, [dispatch])
     
    if(AllVideoGames && loading) {
        setLoading(false);
    }
    if(AllVideoGames.length > 0 && !loading){
    return (
        <>
        <Cards data={AllVideoGames}/>
        </>
    )
    }
    return (
        <Loader />
    )
}