import axios from "axios";

import { API_KEY, BASE_URL } from "../../services/tmdbApi";

export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_TOP_RATED_MOVIES = "GET_TOP_RATED_MOVIES";
export const GET_MOVIE_DETAILS = "GET_MOVIE_DETAILS";
export const GET_MY_RATINGS = "GET_MY_RATINGS";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const RATE_MOVIE = "RATE_MOVIE";
export const REMOVE_MOVIE_RATING = "REMOVE_MOVIE_RATING";
export const GET_MY_RATING = "GET_MY_RATING";

export const getPopularMovies = (genreId) => async (dispatch) => {
  try {
    const url = genreId
      ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    // to show 40 results, we need to fetch 2 pages
    const [page1, page2] = await Promise.all([
      axios.get(`${url}&page=1`),
      axios.get(`${url}&page=2`),
    ]);

    const combinedResults = [...page1.data.results, ...page2.data.results];

    dispatch({ type: GET_POPULAR_MOVIES, payload: combinedResults });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

export const getTopRatedMovies = (genreId) => async (dispatch) => {
  try {
    const url = genreId
      ? `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=100`
      : `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=100`;

    // to show 40 results, we need to fetch 2 pages
    const [page1, page2] = await Promise.all([
      axios.get(`${url}&page=1`),
      axios.get(`${url}&page=2`),
    ]);

    const combinedResults = [...page1.data.results, ...page2.data.results];
    dispatch({ type: GET_TOP_RATED_MOVIES, payload: combinedResults });
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

export const rateMovie = (movieId, rating, sessionId) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    await axios.post(url, { value: rating });
    dispatch({ type: RATE_MOVIE, payload: { movieId, rating } });
  } catch (error) {
    console.error("Error rating movie:", error);
  }
};

export const removeMovieRating = (movieId, sessionId) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    await axios.delete(url);
    dispatch({ type: REMOVE_MOVIE_RATING, payload: movieId });
  } catch (error) {
    console.error("Error removing movie rating:", error);
  }
};

export const getMyRatings = (sessionId) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`;
    const response = await axios.get(url);
    dispatch({ type: GET_MY_RATINGS, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching user ratings:", error);
  }
};

export const getMyMovieRating = (movieId, sessionId) => async (dispatch) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${sessionId}`;
    const response = await axios.get(url);
    dispatch({ type: GET_MY_RATING, payload: response.data });
    console.log("My rating:", response.data);
  } catch (error) {
    console.error("Error fetching user rating:", error);
  }
};
