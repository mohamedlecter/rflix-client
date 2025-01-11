import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovieDetails,
  getMyMovieRating,
  rateMovie,
  removeMovieRating,
} from "../redux/actions/movieActions";
import MovieList from "../components/Movies/MovieList";
import Header from "../components/Header";

const RatingButtons = ({ onRate }) => {
  return (
    <div className="rating-actions">
      <h2>Rate this movie:</h2>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          aria-label={`Rate ${star} stars`}
        >
          {star} ⭐
        </button>
      ))}
    </div>
  );
};

const CastList = ({ cast }) => (
  <div className="cast">
    <h2>Cast:</h2>
    <ul>
      {cast.slice(0, 10).map((member) => (
        <li key={member.id}>
          {member.name} as {member.character}
        </li>
      ))}
    </ul>
  </div>
);

function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ratedMovie = useSelector(
    (state) => state.movies.ratedMovie?.rated?.value
  );

  // Local state for feedback
  const [localRatedValue, setLocalRatedValue] = useState(null);
  const [feedbackMess, setfeedbackMess] = useState("");

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
    dispatch(getMyMovieRating(movieId, sessionId));
  }, [dispatch, movieId, sessionId]);

  useEffect(() => {
    // Synchronize local state with Redux state
    if (ratedMovie !== undefined) {
      setLocalRatedValue(ratedMovie);
    }
  }, [ratedMovie]);

  const handleRating = (rating) => {
    dispatch(rateMovie(movie.id, rating, sessionId));
    setLocalRatedValue(rating); // Update locally
    setfeedbackMess(`You rated this movie ${rating} ⭐`);
    setTimeout(() => setfeedbackMess(""), 3000); // Clear message after 3 seconds
  };

  const handleRemoveRating = () => {
    dispatch(removeMovieRating(movie.id, sessionId));
    setLocalRatedValue(null); // Clear locally
    setfeedbackMess("Your rating has been removed.");
    setTimeout(() => setfeedbackMess(""), 3000); // Clear message after 3 seconds
  };

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  const {
    title,
    poster_path,
    overview,
    release_date,
    genres,
    runtime,
    imdb_id,
    vote_average,
    credits,
    recommendations,
  } = movie;

  return isAuthenticated ? (
    <div className="movie-details-page">
      <Header />
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={`${title} poster`}
        />
        <h1>{title}</h1>
        <p>
          {overview}{" "}
          <a
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDb
          </a>
        </p>
        <div className="details">
          <p>Release Date: {release_date}</p>
          <p>Runtime: {runtime} minutes</p>
          <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
          <p>Rating: {vote_average} ⭐</p>
        </div>

        <RatingButtons onRate={handleRating} />

        <div className="current-rating">
          <h2>Your Rating:</h2>
          {localRatedValue ? (
            <p>{localRatedValue} ⭐</p>
          ) : (
            <p>You haven't rated this movie yet.</p>
          )}
          <button onClick={handleRemoveRating} aria-label="Remove your rating">
            Remove Rating
          </button>
        </div>

        {feedbackMess && (
          <div className="action-message">
            <p>{feedbackMess}</p>
          </div>
        )}

        <CastList cast={credits.cast} />
      </div>

      <section className="recommendations">
        <h2>Recommendations</h2>
        <div className="recommendation">
          <MovieList movies={recommendations.results} genres={genres} />
        </div>
      </section>
    </div>
  ) : (
    <div>
      <h1>Sign in to view this page</h1>
      <a href="/">Sign In</a>
    </div>
  );
}

export default MovieDetailsPage;
