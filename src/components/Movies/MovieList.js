import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, genres, onClick }) => (
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        genres={genres}
        onClick={onClick}
      />
    ))}
  </div>
);

export default MovieList;
