import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as Utils from "../../utils";
import { install } from "../install";

describe("install", () => {
  afterEach(() => {
    mock.restore();
    mock.clearAllMocks();
  });

  test("returns with an array filled with installed dependencies upon successful installation", async () => {
    const pmx = spyOn(Utils, "pmx");
    pmx.mockImplementation(async () => ({ stdout: "", stderr: "" } satisfies Utils.ShellExecuted));
    const installed = await install();
    expect(installed.length).toBeGreaterThan(0);
  });

  test("returns with an array filled with uninstalled dependencies upon failed installation", async () => {
    const pmx = spyOn(Utils, "pmx");
    pmx.mockImplementation(async () => ({ stdout: "", stderr: "ERROR" } satisfies Utils.ShellExecuted));
    const installed = await install();
    expect(installed.length).toBe(0);
  });
});
