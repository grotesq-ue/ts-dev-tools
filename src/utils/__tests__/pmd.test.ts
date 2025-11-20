import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as PMD from "package-manager-detector";
import { pmd } from "../pmd";

const PARAMS: Parameters<typeof pmd> = ["execute", "command"];

describe("pmd", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns a command string", async () => {
    const detect = spyOn(PMD, "detect");
    detect.mockImplementationOnce(async () => ({ name: "npm", agent: "npm" }));
    const command = await pmd(...PARAMS);
    expect(command).toBe("npx command");
  });

  test("returns undefined when package manager is undetected", async () => {
    const detect = spyOn(PMD, "detect");
    detect.mockImplementationOnce(async () => null);
    const command = await pmd(...PARAMS);
    expect(command).toBe(undefined);
  });

  test("returns undefined when command is unresolved", async () => {
    const detect = spyOn(PMD, "detect");
    const resolveCommand = spyOn(PMD, "resolveCommand");
    detect.mockImplementationOnce(async () => ({ name: "npm", agent: "npm" }));
    resolveCommand.mockImplementationOnce(() => null);
    const command = await pmd(...PARAMS);
    expect(command).toBe(undefined);
  });
});
