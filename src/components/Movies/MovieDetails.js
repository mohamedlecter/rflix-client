import React from "react";

const MovieDetails = ({ movie }) => (
  <div className="movie-details">
    <h1>{movie.title}</h1>
    <img src={movie.poster_path} alt={movie.title} />
    <p>{movie.overview}</p>
    <p>
      <strong>Release Date:</strong> {movie.release_date}
    </p>
    <p>
      <strong>Genres:</strong> {movie.genres.join(", ")}
    </p>
    <p>
      <strong>Cast:</strong> {movie.cast.join(", ")}
    </p>
    <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
      Homepage
    </a>
    <a
      href={`https://www.imdb.com/title/${movie.imdb_id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      IMDb
    </a>
  </div>
);

export default MovieDetails;
