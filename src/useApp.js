import L from "leaflet";
import { GoogleGenAI, Type } from "@google/genai";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

const useMap = () => {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const [textPromptCoordinates, setTextPromptCoordinates] = useState([]);
  const [activityCoordinates, setActivityCoordinates] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: `Create an itinerary around these coordinates: ${textPromptCoordinates}.
        Do not put events on the same coordinates.
        Have the coordinates be where they start the activity.
        Have the first object be where they start the activity.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              activityName: {
                type: Type.STRING,
              },
              startTime: {
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

  const createNumberedIcon = (number) =>
    new L.divIcon({
      className: "number-icon",
      html: `<div class="number-circle">${number}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

  return {
    activityCoordinates,
    polylineCoordinates,
    // setText,
    // textPromptCoordinates,
    // handleSubmit,
    createNumberedIcon,
  };
};

export default useMap;
