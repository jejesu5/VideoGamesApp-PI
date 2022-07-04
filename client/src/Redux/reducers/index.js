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
      filter = [...state.videogames].sort((a,b) => a.rating - b.rating)
    }
    if(action.payload === 'Higher'){
      filter = [...state.videogames].sort((a,b) => b.rating - a.rating)
    }
    return {
      ...state,
      videogamesCopy: filter
    };
    case SORT_BY_NAME:
      let filterName;
      if(action.payload === 'A-Z'){
        filterName = [...state.videogames].sort((a,b) => {
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
        filterName = [...state.videogames].sort((a,b) => {
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
        videogamesCopy: filterName
      }
      case FILTER_BY_SOURCE:
        let filterSource;
        if(action.payload === 'Created') {
          filterSource = state.videogames.filter((el) => el.id.length > 6)
        }
        if(action.payload === 'Database') {
          filterSource = state.videogames.filter((el) => el.id.toString().length < 6)
        }
        if(action.payload === 'All'){
          filterSource = state.videogames
        }
        return {
          ...state,
          videogamesCopy: filterSource
        }
        case FILTER_BY_GENRE: 
        let filterGenre;
        if(action.payload !== 'All'){
          filterGenre = state.videogames.filter((el) => el.genres.includes(action.payload))
        } else {
          filterGenre = state.videogames
        }
        return {
          ...state,
          videogamesCopy: filterGenre
        }
        case CLEAR_FILTER: 
        return {
          ...state,
          videogamesCopy: state.videogames
        }
   
    default:
      return { ...state };
  }
}
