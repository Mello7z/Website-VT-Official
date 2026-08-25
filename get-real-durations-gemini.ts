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

const videos = [
  { name: "DINHEIRO", url: "https://www.youtube.com/watch?v=N-cl1rcye1k" },
  { name: "FUTURO", url: "https://www.youtube.com/watch?v=AMyy1nZ-LD4" },
  { name: "LEAN NO COPO", url: "https://www.youtube.com/watch?v=Ll1QZ2f_jKk" },
  { name: "SEM AMOR", url: "https://www.youtube.com/watch?v=SUFAN2uq9Gk" },
  { name: "WAVE", url: "https://www.youtube.com/watch?v=Q6lYQuXc41M" },
];

async function main() {
  console.log("Querying Gemini with Google Search Grounding for video durations...");
  
  for (const video of videos) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `What is the exact track duration of the YouTube video at "${video.url}" (Title: "${video.name}" by artist VT)? Please respond with ONLY the duration in MM:SS format, e.g. "03:14". If there are multiple versions, find the exact one corresponding to that video.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      console.log(`${video.name}: ${response.text?.trim()}`);
    } catch (e: any) {
      console.error(`Error querying ${video.name}:`, e.message);
    }
  }
}

main();
