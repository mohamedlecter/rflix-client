import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onClick }) => (
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} onClick={onClick} />
    ))}
  </div>
);

export default MovieList;
