import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as CP from "node:child_process";
import { shx } from "../shx";

const DEFAULT_SPAWN_SYNC_RETURN: CP.SpawnSyncReturns<string> | CP.SpawnSyncReturns<NonSharedBuffer> = {
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
    const spawnSync = spyOn(CP, "spawnSync");
    spawnSync.mockImplementationOnce(() => DEFAULT_SPAWN_SYNC_RETURN as any);
    const { stdout, stderr } = shx("");
    expect(stdout).toBe("");
    expect(stderr).toBe("");
  });
});
