import {
  GET_ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  SEARCH_VIDEOGAMES,
  CREATE_VIDEOGAME,
  GET_PLATFORMS,
  CLEAR_DETAIL,
  CLEAR_FILTER,
  SORT_BY_RATING,
  SORT_BY_NAME,
  FILTER_BY_SOURCE,
  FILTER_BY_GENRE,
  CLEAR_SEARCH
} from "../actions";

let initialState = {
  genres: [],
  videogames: [],
  videogamesCopy: [],
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
        videogamesCopy: action.payload
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
      case CLEAR_SEARCH:
        return {
          ...state,
          searchVideogame: [],
        };
    case SORT_BY_RATING: 
    let filter;
    if(action.payload === 'Lower'){
      filter = state.videogames.sort((a,b) => a.rating - b.rating)
    }
    if(action.payload === 'Higher'){
      filter = state.videogames.sort((a,b) => b.rating - a.rating)
    }
    return {
      ...state,
      videogames: filter
    };
    case SORT_BY_NAME:
      let filterName;
      if(action.payload === "A-Z"){
        filterName = state.videogames.sort((a,b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1
          }
          if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1
          }
          return 0
        })
      }
      if(action.payload === 'Z-A'){
        filterName = state.videogames.sort((a,b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            return -1
          }
          if(a.name.toLowerCase() < b.name.toLowerCase()){
            return 1
          }
          return 0
        })
      }
      return {
        ...state,
        videogames: filterName
      }
      case FILTER_BY_SOURCE:
        let filterSource;
        if(action.payload === 'Created') {
          filterSource = state.videogames.filter((el) => el.id.length > 7)
        }
        if(action.payload === 'Database') {
          filterSource = state.videogameById.filter((el) => el.id.length < 7)
        }
        if(action.payload === 'All'){
          filterSource = state.videogamesCopy
        }
        return {
          ...state,
          videogames: filterSource
        }
        case FILTER_BY_GENRE: 
        let filterGenre;
        if(action.payload === "All"){
          filterGenre = state.videogamesCopy
        } else {
          filterGenre = state.videogames.filter(el => el.genres.includes(action.payload))
        }
        return {
          ...state,
          videogames: filterGenre
        }
        case CLEAR_FILTER: 
        return {
          ...state,
          videogames: state.videogamesCopy
        }
   
    default:
      return { ...state };
  }
}
