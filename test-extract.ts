import https from "https";

const videoId = "N-cl1rcye1k"; // DINHEIRO

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
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    const html = await fetchHTML(url);
    const playerResponsePattern = /ytInitialPlayerResponse\s*=\s*({[\s\S]*?});/i;
    const match = html.match(playerResponsePattern);
    if (match) {
      const jsonStr = match[1];
      const parsed = JSON.parse(jsonStr);
      console.log("Top-level keys:", Object.keys(parsed));
      if (parsed.videoDetails) {
        console.log("videoDetails keys:", Object.keys(parsed.videoDetails));
        console.log("Title:", parsed.videoDetails.title);
        console.log("Duration (seconds):", parsed.videoDetails.lengthSeconds);
        console.log("Author:", parsed.videoDetails.author);
      } else {
        console.log("No videoDetails property found.");
        if (parsed.playabilityStatus) {
          console.log("playabilityStatus:", parsed.playabilityStatus);
        }
      }
    } else {
      console.log("ytInitialPlayerResponse not found in HTML!");
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
