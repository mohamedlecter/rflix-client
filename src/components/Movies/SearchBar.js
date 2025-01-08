import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../../redux/actions/movieActions";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
