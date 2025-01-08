import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/Movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
  getGenres,
} from "../redux/actions/movieActions";
import "../Styles.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const genres = useSelector((state) => state.movies.genres);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getGenres());
  }, [dispatch]);

  // console.log(genres);
  // console.log(popularMovies);

  return (
    <div className="home-page">
      <h1>Welcome to R-flix</h1>

      <div className="movie-search"></div>

      <section>
        <h2>Popular Movies</h2>
        <MovieList movies={popularMovies} genres={genres} onClick={() => {}} />
      </section>

      <section>
        <h2>Top Rated Movies</h2>
        <MovieList movies={topRatedMovies} genres={genres} onClick={() => {}} />
      </section>
    </div>
  );
};

export default HomePage;
