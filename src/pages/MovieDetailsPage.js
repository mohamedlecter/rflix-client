import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovieDetails,
  getMyMovieRating,
} from "../redux/actions/movieActions";
import MovieList from "../components/Movies/MovieList";
import Header from "../components/Header";
import { rateMovie, removeMovieRating } from "../redux/actions/movieActions";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);
  const sessionId = useSelector((state) => state.auth.sessionId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ratedMovie = useSelector(
    (state) => state.movies.ratedMovie?.rated?.value
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
    dispatch(getMyMovieRating(movieId, sessionId));
  }, [dispatch, movieId]);

  const handleRating = (rating) => {
    dispatch(rateMovie(movie.id, rating, sessionId));
  };

  const handleRemoveRating = () => {
    dispatch(removeMovieRating(movie.id, sessionId));
    navigate("/movies");
  };

  console.log("my rating insde movie details", ratedMovie);

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
    homepage,
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
          alt={title}
        />
        <h1>{title}</h1>
        <p>
          {overview}
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

        <div className="rating-actions">
          <h2>Rate this movie:</h2>
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(star)}>
              {star} ⭐
            </button>
          ))}
        </div>
        <div className="current-rating">
          <h2>Your Rating:</h2>
          {rateMovie ? (
            <p>{ratedMovie} ⭐</p>
          ) : (
            <p>You haven't rated this movie yet.</p>
          )}
          <button onClick={handleRemoveRating}>Remove Rating</button>
        </div>
        <div className="cast">
          <h2>Cast:</h2>
          <ul>
            {credits.cast.slice(0, 10).map((castMember) => (
              <li key={castMember.id}>
                {castMember.name} as {castMember.character}
              </li>
            ))}
          </ul>
        </div>
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
