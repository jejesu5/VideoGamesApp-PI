import axios from 'axios';
export const GET_ALL_VIDEOGAMES = "GET ALL VIDEOGAMES";
export const GET_ALL_GENRES = "GET ALL GENRES";
export const SEARCH_VIDEOGAMES = "SEARCH VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET VIDEOGAME DETAIL";
export const GET_PLATFORMS = "GET PLATFORMS";
export const CREATE_VIDEOGAME = "CREATE VIDEOGAME";
export const CLEAR_DETAIL = "CLEAR DETAIL";
export const FILTER_DB_GAMES = "FILTER DB GAMES";
export const FILTER_API_GAMES = "FILTER API GAMES";
export const ORDER_BY_LOWER_RATING = "ORDER BY LOWER RATING";
export const ORDER_BY_HIGHER_RATING = "ORDER BY HIGHER RATING";
export const ORDER_ASC = "ORDER ASC";
export const ORDER_DESC = "ORDER DESC";

export function getAllVideogames() {
    return function(dispatch) {
        return axios('http://localhost:3001/videogames')
        .then(res => {
            dispatch({type: GET_ALL_VIDEOGAMES, payload: res.data})
        }).catch(error => alert("Sorry:( Something happened, please reload the page", error.message))
    }
}

export function getAllGenres(){
    return function(dispatch){
        return axios('http://localhost:3001/genre')
        .then(res => {
            dispatch({type: GET_ALL_GENRES, payload: res.data})
        }).catch(error => console.log(error))
    }
}
export function getPlatforms(){
    return function(dispatch){
        let platforms = [
			"PC",
			"MacOS",
			"Linux",
			"PlayStation 4",
			"PlayStation 5",
			"PSP",
			"PS VITA",
			"Xbox Series S/X",
			"Xbox One",
			"Xbox 360",
			"Nintendo Switch",
			"Nintendo 3DS/2DS",
            "Other"
		]
    dispatch({type:GET_PLATFORMS, payload: platforms})
}}

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

export function filterByLowerRating(){
    return {
        type:ORDER_BY_LOWER_RATING
    }
}

export function filterByHigherRating(){
    return {
        type: ORDER_BY_HIGHER_RATING
    }
}

export function orderAsc(){
    return {
        type: ORDER_ASC
    }
}

export function orderDesc(){
return {
    type: ORDER_DESC
}
}