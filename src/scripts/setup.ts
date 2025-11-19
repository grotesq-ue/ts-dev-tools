import { type Dep, GIT_INIT_TEXT, SETUP_START_TEXT } from "../constants";
import { pmx, shx } from "../utils";

const dprint = async () => await pmx("execute", "dprint", "init");

const lefthook = async () => await pmx("execute", "lefthook", "install");

const oxlint = async () => await pmx("execute", "oxlint", "--init");

const git = async () => {
  console.info(GIT_INIT_TEXT.get("START"));
  const execution = await shx("git init");
  const result = GIT_INIT_TEXT.get(execution.stderr.length ? "FAIL" : "SUCCESS");
  const display = execution.stderr.length ? console.error : console.info;
  display(result);
  return execution;
};

export const init = { dprint, git, oxlint, lefthook } as const;

export const setup = async (deps: Dep[]) => {
  for (const dep of deps.filter((value) => !(value === "lefthook"))) {
    console.info([SETUP_START_TEXT, dep, "...\n"].join(" "));
    const execution = await init[dep]();
    if (execution.stderr.length) console.error(execution.stderr);
    else console.info(execution.stdout);
  }
};
