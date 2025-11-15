import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

export const aiResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
};
