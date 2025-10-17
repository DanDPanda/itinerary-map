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
const pathOptions = { color: "red", weight: 3, opacity: 0.7 };

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
    <MapContainer
      center={position}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
      {textPromptCoordinates.length && (
        <Popup position={textPromptCoordinates}>
          <input
            type="text"
            id="myInput"
            placeholder="Type here..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>Submit</button>
        </Popup>
      )}
      <Polyline positions={polylineCoordinates} pathOptions={pathOptions} />
      {activityCoordinates.length && (
        <Marker position={textPromptCoordinates} icon={createNumberedIcon(0)}>
          <Popup>
            <h3>Starting Point!</h3>
          </Popup>
        </Marker>
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
  );
}

export default Map;
