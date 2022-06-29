import axios from 'axios';
export const GET_ALL_VIDEOGAMES = "GET ALL VIDEOGAMES";
export const GET_ALL_GENRES = "GET ALL GENRES";
export const SEARCH_VIDEOGAMES = "SEARCH VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET VIDEOGAME DETAIL";
export const CREATE_VIDEOGAME = "CREATE VIDEOGAME";
export const CLEAR_DETAIL = "CLEAR DETAIL";
export const FILTER_DB_GAMES = "FILTER DB GAMES";
export const FILTER_API_GAMES = "FILTER API GAMES";

export function getAllVideogames() {
    return function(dispatch) {
        return axios('http://localhost:3001/videogames')
        .then(res => {
            dispatch({type: GET_ALL_VIDEOGAMES, payload: res.data})
        }).catch(error => console.log(error))
    }
}

export function getAllGenres(){
    return function(dispatch){
        return axios('http://localhost:3001/genres')
        .then(res => {
            dispatch({type: GET_ALL_GENRES, payload: res.data})
        }).catch(error => console.log(error))
    }
}

export function searchVideogames(name){
    return function(dispatch){
        return axios(`http://localhost:3001/videogames?name=${name}`)
        .then(res => {
            dispatch({type:SEARCH_VIDEOGAMES, payload: res.data})
        }).catch(error => alert('Videogame not found, please go back :('))
    }
}

export function getVideogameDetail(id){
    return function(dispatch){
        return axios(`http://localhost:3001/videogame/${id}`)
        .then(res => {
            dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data})
        }).catch(error => console.log(error))
    }
}

export function createVideogame(obj){
    return function(dispatch){
        return axios.post('http://localhost:3001/videogames', obj)
        .then(res => {
            dispatch({type: CREATE_VIDEOGAME, payload: res.data})
        }).catch(error => console.log(error))
    }
}

export function clearDetail(){
    return {
        type: CLEAR_DETAIL
    }
}

export function filterByDB(){
    return {
        type: FILTER_DB_GAMES
    }
}

export function filterByAPI(){
    return {
        type: FILTER_API_GAMES
    }
}