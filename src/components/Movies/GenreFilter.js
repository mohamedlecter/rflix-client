import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
} from "../../redux/actions/movieActions";

const GenreFilter = (query) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies.genres);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
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
    <div className="genre-filter">
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
  );
};

export default GenreFilter;
