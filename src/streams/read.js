import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files", "fileToRead.txt");

  const readStream = fs.createReadStream(route);
  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
};

await read();