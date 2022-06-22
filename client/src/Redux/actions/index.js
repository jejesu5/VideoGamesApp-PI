import axios from 'axios';
export const GET_ALL_VIDEOGAMES = "GET ALL VIDEOGAMES";
export const GET_ALL_GENRES = "GET ALL GENRES";
export const SEARCH_VIDEOGAMES = "SEARCH VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET VIDEOGAME DETAIL";
export const CREATE_VIDEOGAME = "CREATE VIDEOGAME";

export function getAllVideogames() {
    return function(dispatch) {
        return axios('http://localhost:3001/videogames')
        .then(res => {
            dispatch({type: GET_ALL_VIDEOGAMES, payload: res.data})
        })
    }
}

export function getAllGenres(){
    return function(dispatch){
        return axios('http://localhost:3001/genres')
        .then(res => {
            dispatch({type: GET_ALL_GENRES, payload: res.data})
        })
    }
}

export function searchVideogames(name){
    return function(dispatch){
        return axios(`http://localhost:3001/videogames?name=${name}`)
        .then(res => {
            dispatch({type:SEARCH_VIDEOGAMES, payload: res.data})
        })
    }
}

export function getVideogameDetail(id){
    return function(dispatch){
        return axios(`http://localhost:3001/videogame/${id}`)
        .then(res => {
            dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data})
        })
    }
}

export function createVideogame(obj){
    return function(dispatch){
        return axios.post('http://localhost:3001/videogames', obj)
        .then(res => {
            dispatch({type: CREATE_VIDEOGAME, payload: res.data})
        })
    }
}