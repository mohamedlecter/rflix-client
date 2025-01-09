import {
  GET_POPULAR_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_MOVIE_DETAILS,
  GET_MY_RATINGS,
  GET_GENRES,
  SEARCH_MOVIES,
  RATE_MOVIE,
  REMOVE_MOVIE_RATING,
  GET_MY_RATING,
} from "../actions/movieActions";

const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  movieDetails: null,
  ratedMovies: [],
  genres: [],
  searchResults: [],
  ratedMovie: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case GET_TOP_RATED_MOVIES:
      return { ...state, topRatedMovies: action.payload };
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      };
    case GET_MY_RATINGS:
      return { ...state, ratedMovies: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case SEARCH_MOVIES:
      return { ...state, searchResults: action.payload };
    case RATE_MOVIE:
      return {
        ...state,
        ratedMovies: [...state.ratedMovies, action.payload],
      };
    case REMOVE_MOVIE_RATING:
      return {
        ...state,
        ratedMovies: state.ratedMovies.filter(
          (movie) => movie.movieId !== action.payload
        ),
      };
    case GET_MY_RATINGS:
      return { ...state, ratedMovies: action.payload };
    case GET_MY_RATING:
      return { ...state, ratedMovie: action.payload };

    default:
      return state;
  }
};

export default movieReducer;
