import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const route = path.join(__dirname, "files", "archive.gz");
  const routeDecompress = path.join(__dirname, "files", "fileToCompress.txt");

  const readStream = fs.createReadStream(route);
  const writeStream = fs.createWriteStream(routeDecompress);

  const gunzip = zlib.createGunzip();

  return new Promise((resolve, reject) => {
    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("Decompression complete");
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error(`Error during decompression: ${error.message}`);
      reject(error);
    });
  });
};

await decompress();