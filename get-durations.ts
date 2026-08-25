import fs from "fs";
import getMp3Duration from "get-mp3-duration";

const files = [
  { name: "DINHEIRO", path: "./public/Musicas/DINHEIRO.mp3" },
  { name: "FUTURO", path: "./public/imagens-inicio/Imagens-Musicas/FUTURO/FUTURO-Part1.mp3" },
  { name: "LEAN NO COPO", path: "./public/Musicas/LEAN NO COPO.mp3" },
  { name: "SEM AMOR", path: "./public/Musicas/SEM AMOR.mp3" },
  { name: "WAVE", path: "./public/Musicas/WAVE.mp3" },
];

for (const file of files) {
  try {
    const buffer = fs.readFileSync(file.path);
    const durationMs = getMp3Duration(buffer);
    const totalSecs = Math.floor(durationMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    console.log(`${file.name}: ${formatted} (${totalSecs}s)`);
  } catch (e: any) {
    console.error(`Error reading ${file.name}:`, e.message);
  }
}
