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
    
    // Look for ytInitialPlayerResponse = {...}; or var ytInitialPlayerResponse = {...};
    const match = html.match(/ytInitialPlayerResponse\s*=\s*({[\s\S]*?});/);
    if (match) {
      console.log("Successfully extracted ytInitialPlayerResponse!");
      const jsonStr = match[1];
      try {
        const obj = JSON.parse(jsonStr);
        console.log("Parsed keys:", Object.keys(obj));
        
        if (obj.playabilityStatus) {
          console.log("Playability Status:", obj.playabilityStatus);
        }
        if (obj.videoDetails) {
          console.log("Video Details keys:", Object.keys(obj.videoDetails));
          console.log("lengthSeconds:", obj.videoDetails.lengthSeconds);
          console.log("title:", obj.videoDetails.title);
          console.log("author:", obj.videoDetails.author);
        } else {
          console.log("No videoDetails object found!");
        }
      } catch (e: any) {
        console.log("Failed to parse JSON string. Length:", jsonStr.length);
        console.log("Snippet from start:", jsonStr.substring(0, 500));
        console.log("Snippet from end:", jsonStr.substring(jsonStr.length - 500));
      }
    } else {
      console.log("ytInitialPlayerResponse not found matching pattern.");
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
