import { Transform } from "stream";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().split("").reverse().join("") + `\n`);
      callback();
    },
  });

  return new Promise((resolve, reject) => {
    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    reverseTransform.on("finish", () => {
      console.log("Transformation complete");
      resolve();
    });

    reverseTransform.on("error", (error) => {
      console.error(`Error during transformation: ${error.message}`);
      reject(error);
    });
  });
};

await transform();