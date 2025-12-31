export const DEPS = ["dprint", "oxlint", "lefthook"] as const;

export type Dep = typeof DEPS[number];

export const JOBS = new Map([
  ["oxlint", { run: "oxlint --fix {staged_files}", stage_fixed: true }],
  ["dprint", { run: "dprint fmt --allow-no-files {staged_files}", stage_fixed: true }],
]) satisfies Map<Dep, object>;

export const LEFTHOOK_CONFIG_PATH = "./lefthook.yml";
