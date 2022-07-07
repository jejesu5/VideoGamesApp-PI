import {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchVideogames, clearSearch, clearFilter } from '../../Redux/actions';
import Cards from '../Home/Cards';
import Loader from '../ToolComponents/Loader';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';
import Notvideogame from '../ToolComponents/Notvideogame';

export default function Searchvideogame(){
    const { name }= useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage] = useState(15)
    const videogames = useSelector((state) => state.searchVideogame);
    const searchedVideogames = useSelector((state) => state.searchVideogameCopy);

 useEffect(() => {
        dispatch(searchVideogames(name));
        return () => {dispatch(clearSearch())
        dispatch(clearFilter())}
    }, [dispatch, name])

    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = searchedVideogames.slice(indexOfFirstCard, indexOfLastCard)

    const page = (e) => setCurrentPage(e);

    if(videogames && loading) {
        setLoading(false);
    }
    
    if(videogames.length > 0 && !loading){
        if(currentCards.length === 0){return <Notvideogame />}
        return (
            <>
            <NavBar />
            <Filters page={page}/>
            <Cards data={currentCards}/>
            <Pagination cardsPerPage={cardsPerPage} allVideoGames={searchedVideogames.length} page={page} />
            </>
        )
        } else {
            return (
                <Loader />
            )
        }
}