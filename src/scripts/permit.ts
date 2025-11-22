import { createInterface } from "readline/promises";
import { PERMISSION_REQUEST_TEXT } from "../constants";

export const permit = async () => {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const response = await prompt.question(PERMISSION_REQUEST_TEXT);
  const permitted = !response.length || ["y", "yes"].includes(response);
  console.log("\n");
  return permitted;
};
