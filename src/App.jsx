import Map from "./features/map/Map";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState, useEffect } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [originPoint, setOriginPoint] = useState([]);
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dandinh.org/api/users/test/searches"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result1 :>> ", result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dandinh.org/api/searches/test");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result2 :>> ", result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
