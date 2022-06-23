import { React, useEffect} from 'react';
import { getAllVideogames } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Cards';

export default function Home() {
    const AllVideoGames = useSelector((state) => state.videogames);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllVideogames())
    }, [])

    return (
        <>
        <Cards AllVideoGames={AllVideoGames}/>
        </>
    )
}