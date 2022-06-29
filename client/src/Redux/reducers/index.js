import { GET_ALL_GENRES, GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, SEARCH_VIDEOGAMES, CREATE_VIDEOGAME, CLEAR_DETAIL, FILTER_API_GAMES, FILTER_DB_GAMES } from "../actions";

let initialState = {
    genres: [],
    videogames: [],
    searchVideogame: [],
    videogameById: [],
    createVideogame: null
}

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameById: action.payload
            }
        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                searchVideogame: action.payload
            }
        case CREATE_VIDEOGAME:
            return {
                ...state,
                createVideogame: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                videogameById: []
            }
        case FILTER_API_GAMES:
            return {
                ...state,
                videogames: state.videogames.filter((el) => el.id.length < 7)
            }
        case FILTER_DB_GAMES: 
        return {
            ...state,
            videogames: state.videogames.filter((el) => el.id.length > 7)
        }
            default: 
            return {...state}
    }
}
