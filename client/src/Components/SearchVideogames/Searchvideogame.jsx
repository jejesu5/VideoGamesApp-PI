import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchVideogames, clearSearch } from '../../Redux/actions';
import Cards from '../Home/Cards';
import Loader from '../Home/Loader';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';

export default function Searchvideogame(){
    const { name }= useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage] = useState(15)
    const videogames = useSelector((state) => state.searchVideogame);

 useEffect(() => {
        dispatch(searchVideogames(name));
        return () => {dispatch(clearSearch())}
    }, [dispatch, name])

    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = videogames.slice(indexOfFirstCard, indexOfLastCard)

    const page = (e) => setCurrentPage(e);

    if(videogames && loading) {
        setLoading(false);
    }
    
    if(videogames.length > 0 && !loading){
        return (
            <>
            <NavBar />
            <h2 className='Search-title'>RESULTS FOR {name.toUpperCase()}</h2>
            <Cards data={currentCards}/>
            <Pagination cardsPerPage={cardsPerPage} allVideoGames={videogames.length} page={page} />
            </>
        )
        } else {
            return (
                <Loader />
            )
        }
}