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
  for (const item of videoIds) {
    const query = item.id === "N-cl1rcye1k" ? encodeURIComponent("VT Dinheiro em espécie") : item.id;
    const url = `https://www.youtube.com/results?search_query=${query}`;
    try {
      const html = await fetchHTML(url);
      
      // Look for ytInitialData inside script tags
      const marker = "var ytInitialData = ";
      const idx = html.indexOf(marker);
      if (idx !== -1) {
        const start = idx + marker.length;
        // Balance brackets to extract the full JSON object
        let braceCount = 0;
        let endIdx = -1;
        for (let i = start; i < html.length; i++) {
          if (html[i] === "{") braceCount++;
          else if (html[i] === "}") {
            braceCount--;
            if (braceCount === 0) {
              endIdx = i + 1;
              break;
            }
          }
        }
        
        if (endIdx !== -1) {
          const jsonStr = html.substring(start, endIdx);
          const data = JSON.parse(jsonStr);
          
          // Let's recursively search the parsed JSON object for duration information.
          // In YouTube's search results, video items contain videoId and lengthText (simpleText) or lengthSeconds
          const results: string[] = [];
          
          function searchObj(obj: any) {
            if (!obj || typeof obj !== "object") return;
            
            if (obj.videoId === item.id) {
              // We found the video node! Let's check for duration fields.
              if (obj.lengthText && obj.lengthText.simpleText) {
                results.push(`lengthText: ${obj.lengthText.simpleText}`);
              }
              if (obj.thumbnailOverlays) {
                for (const overlay of obj.thumbnailOverlays) {
                  if (overlay.thumbnailOverlayTimeStatusRenderer && overlay.thumbnailOverlayTimeStatusRenderer.text) {
                    results.push(`thumbnailOverlayText: ${overlay.thumbnailOverlayTimeStatusRenderer.text.simpleText}`);
                  }
                }
              }
            }
            
            for (const key of Object.keys(obj)) {
              searchObj(obj[key]);
            }
          }
          
          searchObj(data);
          
          if (results.length > 0) {
            console.log(`SUCCESS for ${item.name} (${item.id}):`, results);
          } else {
            console.log(`FOUND ytInitialData for ${item.name} but no video node with matching videoId found.`);
          }
        } else {
          console.log(`Could not find balanced JSON for ${item.name}`);
        }
      } else {
        console.log(`Could not find ytInitialData for ${item.name}`);
      }
    } catch (e: any) {
      console.error(`Error for ${item.name}:`, e.message);
    }
  }
}

main();
