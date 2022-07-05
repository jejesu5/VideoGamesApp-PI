import { React, useEffect, useState} from 'react';
import { getAllVideogames } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import Loader from './Loader';
import Filters from '../Filters/Filters';
import Pagination from '../Pagination/Pagination';
import Notvideogame from './Notvideogame';
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
        <div className="container">
            {currentCards.map((el) => (
                <div key={el.id}> 
                <Card 
                id={el.id}
                name={el.name}
                genres={el.genres}
                image={el.image}
                rating={el.rating}
                released={el.released}
                />
                </div>
            ))}
        </div>
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