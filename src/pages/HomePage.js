import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/Movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
  getGenres,
} from "../redux/actions/movieActions";
import SearchBar from "../components/Movies/SearchBar";
import "../Styles.css";
const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const genres = useSelector((state) => state.movies.genres);
  const searchResults = useSelector((state) => state.movies.searchResults);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getGenres());
  }, [dispatch]);

  // console.log(genres);
  // console.log(popularMovies);

  return (
    <div className="home-page">
      <a href="/">
        <h1>R-flix</h1>
      </a>
      <SearchBar />

      {searchResults.length > 0 ? (
        <section>
          <h2>Search Results</h2>
          <MovieList
            movies={searchResults}
            genres={genres}
            onClick={() => {}}
          />
        </section>
      ) : (
        <>
          <section>
            <h2>Popular Movies</h2>
            <MovieList
              movies={popularMovies}
              genres={genres}
              onClick={() => {}}
            />
          </section>

          <section>
            <h2>Top Rated Movies</h2>
            <MovieList
              movies={topRatedMovies}
              genres={genres}
              onClick={() => {}}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
