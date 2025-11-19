import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as Utils from "../../utils";
import { init, setup } from "../setup";

const shx = spyOn(Utils, "shx");
const oxlint = spyOn(init, "oxlint");
const info = spyOn(console, "info");
const error = spyOn(console, "error");

describe("setup", () => {
  afterEach(() => mock.clearAllMocks());

  test("displays initialization output of git repository", async () => {
    shx.mockImplementationOnce(async () => ({ stdout: "SUCCESS", stderr: "" }));
    const { stdout, stderr } = await init.git();
    expect(stdout.length).toBeTruthy();
    expect(stderr.length).toBeFalsy();
    expect(info).toBeCalled();
  });

  test("displays initialization error of git repository", async () => {
    shx.mockImplementationOnce(async () => ({ stdout: "", stderr: "FAILED" }));
    const { stdout, stderr } = await init.git();
    expect(stderr.length).toBeTruthy();
    expect(stdout.length).toBeFalsy();
    expect(error).toBeCalled();
  });

  test("displays initialization output for each installed dependencies", async () => {
    oxlint.mockImplementationOnce(async () => ({ stdout: "", stderr: "" }));
    await setup(["oxlint"]);
    expect(info).toBeCalled();
  });

  test("displays initialization error for each installed dependencies", async () => {
    oxlint.mockImplementationOnce(async () => ({ stdout: "", stderr: "ERROR" }));
    await setup(["oxlint"]);
    expect(error).toBeCalled();
  });
});
