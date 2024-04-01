import { test,expect } from "@jest/globals";
import { sortPages } from "./report";

test("sort", () => {
  const input = {
    "www.wagslane.dev//tags":64,
    "www.wagslane.dev":3,
  };
  const expected = [
    ["www.wagslane.dev//tags", 64],
    ["www.wagslane.dev", 3]
  ];
  const actual = sortPages(input);
  expect(actual).toEqual(expected);
});
