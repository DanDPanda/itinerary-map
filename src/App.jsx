import Map from "./features/map/Map";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <h1 className="map-center-indicator">+</h1>
      <Map />
    </div>
  );
}

export default App;
