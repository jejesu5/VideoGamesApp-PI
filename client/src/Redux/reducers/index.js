import {
  GET_ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  SEARCH_VIDEOGAMES,
  CREATE_VIDEOGAME,
  GET_PLATFORMS,
  CLEAR_DETAIL,
  FILTER_API_GAMES,
  FILTER_DB_GAMES,
  ORDER_BY_LOWER_RATING,
  ORDER_BY_HIGHER_RATING
} from "../actions";

let initialState = {
  genres: [],
  videogames: [],
  searchVideogame: [],
  videogameById: [],
  platforms: [],
  createVideogame: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameById: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        searchVideogame: action.payload,
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        createVideogame: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        videogameById: [],
      };
    case FILTER_API_GAMES:
      return {
        ...state,
        videogames: state.videogames.filter((el) => el.id.length < 7),
      };
    case FILTER_DB_GAMES:
      return {
        ...state,
        videogames: state.videogames.filter((el) => el.id.length > 7),
      };
    case ORDER_BY_LOWER_RATING:
      return {
        ...state,
        videogames: state.videogames.sort((a,b) => {
        if(a.rating < b.rating){
            return -1
          } if(a.rating > b.rating){
            return 1
          }
          return 0
        })
      }
      case ORDER_BY_HIGHER_RATING:
        return {
          ...state,
          videogames: state.videogames.sort((a,b) => {
            if(a.rating > b.rating){
              return 1
            } if(a.rating < b.rating){
              return -1
            }
            return 0
          })
        }
    default:
      return { ...state };
  }
}
