import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyRatingsPage from "./pages/MyRatingsPage";
import SignIn from "./components/Auth/SignIn";
import "./Styles.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/my-ratings" element={<MyRatingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
