import { type Dep, DEPS, ICONS, INSTALLATION_TEXT } from "../constants";
import { pmx, type ShellExecuted } from "../utils";

const add = async (dep: Dep): Promise<[Dep, ShellExecuted]> => [dep, await pmx("add", "-D", dep)];

export const install = async () => {
  console.info(INSTALLATION_TEXT.get("START"));
  const installations = new Map(await Promise.all(DEPS.map(add)));
  const installed = new Map(installations.entries().filter(([_, output]) => !output.stderr.length)).keys().toArray();
  const uninstalled = new Map(installations.entries().filter(([_, output]) => !!output.stderr.length)).keys().toArray();
  if (installed.length) {
    const success = installed.map((dep) => [ICONS.get("CHECKBOX"), dep].join(" "));
    console.info([INSTALLATION_TEXT.get("SUCCESS"), ...success].join("\n"));
  }
  if (uninstalled.length) {
    const failures = uninstalled.map((dep) => [ICONS.get("CROSS"), dep].join(" "));
    console.error([INSTALLATION_TEXT.get("FAIL"), ...failures].join("\n"));
  }
  console.log("\n");
  return installed;
};
