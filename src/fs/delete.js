import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const finalRoute = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    if (!fs.existsSync(finalRoute)) {
      throw new Error("FS operation failed");
    }
    fs.unlink(finalRoute, (err) => {
      if (err) throw err;
      console.log("file fileToRemove.txt was deleted");
    });
  } catch (e) {
    console.log(e);
  }
};

await remove();