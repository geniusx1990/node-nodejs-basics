import fs from "fs";
import path from "path";

const create = async () => {
  const content = "I am fresh and young";
  const currentFileUrl = import.meta.url;
  const currentFilePath = new URL(currentFileUrl).pathname;
  const currentDir = path.dirname(currentFilePath);
  const filePath = path.join(currentDir, "files", "fresh.txt");

  try {
    if (fs.existsSync(filePath)) {
      throw new Error("FS operation failed");
    }

    fs.writeFile(filePath, content, (err) => {
      if (err) throw err;
      console.log("File created");
    });
  } catch (error) {
    console.error(error.message);
  }
};

await create();