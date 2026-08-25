import https from "https";

const videoIds = [
  { name: "DINHEIRO", id: "N-cl1rcye1k" },
  { name: "FUTURO", id: "AMyy1nZ-LD4" },
  { name: "LEAN NO COPO", id: "Ll1QZ2f_jKk" },
  { name: "SEM AMOR", id: "SUFAN2uq9Gk" },
  { name: "WAVE", id: "Q6lYQuXc41M" },
];

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
  const item = videoIds[0]; // just test with DINHEIRO
  const url = `https://www.youtube.com/results?search_query=${item.id}`;
  try {
    const html = await fetchHTML(url);
    const idIdx = html.indexOf(item.id);
    if (idIdx !== -1) {
      const window = html.substring(idIdx - 100, idIdx + 1500);
      console.log(`=== Snippet for ${item.name} ===`);
      console.log(window);
    } else {
      console.log("Video ID not found in results page.");
    }
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
