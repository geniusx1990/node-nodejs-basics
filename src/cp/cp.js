import cp from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = path.join(__dirname, "files", "script.js");

  const worker = cp.fork(route, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);