import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, genres }) => {
  const navigate = useNavigate();
  const movieGenres = movie.genre_ids.map((id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : "Unknown";
  });

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>{movie.release_date.split("-")[0]}</p>
      <p>{movieGenres.join(", ")}</p>
      <p>{movie.rating || movie.vote_average} ⭐</p>
    </div>
  );
};

export default MovieCard;
