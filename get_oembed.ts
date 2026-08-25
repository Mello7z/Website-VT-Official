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
          resolve({ error: "Failed to parse JSON" });
        }
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  for (const item of videoIds) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${item.id}&format=json`;
    try {
      const info = await fetchJSON(url);
      console.log(`${item.name} oEmbed Title: "${info.title}" by "${info.author_name}"`);
    } catch (e: any) {
      console.error(`Error for ${item.name}:`, e.message);
    }
  }
}

main();
