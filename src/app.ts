import { TITLE } from "./constants";
import { hook, init, install, permit, setup } from "./scripts";

export const app = async () => {
  console.log(TITLE);
  const permitted = await permit();
  if (!permitted) return 0;
  const reposited = init.git();
  const installed = await install();
  if (installed.length) await setup(installed);
  if (installed.length && !reposited.stderr.length) await hook(installed);
  return 0;
};
