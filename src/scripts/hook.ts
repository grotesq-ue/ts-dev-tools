import * as yaml from "js-yaml";
import { writeFile } from "node:fs/promises";
import { type Dep, GIT_HOOK_TEXT, JOBS, LEFTHOOK_CONFIG_PATH } from "../constants";
import { pmd } from "../utils";
import { init } from "./setup";

export const hook = async (deps: Dep[]) => {
  console.info(GIT_HOOK_TEXT.get("START"));
  const tsc = { run: await pmd("execute-local", "tsc") };
  const checkers = await Promise.all(
    JOBS.entries().filter(([key]) => deps.includes(key)).map(async ([_, value]) => ({
      ...value,
      run: await pmd("execute", value.run),
    })).toArray(),
  );
  const commands = { "pre-commit": { jobs: [tsc, ...checkers] } };
  const raw = yaml.dump(commands);
  try {
    await writeFile(LEFTHOOK_CONFIG_PATH, raw);
    const initialization = await init.lefthook();
    const display = initialization.stderr.length ? console.error : console.info;
    const result = initialization.stderr.length ? initialization.stderr : initialization.stdout;
    display(result);
  } catch {
    console.error([GIT_HOOK_TEXT.get("FAIL"), LEFTHOOK_CONFIG_PATH].join(" "));
  }
};
