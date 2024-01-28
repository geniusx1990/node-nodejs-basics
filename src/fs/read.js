import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files", "fileToRead.txt");

  try {
    if (!fs.existsSync(route)) {
      throw new Error("FS operation failed");
    }

    fs.readFile(route, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
  } catch (e) {
    console.log(e);
  }
};

await read();