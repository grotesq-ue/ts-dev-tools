import type { Dep } from "./tools";

export const DEP_ICONS = new Map<string, Dep>([
  ["📜", "dprint"],
  ["🔍", "oxlint"],
  ["🥊", "lefthook"],
]);

export const ICONS = new Map(
  [
    ["ROAD_BLOCK", "🚧"],
    ["QUESTION_MARK", "❓"],
    ["HOUR_GLASS", "⏳"],
    ["RED_BALL", "🔴"],
    ["GREEN_BALL", "🟢"],
    ["CHECKBOX", "✅"],
    ["CROSS", "❌"],
  ] as const,
);
