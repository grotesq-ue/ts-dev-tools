import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as PMD from "../pmd";
import { pmx, UNSUPPORTED } from "../pmx";
import * as SHX from "../shx";

const PARAMS: Parameters<typeof pmx> = ["execute", "command"];
const COMMAND = "npx command";

describe("pmx", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns a successful execution", async () => {
    const pmd = spyOn(PMD, "pmd");
    const shx = spyOn(SHX, "shx");
    pmd.mockImplementationOnce(async () => COMMAND);
    shx.mockImplementationOnce(() => ({ stdout: "", stderr: "" }));
    const execution = await pmx(...PARAMS);
    expect(pmd).toBeCalledWith(...PARAMS);
    expect(shx).toBeCalledWith(COMMAND);
    expect(execution).toBeTruthy();
  });

  test("returns a failed execution for unsupported package manager command", async () => {
    const pmd = spyOn(PMD, "pmd");
    const shx = spyOn(SHX, "shx");
    pmd.mockImplementationOnce(async () => undefined);
    const execution = await pmx(...PARAMS);
    expect(pmd).toBeCalledWith(...PARAMS);
    expect(shx).not.toBeCalled();
    expect(execution).toBe(UNSUPPORTED);
  });
});
