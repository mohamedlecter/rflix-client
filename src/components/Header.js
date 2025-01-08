import React from "react";
import SearchBar from "../components/Movies/SearchBar";

export default function Header() {
  return (
    <div>
      <a href="/">
        <h1>R-flix</h1>
      </a>

      <SearchBar />
    </div>
  );
}
