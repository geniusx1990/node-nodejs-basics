import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files", "wrongFilename.txt");
  const finalRoute = path.join(__dirname, "files", "properFilename.md");

  try {
    if (!fs.existsSync(route) || fs.existsSync(finalRoute)) {
      throw new Error("FS operation failed");
    }
    fs.rename(route, finalRoute, (err) => {
      if (err) throw err;
      console.log("Rename complete!");
    });
  } catch (e) {
    console.log(e);
  }

  console.log(route);
};

await rename();