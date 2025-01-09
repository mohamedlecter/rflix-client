import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyRatingsPage from "./pages/MyRatingsPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route
            path="/movie/:movieId"
            element={<ProtectedRoute element={<MovieDetailsPage />} />}
          />
          <Route
            path="/my-ratings"
            element={<ProtectedRoute element={<MyRatingsPage />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
