import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { permit } from "../permit";

describe("permit", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns true if the user accepts", () => {
    const prompt = spyOn(global, "prompt");
    prompt.mockImplementationOnce(() => null);
    const permitted = permit();
    expect(permitted).toBeTrue();
  });

  test("returns false if the user rejects", () => {
    const prompt = spyOn(global, "prompt");
    prompt.mockImplementationOnce(() => "no");
    const permitted = permit();
    expect(permitted).toBeFalse();
  });
});
