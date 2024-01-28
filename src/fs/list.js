import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files");

  try {
    if (!fs.existsSync(route)) {
      throw new Error("FS operation failed");
    }

    fs.readdir(route, (err, files) => {
      if (err) console.log(err);
      console.table(files);
    });
  } catch (e) {
    console.log(e);
  }
};

await list();