import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/Movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
} from "../redux/actions/movieActions";
import "../Styles.css";
import Header from "../components/Header";
import GenreFilter from "../components/Movies/GenreFilter";

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const genres = useSelector((state) => state.movies.genres);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("search", searchResults);
  console.log(topRatedMovies);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
  }, [dispatch]);

  return isAuthenticated ? (
    <div className="home-page">
      <Header />
      <GenreFilter />
      {searchResults.length > 0 ? (
        <section>
          <h2>Search Results</h2>
          <MovieList movies={searchResults} genres={genres} />
        </section>
      ) : (
        <>
          <section>
            <h2>Popular Movies</h2>
            <MovieList movies={popularMovies} genres={genres} />
          </section>

          <section>
            <h2>Top Rated Movies</h2>
            <MovieList movies={topRatedMovies} genres={genres} />
          </section>
        </>
      )}
    </div>
  ) : (
    <div>
      <h1>Sign in to view this page</h1>
      <a href="/">Sign In</a>
    </div>
  );
};

export default HomePage;
