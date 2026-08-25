import https from "https";

const videos = [
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
  for (const video of videos) {
    const url = `https://www.youtube.com/watch?v=${video.id}`;
    try {
      const html = await fetchHTML(url);
      
      // Let's search using a regex that handles backslash escapes e.g. "lengthSeconds\":\"123\"" or "lengthSeconds":"123"
      const lengthSecsRegex = /lengthSeconds\\*"\s*:\s*\\*"\s*(\d+)\s*\\*"/i;
      const match = html.match(lengthSecsRegex);
      
      if (match && match[1]) {
        const totalSecs = parseInt(match[1], 10);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        console.log(`${video.name} (${video.id}): ${durationStr} (seconds: ${totalSecs})`);
        continue;
      }
      
      // Let's also try approxDurationMs with escapes
      const approxRegex = /approxDurationMs\\*"\s*:\s*\\*"\s*(\d+)\s*\\*"/i;
      const matchApprox = html.match(approxRegex);
      if (matchApprox && matchApprox[1]) {
        const ms = parseInt(matchApprox[1], 10);
        const totalSecs = Math.floor(ms / 1000);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        console.log(`${video.name} (${video.id}): ${durationStr} (via approxDurationMs: ${ms})`);
        continue;
      }

      // Check for <meta itemprop="duration" content="PT...S">
      const metaMatch = html.match(/itemprop\\*"\s*:\s*\\*"\s*duration\\*"\s*,\s*\\*"\s*content\\*"\s*:\s*\\*"\s*([^"\\]+)/i) ||
                        html.match(/itemprop="duration"\s+content="([^"]+)"/i) ||
                        html.match(/<meta[^>]*itemprop="duration"[^>]*content="([^"]+)"/i) ||
                        html.match(/content="([^"]+)"[^>]*itemprop="duration"/i);
      if (metaMatch && metaMatch[1]) {
        console.log(`${video.name} (${video.id}): meta duration matches ${metaMatch[1]}`);
        continue;
      }

      // Let's search for "lengthSeconds" as plain substring and log surroundings
      const idx = html.indexOf("lengthSeconds");
      if (idx !== -1) {
        console.log(`${video.name} (${video.id}): Found lengthSeconds at index ${idx}. Substring:`);
        console.log(html.substring(idx, idx + 100));
      } else {
        console.log(`${video.name} (${video.id}): Could not find lengthSeconds at all.`);
      }
    } catch (e: any) {
      console.error(`Error fetching ${video.name}:`, e.message);
    }
  }
}

main();
