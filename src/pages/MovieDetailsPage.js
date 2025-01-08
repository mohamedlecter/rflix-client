import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails } from "../redux/actions/movieActions";
import MovieList from "../components/Movies/MovieList";
import Header from "../components/Header";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movieDetails);
  console.log(movie);

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);

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
  return (
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
  );
}

export default MovieDetailsPage;
