import https from "https";

const videoIds = [
  { name: "DINHEIRO", id: "N-cl1rcye1k" },
  { name: "FUTURO", id: "AMyy1nZ-LD4" },
  { name: "LEAN NO COPO", id: "Ll1QZ2f_jKk" },
  { name: "SEM AMOR", id: "SUFAN2uq9Gk" },
  { name: "WAVE", id: "Q6lYQuXc41M" },
];

function fetchJSON(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: "Failed to parse JSON", raw: data });
        }
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  for (const item of videoIds) {
    const songlinkUrl = `https://api.song.link/v1-alpha.1/links?url=https://www.youtube.com/watch?v=${item.id}&userCountry=US`;
    try {
      const result = await fetchJSON(songlinkUrl);
      console.log(`=== ${item.name} (${item.id}) ===`);
      if (result.entitiesByUniqueId) {
        // Find if there is any entity with duration details
        const entityKeys = Object.keys(result.entitiesByUniqueId);
        let foundDuration = false;
        for (const key of entityKeys) {
          const entity = result.entitiesByUniqueId[key];
          // Check if spotify or other platforms have it
          if (entity.durationS || entity.durationSeconds) {
            const dur = entity.durationS || entity.durationSeconds;
            const mins = Math.floor(dur / 60);
            const secs = dur % 60;
            const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
            console.log(`Found entity (${entity.platforms[0]}): ${formatted} (${dur}s)`);
            foundDuration = true;
          }
        }
        if (!foundDuration) {
          console.log("No duration found in entities.");
        }
      } else {
        console.log("No entitiesByUniqueId found in result:", result);
      }
    } catch (e: any) {
      console.error(`Error for ${item.name}:`, e.message);
    }
  }
}

main();
