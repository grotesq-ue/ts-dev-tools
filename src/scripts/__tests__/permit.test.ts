import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as RL from "readline/promises";
import { permit } from "../permit";

describe("permit", () => {
  afterEach(() => mock.clearAllMocks());

  test("returns true if the user accepts", async () => {
    const createInterface = spyOn(RL, "createInterface");
    createInterface.mockImplementationOnce(() => ({ question: async () => "" } as unknown as RL.Interface));
    const permitted = await permit();
    expect(permitted).toBeTrue();
  });

  test("returns false if the user rejects", async () => {
    const createInterface = spyOn(RL, "createInterface");
    createInterface.mockImplementationOnce(() => ({ question: async () => "no" } as unknown as RL.Interface));
    const permitted = await permit();
    expect(permitted).toBeFalse();
  });
});
