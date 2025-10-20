import React, { useState } from "react";
import "./SearchBar.css";

// Using SVG for the icons to avoid external dependencies
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="icon">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleFormSubmit = (event) => {
    console.log("event :>> ", event);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="textarea"
          className="search-input"
          placeholder="What would you like to do?"
        />
        <div className="search-bar-actions">
          <button className="action-button">
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
