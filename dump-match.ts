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
    
    const terms = ["approxDurationMs", "durationMs", "lengthSeconds", "length_seconds", "duration", "duration_seconds"];
    for (const term of terms) {
      const idx = html.indexOf(term);
      if (idx !== -1) {
        console.log(`FOUND "${term}" at index ${idx}!`);
        console.log("Snippet:", html.substring(idx - 50, idx + 100));
      } else {
        console.log(`Could not find "${term}"`);
      }
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
