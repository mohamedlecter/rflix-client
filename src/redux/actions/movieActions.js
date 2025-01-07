import axios from "axios";

// TMDb API Configuration
const API_KEY = "8ff92f1c465ff6d269d76ed86b533014";
const BASE_URL = "https://api.themoviedb.org/3";

export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_TOP_RATED_MOVIES = "GET_TOP_RATED_MOVIES";
export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const GET_MY_RATINGS = "GET_MY_RATINGS";

export const getPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    dispatch({ type: GET_POPULAR_MOVIES, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

export const getTopRatedMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    dispatch({ type: GET_TOP_RATED_MOVIES, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
  }
};

export const getMovieDetails = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,recommendations`
    );
    dispatch({ type: GET_MOVIE_DETAILS, payload: response.data });
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

export const getMyRatings = () => async (dispatch, getState) => {
  const sessionId = getState().auth.sessionId; // Assuming sessionId is stored in auth state
  try {
    const response = await axios.get(
      `${BASE_URL}/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`
    );
    dispatch({ type: GET_MY_RATINGS, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching rated movies:", error);
  }
};
