import Map from "./features/map/Map";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);

  return (
    <div className="App">
      <h1 className="map-center-indicator">+</h1>
      <Map searchResults={searchResults} setMap={setMap} />
      <SearchBar setSearchResults={setSearchResults} map={map} />
    </div>
  );
}

export default App;
