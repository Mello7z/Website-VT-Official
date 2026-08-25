import https from "https";

const videoIds: { [key: string]: string } = {
  DINHEIRO: "N-cl1rcye1k",
  FUTURO: "AMyy1nZ-LD4",
  LEAN_NO_COPO: "Ll1QZ2f_jKk",
  SEM_AMOR: "SUFAN2uq9Gk",
  WAVE: "Q6lYQuXc41M",
};

function fetchInnertube(videoId: string, clientName: string, clientVersion: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      videoId: videoId,
      context: {
        client: {
          clientName: clientName,
          clientVersion: clientVersion,
        }
      }
    });

    const req = https.request(
      "https://www.youtube.com/youtubei/v1/player",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ error: "Invalid JSON response", raw: data.substring(0, 500) });
          }
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  const clients = [
    { name: "ANDROID", version: "17.30.35" },
    { name: "TVHTML5", version: "7.20230405.01.00" },
    { name: "MWEB", version: "2.20240210.01.00" },
  ];

  for (const [trackName, id] of Object.entries(videoIds)) {
    console.log(`\n================== ${trackName} (${id}) ==================`);
    let success = false;
    for (const client of clients) {
      console.log(`Trying client ${client.name}...`);
      try {
        const response = await fetchInnertube(id, client.name, client.version);
        if (response.playabilityStatus && response.playabilityStatus.status === "OK") {
          const videoDetails = response.videoDetails || {};
          const lengthSeconds = videoDetails.lengthSeconds;
          if (lengthSeconds) {
            const totalSecs = parseInt(lengthSeconds, 10);
            const mins = Math.floor(totalSecs / 60);
            const secs = totalSecs % 60;
            const durationStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
            console.log(`SUCCESS [${client.name}]: Duration is ${durationStr} (${totalSecs}s)`);
            success = true;
            break;
          }
        } else {
          console.log(`  Fail [${client.name}]: ${response.playabilityStatus?.status} - ${response.playabilityStatus?.reason}`);
        }
      } catch (e: any) {
        console.error(`  Error [${client.name}]:`, e.message);
      }
    }
  }
}

main();
