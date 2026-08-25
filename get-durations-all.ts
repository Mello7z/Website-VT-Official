import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
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
  { name: "DINHEIRO (VT - Dinheiro em espécie feat. V.N.A)", url: "https://www.youtube.com/watch?v=N-cl1rcye1k" },
  { name: "FUTURO (VT - FUTURO)", url: "https://www.youtube.com/watch?v=AMyy1nZ-LD4" },
  { name: "LEAN NO COPO (VT - Lean No Copo)", url: "https://www.youtube.com/watch?v=Ll1QZ2f_jKk" },
  { name: "SEM AMOR (VT - Tapa Feat. Santthekid)", url: "https://www.youtube.com/watch?v=SUFAN2uq9Gk" },
  { name: "WAVE (VT - SE VAI ENTRA NA MINHA WAVE)", url: "https://www.youtube.com/watch?v=Q6lYQuXc41M" },
];

async function main() {
  console.log("Querying Gemini with Google Search Grounding once for all video durations...");
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert music duration retriever. Find the EXACT duration (minutes and seconds, MM:SS) of these 5 specific YouTube videos. You must search the web/YouTube to find their exact lengths.
      
      Here are the 5 videos:
      1. DINHEIRO: "${videos[0].url}" (Title: "${videos[0].name}")
      2. FUTURO: "${videos[1].url}" (Title: "${videos[1].name}")
      3. LEAN NO COPO: "${videos[2].url}" (Title: "${videos[2].name}")
      4. SEM AMOR: "${videos[3].url}" (Title: "${videos[3].name}")
      5. WAVE: "${videos[4].url}" (Title: "${videos[4].name}")
      
      Provide the result in clean JSON format:
      {
        "DINHEIRO": "MM:SS",
        "FUTURO": "MM:SS",
        "LEAN NO COPO": "MM:SS",
        "SEM AMOR": "MM:SS",
        "WAVE": "MM:SS"
      }
      
      Make sure to do thorough search queries for each URL or video title to retrieve the authentic duration, because the user explicitly requested the REAL durations from YouTube! Do not hallucinate or return placeholders.`,
      config: {
        tools: [{ googleSearch: {} }]
      },
    });
    fs.writeFileSync("gemini-response.json", JSON.stringify(response, null, 2));
    console.log("Wrote response to gemini-response.json");
    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      console.log("Has content!");
    } else {
      console.log("No candidates/content found.");
    }
  } catch (e: any) {
    console.error("Error querying Gemini:", e.message);
  }
}

main();
