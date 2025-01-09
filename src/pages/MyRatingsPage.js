import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRatings } from "../redux/actions/movieActions";
import MovieList from "../components/Movies/MovieList";
import Header from "../components/Header";

const MyRatingsPage = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.auth.sessionId);
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);
  const genres = useSelector((state) => state.movies.genres);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (sessionId) {
      dispatch(getMyRatings(sessionId));
    }
  }, [dispatch, sessionId]);

  return isAuthenticated ? (
    <div className="my-ratings-page ">
      <Header />
      <h2>My Ratings</h2>
      {ratedMovies.length > 0 ? (
        <MovieList movies={ratedMovies} genres={genres} />
      ) : (
        <p>You haven't rated any movies yet.</p>
      )}
    </div>
  ) : (
    <div>
      <h1>Sign in to view this page</h1>
      <a href="/">Sign In</a>
    </div>
  );
};

export default MyRatingsPage;
