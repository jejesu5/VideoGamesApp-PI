import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, clearDetail } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import {  AiFillStar } from 'react-icons/ai'
import img from '../../resources/image-not-found.jpg';
import Loader from "../Home/Loader";
import AltNavBar from "../NavBar/AltNavBar";
import  './Detail.css';

export default function VideogameDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.videogameById);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getVideogameDetail(id))
        return () => {dispatch(clearDetail())}
    }, [dispatch, id])

    if(detail.released){
        var date = detail.released.split('-').map(e => e[0] === '0' ? e.slice(1) : e)
            date = date[2] + '/' + date[1] + '/' + date[0];
    }
        
    if(detail && loading){
        setLoading(false);
    }
    if(detail.name && !loading){
        return (
            <>
           <AltNavBar />
            <div className="container-detail">
                <h1>{detail.name}</h1>
                <div className="detail-info">
                    <h3 id="rating-detail"> <AiFillStar/> {detail.rating}</h3>
                    <h3>Released date: {date}</h3>
                </div>
                <img src={detail.image ? detail.image : img} alt="info"/>
               <article className="detail-description"
                dangerouslySetInnerHTML={{ __html: detail.description }}>
               </article>
               <div className="detail-list">
                <h2>Genres</h2>
               <ul>
                {detail.genres?.map((el) => (<li key={el}>{el}</li>))}
               </ul>
                <h2>Platforms</h2>
                <ul>
                {detail.platforms?.map((el) => (<li key={el}>{el}</li>))}
                </ul>
               </div>
            </div>
            </>
        )
    } else {
        return (
            <Loader />
        )
    }
    
}
