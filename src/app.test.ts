import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { app } from "./app";
import * as scripts from "./scripts";

describe("app", () => {
  afterEach(() => mock.clearAllMocks());

  test("immediately returns exit code 0 if permission is denied", async () => {
    const permit = spyOn(scripts, "permit");
    permit.mockImplementationOnce(async () => false);
    const code = await app();
    expect(code).toBe(0);
  });

  test("skips tool setup and git hook installation if nothing is installed", async () => {
    const permit = spyOn(scripts, "permit");
    const git = spyOn(scripts.init, "git");
    const install = spyOn(scripts, "install");
    const setup = spyOn(scripts, "setup");
    const hook = spyOn(scripts, "hook");
    permit.mockImplementationOnce(async () => true);
    git.mockImplementationOnce(async () => ({ stdout: "", stderr: "" }));
    install.mockImplementationOnce(async () => []);
    const code = await app();
    expect(setup).not.toBeCalled();
    expect(hook).not.toBeCalled();
    expect(code).toBe(0);
  });
});
