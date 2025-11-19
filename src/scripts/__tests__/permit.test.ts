import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { permit } from "../permit";

const prompt = spyOn(global, "prompt");

describe("permit", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns true if the user accepts", () => {
    prompt.mockReturnValueOnce(null);
    const permitted = permit();
    expect(permitted).toBeTrue();
  });

  test("returns false if the user rejects", () => {
    prompt.mockReturnValueOnce("no");
    const permitted = permit();
    expect(permitted).toBeFalse();
  });
});
