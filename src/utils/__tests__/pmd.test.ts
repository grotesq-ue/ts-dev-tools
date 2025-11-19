import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as PMD from "package-manager-detector";
import { pmd } from "../pmd";

const detect = spyOn(PMD, "detect");
const resolveCommand = spyOn(PMD, "resolveCommand");

const PARAMS: Parameters<typeof pmd> = ["execute", "command"];

describe("pmd", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns a command string", async () => {
    detect.mockResolvedValueOnce({ name: "npm", agent: "npm" });
    const command = await pmd(...PARAMS);
    expect(command).toBe("npx command");
  });

  test("returns undefined when package manager is undetected", async () => {
    detect.mockResolvedValueOnce(null);
    const command = await pmd(...PARAMS);
    expect(command).toBe(undefined);
  });

  test("returns undefined when command is unresolved", async () => {
    detect.mockResolvedValueOnce({ name: "npm", agent: "npm" });
    resolveCommand.mockReturnValueOnce(null);
    const command = await pmd(...PARAMS);
    expect(command).toBe(undefined);
  });
});
