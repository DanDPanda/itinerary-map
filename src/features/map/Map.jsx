import useMap from "./useMap";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

function Map() {
  const {
    activityCoordinates,
    polylineCoordinates,
    setText,
    RightClickEventHandler,
    textPromptCoordinates,
    handleSubmit,
    createNumberedIcon,
  } = useMap();
  return (
    <div className="map-root">
      <MapContainer
        center={position}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
        {textPromptCoordinates.length && (
          <Popup position={textPromptCoordinates}>
            <div className="popup-form">
              <input
                className="popup-input"
                type="text"
                id="myInput"
                placeholder="Describe the itinerary (e.g. 'sightseeing')"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
              <button className="popup-button" onClick={handleSubmit}>
                Generate
              </button>
            </div>
          </Popup>
        )}
        {polylineCoordinates.length > 1 && (
          <>
            <Polyline
              positions={polylineCoordinates}
              pathOptions={shadowOptions}
            />
            <Polyline
              positions={polylineCoordinates}
              pathOptions={coreOptions}
            />
          </>
        )}
        {activityCoordinates.map((loc, index) => (
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
        <RightClickEventHandler />
      </MapContainer>
    </div>
  );
}

export default Map;
