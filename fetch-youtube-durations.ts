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

// Parse ISO 8601 duration like "PT3M20S" or "PT2M45S" to "MM:SS"
function parseISO8601Duration(iso: string): string {
  const match = iso.match(/PT(?:(\handleM)M)?(?:(\handleS)S)?/);
  const minutes = match && match[1] ? parseInt(match[1], 10) : 0;
  const seconds = match && match[2] ? parseInt(match[2], 10) : 0;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

async function main() {
  for (const video of videos) {
    const url = `https://www.youtube.com/watch?v=${video.id}`;
    try {
      const html = await fetchHTML(url);
      
      // Look for <meta itemprop="duration" content="PT3M42S">
      const metaMatch = html.match(/<meta\s+itemprop="duration"\s+content="([^"]+)"/i) || 
                        html.match(/itemprop="duration"\s+content="([^"]+)"/i);
      if (metaMatch && metaMatch[1]) {
        const iso = metaMatch[1];
        // Parse ISO 8601
        const reg = /PT(?:(\d+)M)?(?:(\d+)S)?/;
        const m = iso.match(reg);
        const mins = m && m[1] ? parseInt(m[1], 10) : 0;
        const secs = m && m[2] ? parseInt(m[2], 10) : 0;
        const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        console.log(`${video.name} (${video.id}): ${durationStr} (via itemprop="${iso}")`);
        continue;
      }

      // Fallback: search for approxDurationMs
      const approxMatch = html.match(/"approxDurationMs"\s*:\s*"(\d+)"/);
      if (approxMatch && approxMatch[1]) {
        const ms = parseInt(approxMatch[1], 10);
        const totalSecs = Math.floor(ms / 1000);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        console.log(`${video.name} (${video.id}): ${durationStr} (via approxDurationMs=${ms})`);
        continue;
      }

      // Check if we can find video details duration
      const lenSecsMatch = html.match(/"lengthSeconds"\s*:\s*"(\d+)"/);
      if (lenSecsMatch && lenSecsMatch[1]) {
        const totalSecs = parseInt(lenSecsMatch[1], 10);
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        console.log(`${video.name} (${video.id}): ${durationStr} (via lengthSeconds=${totalSecs})`);
        continue;
      }

      console.log(`${video.name} (${video.id}): Could not find duration in HTML. HTML length: ${html.length}`);
    } catch (e: any) {
      console.error(`Error fetching ${video.name}:`, e.message);
    }
  }
}

main();
