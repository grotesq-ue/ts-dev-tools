import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as yaml from "js-yaml";
import * as fs from "node:fs/promises";
import { hook } from "../hook";
import { init } from "../setup";

const info = spyOn(console, "info");
const error = spyOn(console, "error");

describe("hook", () => {
  afterEach(() => mock.clearAllMocks());

  test("displays git hook installation output", async () => {
    const lefthook = spyOn(init, "lefthook");
    const dump = spyOn(yaml, "dump");
    const write = spyOn(fs, "writeFile");
    lefthook.mockImplementationOnce(async () => ({ stdout: "SUCCESS", stderr: "" }));
    dump.mockImplementationOnce(() => "WRITTEN");
    write.mockImplementationOnce(async () => undefined);
    await hook(["oxlint"]);
    expect(info).toBeCalled();
  });

  test("displays git hook installation error when unable to write lefthook.yml file", async () => {
    const lefthook = spyOn(init, "lefthook");
    const dump = spyOn(yaml, "dump");
    const write = spyOn(fs, "writeFile");
    lefthook.mockImplementationOnce(async () => ({ stdout: "SUCCESS", stderr: "" }));
    dump.mockImplementationOnce(() => "WRITTEN");
    write.mockImplementationOnce(async () => {
      throw new Error("File Write Error");
    });
    await hook(["oxlint"]);
    expect(error).toBeCalled();
  });
});
