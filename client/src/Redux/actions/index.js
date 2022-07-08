import axios from 'axios';
export const GET_ALL_VIDEOGAMES = "GET ALL VIDEOGAMES";
export const GET_ALL_GENRES = "GET ALL GENRES";
export const SEARCH_VIDEOGAMES = "SEARCH VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET VIDEOGAME DETAIL";
export const GET_PLATFORMS = "GET PLATFORMS";
export const CREATE_VIDEOGAME = "CREATE VIDEOGAME";
export const CLEAR_SEARCH = "CLEAR SEARCH";
export const CLEAR_DETAIL = "CLEAR DETAIL";
export const CLEAR_FILTER = "CLEAR FILTER";
export const SORT_BY_RATING = "SORT BY RATING";
export const SORT_BY_NAME = "SORT BY NAME";
export const FILTER_BY_SOURCE = "FILTER BY SOURCE";
export const FILTER_BY_GENRE = "FILTER BY GENRE";

export function getAllVideogames() {
    return function(dispatch) {
        return axios('/videogames')
        .then(res => {
            dispatch({type: GET_ALL_VIDEOGAMES, payload: res.data})
        }).catch(error => alert("Sorry:( Something happened, please reload the page", error.message))
    }
}

export function getAllGenres(){
    return function(dispatch){
        return axios('/genre')
        .then(res => {
            dispatch({type: GET_ALL_GENRES, payload: res.data})
        }).catch(error => console.log(error))
    }
}
export function getPlatforms(){
    return function(dispatch){
        return axios('/platforms')
		.then(res => {
            dispatch({type:GET_PLATFORMS, payload: res.data})
        }).catch(error => console.log(error))
}}

export function searchVideogames(name){
    return function(dispatch){
        return axios(`/videogames?name=${name}`)
        .then(res => {
            dispatch({type:SEARCH_VIDEOGAMES, payload: res.data})
        }).catch(error => alert('Videogame not found, please go back :('))
    }
}

export function getVideogameDetail(id){
    return function(dispatch){
        return axios(`/videogame/${id}`)
        .then(res => {
            dispatch({type: GET_VIDEOGAME_DETAIL, payload: res.data})
        }).catch(error => console.log(error))
    }
}

export function createVideogame(obj){
    return function(dispatch){
        return axios.post('/videogames', obj)
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
export function clearSearch(){
    return {
        type: CLEAR_SEARCH
    }
}

export function clearFilter(){
    return {
        type: CLEAR_FILTER
    }
}

export function sortByRating(payload){
    return {
        type: SORT_BY_RATING,
        payload
    }
}

export function sortByName(payload){
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function filterBySource(payload){
    return {
        type: FILTER_BY_SOURCE,
        payload
    }
}

export function filterByGenre(payload){
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}