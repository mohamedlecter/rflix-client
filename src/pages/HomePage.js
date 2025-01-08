import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../components/Movies/MovieList";
import {
  getPopularMovies,
  getTopRatedMovies,
  getGenres,
} from "../redux/actions/movieActions";
import "../Styles.css";
import Header from "../components/Header";

const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const genres = useSelector((state) => state.movies.genres);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const [selectedGenre, setSelectedGenre] = useState("All");

  console.log(topRatedMovies);

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    if (genreId === "All") {
      dispatch(getPopularMovies());
      dispatch(getTopRatedMovies());
    } else {
      dispatch(getPopularMovies(genreId));
      dispatch(getTopRatedMovies(genreId));
    }
  };

  return (
    <div className="home-page">
      <Header />
      <div className="filter">
        <label htmlFor="genre-select">Filter by Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="All">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

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
  );
};

export default HomePage;
