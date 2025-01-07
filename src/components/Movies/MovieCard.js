import React from "react";

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card" onClick={() => onClick(movie.id)}>
    <img src={movie.poster_path} alt={movie.title} />
    <h3>{movie.title}</h3>
    <p>{movie.release_date.split("-")[0]}</p>
    {/* <p>{movie.genres.join(", ")}</p> */}
    <p>{movie.rating || movie.globalRating} ⭐</p>
  </div>
);

export default MovieCard;
