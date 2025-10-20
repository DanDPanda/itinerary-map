import { GoogleGenAI, Type } from "@google/genai";
import { useState } from "react";

const useSearchBar = ({ setSearchResults, map }) => {
  const [text, setText] = useState("");

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleSubmit = async (text) => {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: `Create an itinerary around these coordinates: ${map.getCenter()}.
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
    setSearchResults(responseObject);
  };

  const handleClose = () => {
    setSearchResults([]);
    setText("");
  };

  return { handleSubmit, handleClose, text, setText };
};

export default useSearchBar;
