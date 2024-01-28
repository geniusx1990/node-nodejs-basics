import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files", "fileToWrite.txt");

  const writeStream = fs.createWriteStream(route);
  process.stdin.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("Data has been written");
      writeStream.close();
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error(`Error writing to ${route}: ${error.message}`);
      reject(error);
    });
  });
};

await write();