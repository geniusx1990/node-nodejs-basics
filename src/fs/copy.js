import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files");
  const finalRoute = path.join(__dirname, "files_copy");

  try {
    if (!fs.existsSync(route) || fs.existsSync(finalRoute)) {
      throw new Error("FS operation failed");
    }
    fs.mkdir(finalRoute, (err) => {
      if (err) {
        throw err;
      }
    });
    const files = await fs.promises.readdir(route);

    for (const file of files) {
      const sourcePath = path.join(route, file);
      const destinationPath = path.join(finalRoute, file);

      await fs.promises.copyFile(sourcePath, destinationPath);
      console.log(`Copied: ${file}`);
    }
  } catch (e) {
    console.log(e);
  }
};

await copy();
