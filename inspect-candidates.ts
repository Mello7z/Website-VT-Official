import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello",
    });
    console.log("Response text:", response.text);
    console.log("Full Response Keys:", Object.keys(response));
    console.log("Candidates:", JSON.stringify(response.candidates, null, 2));
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
