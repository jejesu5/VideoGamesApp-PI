import { React, useEffect, useState} from 'react';
import { getAllVideogames } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Cards from './Cards';
import Loader from '../ToolComponents/Loader';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';
import Notvideogame from '../ToolComponents/Notvideogame';
import './Home.css';


export default function Home() {
    const videogames = useSelector((state) => state.videogames)
    const allVideogames = useSelector((state) => state.videogamesCopy);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage] = useState(15)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(videogames.length < 1 ){dispatch(getAllVideogames())}
    }, [dispatch, videogames])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [currentPage])
     
    const indexOfLastCard = currentPage * cardsPerPage
    const indexOfFirstCard = indexOfLastCard - cardsPerPage
    const currentCards = allVideogames.slice(indexOfFirstCard, indexOfLastCard)

    const page = (e) => setCurrentPage(e);

    if(videogames && loading) {
        setLoading(false);
    }
    if(videogames.length > 0 && !loading){
    if(currentCards.length === 0){return (<Notvideogame />)}
    return (
        <>
        <NavBar />
        <Filters page={page}/>
        <Cards data={currentCards} />
        <div className='pagination-box'>
        <Pagination cardsPerPage={cardsPerPage} allVideoGames={allVideogames.length} page={page} />
        </div>
        </>
    )
    }
    return (
        <Loader />
    )
}
