import { GoogleGenAI, Type } from "@google/genai";
import React, { useState } from "react";
import "./App.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY,
});

let DefaultIcon = L.icon({
  iconUrl:
    "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/87-512.png",
  iconAnchor: [16, 16],
  iconSize: [32, 32],
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [textPromptCoordinates, setTextPromptCoordinates] = useState([]);
  const [activityCoordinates, setActivityCoordinates] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [text, setText] = useState("");
  const position = [35.6764, 139.65];

  const pathOptions = { color: "red", weight: 3, opacity: 0.7 };

  const RightClickEventHandler = () => {
    useMapEvents({
      contextmenu: (e) => {
        const lat = e.latlng.lat.toFixed(4);
        const lng = e.latlng.lng.toFixed(4);
        setTextPromptCoordinates([lat, lng]);
      },
    });

    return null;
  };

  const handleSubmit = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: `Create an itinerary around these coordinates: ${textPromptCoordinates}.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              activityName: {
                type: Type.STRING,
              },
              description: {
                type: Type.STRING,
              },
              lat: {
                type: Type.NUMBER,
              },
              lng: {
                type: Type.NUMBER,
              },
            },
            propertyOrdering: ["activityName", "description", "lat", "lng"],
          },
        },
      },
    });
    const responseObject = JSON.parse(response.text);
    setActivityCoordinates(responseObject);
    setPolylineCoordinates([
      textPromptCoordinates,
      ...responseObject.map((loc) => [loc.lat, loc.lng]),
      textPromptCoordinates,
    ]);
  };

  return (
    <div className="App">
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
        {activityCoordinates.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>
              <h3>{loc.activityName}</h3>
              {loc.description}
            </Popup>
          </Marker>
        ))}
        <RightClickEventHandler />
      </MapContainer>
    </div>
  );
}

export default App;
