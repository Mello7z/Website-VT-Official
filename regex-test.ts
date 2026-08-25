import https from "https";

const videoId = "N-cl1rcye1k";

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
    const idx = html.indexOf("ytInitialPlayerResponse");
    if (idx !== -1) {
      console.log("ytInitialPlayerResponse found!");
      const snippet = html.substring(idx, idx + 2000);
      console.log("Snippet around player response:");
      console.log(snippet);
    } else {
      console.log("ytInitialPlayerResponse not found.");
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
