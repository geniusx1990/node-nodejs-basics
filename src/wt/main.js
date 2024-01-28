import os from "os";
import { Worker } from "worker_threads";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const route = path.join(__dirname, "worker.js");
  const number = 10;
  const result = [];
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    const index = i;

    result[index] = new Promise((resolve, reject) => {
      const worker = new Worker(route, {
        workerData: number + index,
      });

      worker.on("message", (value) => {
        resolve({ status: "resolved", data: value });
      });

      worker.on("error", () => {
        reject({
          status: "error",
          data: null,
        });
      });
    });
  }
  const data = await Promise.all(result);
  console.log(data);
};

await performCalculations();