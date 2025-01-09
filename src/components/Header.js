import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/actions/authActions";
import SearchBar from "../components/Movies/SearchBar";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/"); // Redirect to Sign-In page
  };

  return (
    <div className="header">
      <a href="/movies">
        <h1>R-flix</h1>
      </a>

      <SearchBar />

      <a href="/my-ratings">My Ratings</a>

      {isAuthenticated && (
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      )}
    </div>
  );
}
