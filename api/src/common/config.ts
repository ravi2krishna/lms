import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

export const getConfig = (key: string) => {
  if (!key) {
    throw new Error("Config key can't be empty.");
  }

  return process.env[key];
};