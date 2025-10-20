import "./SearchBar.css";
import useSearchBar from "./useSearchBar";
import Spinner from "../Spinner/Spinner";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="icon">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="icon">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);

const SearchBar = ({ setSearchResults, searchResults, map }) => {
  const { handleSubmit, handleClose, text, setText, isLoading } = useSearchBar({
    setSearchResults,
    map,
  });
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          className={
            "search-input" +
            (searchResults.length || isLoading ? " disabled" : "")
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Point at a location and type your desired itinerary ideas..."
          disabled={searchResults.length}
        />
        <div className="search-bar-actions">
          {isLoading ? (
            <Spinner size={28} />
          ) : !searchResults.length ? (
            <button
              className="action-button"
              onClick={() =>
                handleSubmit(document.querySelector(".search-input").value)
              }
            >
              <SearchIcon />
            </button>
          ) : (
            <button className="action-button" onClick={() => handleClose()}>
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
