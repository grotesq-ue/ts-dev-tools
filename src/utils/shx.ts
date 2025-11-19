import { spawn } from "node:child_process";

export type ShellExecuted = { stdout: string; stderr: string };

export const shx = async (command: string): Promise<ShellExecuted> =>
  new Promise((resolve) => {
    const [executable = "", ...args] = command.split(" ");
    const spawned = spawn(executable, [...args], { stdio: "inherit" });
    spawned.on("error", (error) =>
      resolve({
        stdout: "",
        stderr: `Command failed: ${error.message}`,
      }));
    spawned.on("close", (code) =>
      resolve({
        stdout: code ? "" : `Command executed: ${command}`,
        stderr: code ? `Command failed: ${command}` : "",
      }));
  });
