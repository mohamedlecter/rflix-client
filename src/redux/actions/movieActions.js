import axios from "axios";

import { API_KEY, BASE_URL } from "../../services/tmdbApi";

export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_TOP_RATED_MOVIES = "GET_TOP_RATED_MOVIES";
export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const GET_MY_RATINGS = "GET_MY_RATINGS";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const GET_RECOMMENDATIONS = "GET_RECOMMENDATIONS";

export const getPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    dispatch({ type: GET_POPULAR_MOVIES, payload: response.data.results });
    // console.log(response.data.results);
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

export const getGenres = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    dispatch({ type: GET_GENRES, payload: response.data.genres });
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const searchMovies = (query) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    dispatch({ type: SEARCH_MOVIES, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

// export const getMyRatings = () => async (dispatch, getState) => {
//   const sessionId = getState().auth.sessionId;
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`
//     );
//     dispatch({ type: GET_MY_RATINGS, payload: response.data.results });
//   } catch (error) {
//     console.error("Error fetching rated movies:", error);
//   }
// };
