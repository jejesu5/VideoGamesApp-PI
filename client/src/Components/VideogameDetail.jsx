import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, clearDetail } from "../Redux/actions";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import  '../Styles/Detail.css';

export default function VideogameDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.videogameById);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getVideogameDetail(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(clearDetail())
    }, [])
    return (
        <div className="container-detail">
            <h1>{detail.name}</h1>
            <div className="detail-info">
                <h3>Rating {detail.rating}</h3>
                <h3>Released date: {detail.released}</h3>
            </div>
            <img src={detail.image} alt="info"/>
           <article className="detail-description"
            dangerouslySetInnerHTML={{ __html: detail.description }}>
           </article>
           <div className="detail-list">
            <h3>{detail.genres?.join(" | ")}</h3>
            <h3>{detail.platforms?.join(" | ")}</h3>
           </div>
        </div>
    )
}
