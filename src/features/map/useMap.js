import { GoogleGenAI, Type } from "@google/genai";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

const useMap = () => {
  const ai = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY,
  });

  const [textPromptCoordinates, setTextPromptCoordinates] = useState([]);
  const [activityCoordinates, setActivityCoordinates] = useState([]);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [text, setText] = useState("");

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

  return {
    activityCoordinates,
    polylineCoordinates,
    setText,
    RightClickEventHandler,
    textPromptCoordinates,
    handleSubmit,
  };
};

export default useMap;
