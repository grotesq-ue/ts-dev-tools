import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as SPAWN from "cross-spawn";
import { shx } from "../shx";

const DEFAULT_SPAWN_SYNC_RETURN: ReturnType<typeof SPAWN.sync> = {
  pid: 0,
  output: [],
  stdout: "",
  stderr: "",
  status: null,
  signal: null,
};

describe("shx", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns a shell executed object", () => {
    const spawnSync = spyOn(SPAWN, "sync");
    spawnSync.mockImplementationOnce(() => DEFAULT_SPAWN_SYNC_RETURN as any);
    const { stdout, stderr } = shx("");
    expect(stdout).toBe("");
    expect(stderr).toBe("");
  });
});
