import { type Command } from "package-manager-detector";
import { pmd } from "./pmd";
import { type ShellExecuted, shx } from "./shx";

export const UNSUPPORTED: ShellExecuted = {
  stdout: "",
  stderr: "Command Failed: Unsupported Package Manager",
};

export const pmx = async (command: Command, ...args: string[]) => {
  const instruction = await pmd(command, ...args);
  if (!instruction) return UNSUPPORTED;
  const execution = await shx(instruction);
  return execution;
};
