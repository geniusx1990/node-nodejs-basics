const parseEnv = () => {
  for (const value in process.env) {
    if (value.includes("RSS_")) {
      console.log(`${value}=${process.env[value]}`);
    }
  }
};

parseEnv();