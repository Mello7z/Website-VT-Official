import fs from "fs";
import https from "https";

function fetchHTML(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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
  const html = await fetchHTML(url);
  
  const keywords = ["lengthSeconds", "approxDurationMs", "itemprop=\"duration\"", "duration", "videoDetails"];
  for (const kw of keywords) {
    const idx = html.indexOf(kw);
    if (idx !== -1) {
      console.log(`Keyword: ${kw} found at index ${idx}`);
      console.log(`Context: ${html.slice(Math.max(0, idx - 100), idx + 200)}`);
      console.log("-----------------------------------------");
    } else {
      console.log(`Keyword: ${kw} NOT found`);
    }
  }
}

main();
