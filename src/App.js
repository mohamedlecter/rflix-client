import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyRatingsPage from "./pages/MyRatingsPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/movies" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/my-ratings" element={<MyRatingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
