import { type Command, detect, resolveCommand } from "package-manager-detector";

export const pmd = async (command: Command, ...args: string[]) => {
  const pm = await detect();
  if (pm === null) return undefined;
  const resolved = resolveCommand(pm.agent, command, [...args]);
  if (resolved === null) return undefined;
  return [resolved.command, ...resolved.args].join(" ");
};
