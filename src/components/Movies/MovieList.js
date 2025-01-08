import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, genres }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </div>
  );
};

export default MovieList;
