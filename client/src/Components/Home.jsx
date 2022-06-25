import { React, useEffect, useState} from 'react';
import { getAllVideogames } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Cards';
import Loader from './Loader';


export default function Home() {

    const AllVideoGames = useSelector((state) => state.videogames);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllVideogames())
    }, [])
     
    if(AllVideoGames && loading) {
        setLoading(false);
    }
    if(AllVideoGames.length > 0 && !loading){
    return (
        <>
        <Cards AllVideoGames={AllVideoGames}/>
        </>
    )
    }
    return (
        <Loader />
    )
}