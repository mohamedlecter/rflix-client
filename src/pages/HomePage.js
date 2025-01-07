import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/Movies/MovieList";
import { getPopularMovies } from "../redux/actions/movieActions";
import "../Styles.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);

  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    dispatch(getPopularMovies());
    // Dispatch other actions for top-rated or other lists as necessary
  }, [dispatch]);

  const filterByGenre = (movies) => {
    if (selectedGenre === "All") return movies;
    return movies.filter((movie) => movie.genres.includes(selectedGenre));
  };

  return (
    <div className="home-page">
      <h1>Welcome to R-flix</h1>

      <div className="genre-filter">
        <label>Filter by Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          {/* Add more genres */}
        </select>
      </div>

      <section>
        <h2>Popular Movies</h2>
        <MovieList movies={filterByGenre(popularMovies)} onClick={() => {}} />
      </section>

      <section>
        <h2>Top Rated Movies</h2>
        <MovieList movies={filterByGenre(topRatedMovies)} onClick={() => {}} />
      </section>
    </div>
  );
};

export default HomePage;
