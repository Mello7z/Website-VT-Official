import https from "https";

const videoId = "Ll1QZ2f_jKk"; // LEAN NO COPO

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
  const songlinkUrl = `https://api.song.link/v1-alpha.1/links?url=https://www.youtube.com/watch?v=${videoId}&userCountry=US`;
  try {
    const result = await fetchJSON(songlinkUrl);
    console.log(JSON.stringify(result, null, 2));
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

main();
