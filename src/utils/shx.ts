import { spawnSync } from "node:child_process";

export type ShellExecuted = { stdout: string; stderr: string };

export const shx = (command: string): ShellExecuted => {
  const [executable = "", ...args] = command.split(" ");
  const spawned = spawnSync(executable, [...args], { stdio: "inherit" });
  return {
    stdout: spawned.stdout ? spawned.stdout.toString() : "",
    stderr: spawned.stderr ? spawned.stderr.toString() : "",
  };
};
