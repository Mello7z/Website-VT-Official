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
    console.log("=== Title Tag ===");
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    console.log(titleMatch ? titleMatch[1].trim() : "No title found");
    
    console.log("=== Body Start ===");
    const bodyMatch = html.match(/<body([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      console.log(bodyMatch[1].substring(0, 1000));
    } else {
      console.log("No body found");
      console.log(html.substring(0, 1000));
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
