import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeSpaces, slugify } from "../src/text.js";

test("normalizeSpaces trims and collapses whitespace", () => {
  assert.equal(normalizeSpaces("  a   b\t\nc  "), "a b c");
});

test("normalizeSpaces rejects non-strings", () => {
  assert.throws(() => normalizeSpaces(42), TypeError);
});

test("slugify keeps Korean and joins words with dashes", () => {
  assert.equal(slugify("  Hello,  World!  "), "hello-world");
  assert.equal(slugify("내일 마켓 2026"), "내일-마켓-2026");
});
