import useMap from "./useMap";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker } from "@adamscybot/react-leaflet-component-marker";
import Spinner from "../../components/Spinner/Spinner";
import "./Map.css";

const position = [35.6764, 139.65];
const shadowOptions = {
  color: "rgba(30,144,255,0.18)", // soft blue glow
  weight: 7,
  opacity: 0.9,
  lineCap: "round",
  lineJoin: "round",
};
const coreOptions = {
  color: "#1e90ff",
  weight: 5,
  opacity: 0.95,
  lineCap: "round",
  lineJoin: "round",
};

function Map({ searchResults, setMap, isLoading, originPoint }) {
  const { createNumberedIcon } = useMap();
  return (
    <div className="map-root">
      <MapContainer
        center={position}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom="center"
        ref={setMap}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
        {isLoading && (
          <Marker
            position={originPoint}
            icon={<Spinner size={40} fill={true} />}
          />
        )}
        {searchResults.length > 1 && (
          <>
            <Polyline
              positions={searchResults.map((loc) => [loc.lat, loc.lng])}
              pathOptions={shadowOptions}
            />
            <Polyline
              positions={searchResults.map((loc) => [loc.lat, loc.lng])}
              pathOptions={coreOptions}
            />
          </>
        )}
        {searchResults.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.lat, loc.lng]}
            icon={createNumberedIcon(index + 1)}
          >
            <Popup>
              <h3>{loc.activityName}</h3>
              <h4>{loc.startTime}</h4>
              {loc.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
