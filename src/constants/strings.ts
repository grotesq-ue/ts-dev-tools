import info from "../../package.json";

import { DEP_ICONS, ICONS } from "./icons";

export const TITLE = ["\n", info.name, "\n"].join("");

const NOTICE_TEXT = "A git repository will be initiated and the following dependencies will be installed:";

const CONFIRMATION_TEXT = "Would you like to proceed? ([y]es / [n]o):";

export const PERMISSION_REQUEST_TEXT = [
  [ICONS.get("ROAD_BLOCK"), NOTICE_TEXT].join(" "),
  ...DEP_ICONS.entries().map(value => [" ", ...value].join(" ")),
  [ICONS.get("QUESTION_MARK"), CONFIRMATION_TEXT].join(" "),
].join("\n");

export const GIT_INIT_TEXT = new Map(
  [
    ["START", [ICONS.get("HOUR_GLASS"), "Initialization git repository ..."].join(" ")],
    ["SUCCESS", [ICONS.get("GREEN_BALL"), "Successful git repository initialization!\n"].join(" ")],
    ["FAIL", [ICONS.get("RED_BALL"), "Failed git repository initialization!\n"].join(" ")],
  ] as const,
);

export const INSTALLATION_TEXT = new Map(
  [
    ["START", [ICONS.get("HOUR_GLASS"), "Installing dependencies ...\n"].join(" ")],
    ["SUCCESS", [ICONS.get("GREEN_BALL"), "Successful Installation(s):"].join(" ")],
    ["FAIL", [ICONS.get("RED_BALL"), "Failed Installation(s):"].join(" ")],
  ] as const,
);

export const GIT_HOOK_TEXT = new Map(
  [
    ["START", [ICONS.get("HOUR_GLASS"), "Setting up git hooks ...\n"].join(" ")],
    ["FAIL", [ICONS.get("RED_BALL"), "Failed to initialize git hooks in"].join(" ")],
  ] as const,
);

export const SETUP_START_TEXT = [ICONS.get("HOUR_GLASS"), "Setting up"].join(" ");
