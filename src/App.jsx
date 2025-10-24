import Map from "./features/map/Map";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [originPoint, setOriginPoint] = useState([]);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {!searchResults.length && !isLoading && (
        <h1 className="map-center-indicator">+</h1>
      )}
      <Map
        searchResults={searchResults}
        setMap={setMap}
        isLoading={isLoading}
        originPoint={originPoint}
      />
      <SearchBar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        map={map}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setOriginPoint={setOriginPoint}
      />
    </div>
  );
}

export default App;
