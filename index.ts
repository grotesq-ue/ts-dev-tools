import { app } from "./src/app";

const exec = async () => {
  const code = await app();
  process.exit(code);
};

exec();
