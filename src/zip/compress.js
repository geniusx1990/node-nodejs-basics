import fs from "fs";
import zlib from "zlib";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const route = path.join(__dirname, "files", "fileToCompress.txt");
  const routeToCompress = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(route);
  const writeStream = fs.createWriteStream(routeToCompress);

  const gzip = zlib.createGzip();

  return new Promise((resolve, reject) => {
    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("Compression complete");
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error(`Error during compression: ${error.message}`);
      reject(error);
    });
  });
};

await compress();