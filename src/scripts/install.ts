import { type Dep, DEPS, ICONS, INSTALLATION_TEXT } from "../constants";
import { pmx } from "../utils";

export const install = async () => {
  console.info(INSTALLATION_TEXT.get("START"));
  const installed: Dep[] = [];
  const uninstalled: Dep[] = [];
  for (const dep of DEPS) {
    const { stderr } = await pmx("add", "-D", dep);
    if (stderr.length) uninstalled.push(dep);
    else installed.push(dep);
  }
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
