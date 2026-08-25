import fs from "fs";

const content = fs.readFileSync("src/App.tsx", "utf-8");
const lines = content.split("\n");
lines.forEach((line, index) => {
  if (line.includes("TRACKS_DATA")) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
