import https from "https";
import fs from "fs";

function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  const url = "https://www.youtube.com/watch?v=N-cl1rcye1k";
  try {
    const html = await fetchHTML(url);
    const startMarker = "ytInitialPlayerResponse = ";
    const startIdx = html.indexOf(startMarker);
    if (startIdx === -1) {
      console.log("Could not find ytInitialPlayerResponse marker.");
      return;
    }
    
    const jsonStart = startIdx + startMarker.length;
    // We want to find the end of the JSON object.
    // Since it starts with '{', we can balance braces or search for trailing '};' or similar.
    let braceCount = 0;
    let jsonEnd = -1;
    for (let i = jsonStart; i < html.length; i++) {
      if (html[i] === "{") braceCount++;
      else if (html[i] === "}") {
        braceCount--;
        if (braceCount === 0) {
          jsonEnd = i + 1;
          break;
        }
      }
    }
    
    if (jsonEnd === -1) {
      console.log("Could not parse JSON block from HTML.");
      return;
    }
    
    const jsonStr = html.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonStr);
    
    console.log("Successfully parsed ytInitialPlayerResponse!");
    console.log("Keys:", Object.keys(parsed));
    
    if (parsed.playabilityStatus) {
      console.log("Playability Status:", parsed.playabilityStatus);
    }
    
    if (parsed.videoDetails) {
      console.log("Video Details:", {
        title: parsed.videoDetails.title,
        author: parsed.videoDetails.author,
        lengthSeconds: parsed.videoDetails.lengthSeconds,
        videoId: parsed.videoDetails.videoId
      });
    } else {
      console.log("No videoDetails field found.");
    }
    
    fs.writeFileSync("player-response.json", JSON.stringify(parsed, null, 2));
    console.log("Wrote full response to player-response.json");
    
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
