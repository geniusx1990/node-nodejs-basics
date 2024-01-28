import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

  const hash = crypto.createHash("sha256");
  const reader = fs.createReadStream(filePath);

  reader.on("data", function (chunk) {
    hash.update(chunk);
  });

  reader.on("end", function () {
    const resultHash = hash.digest("hex");
    console.log(`SHA256 Hash: ${resultHash}`);
  });

  reader.on("error", function (error) {
    console.error(`Error reading file: ${error.message}`);
  });
};

await calculateHash();