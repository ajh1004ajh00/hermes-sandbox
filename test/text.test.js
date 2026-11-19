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

test("slugify without maxLength keeps full output", () => {
  assert.equal(slugify("Hello World Again"), "hello-world-again");
  assert.equal(slugify("Hello World Again", undefined), "hello-world-again");
});

test("slugify truncates to shorter limit, keeps equal and longer limits", () => {
  assert.equal(slugify("Hello World", 4), "hell");
  assert.equal(slugify("Hello World", 11), "hello-world");
  assert.equal(slugify("Hello World", 50), "hello-world");
});

test("slugify strips trailing dash left by truncation", () => {
  assert.equal(slugify("Hello World", 6), "hello");
  assert.equal(slugify("a b c", 4), "a-b");
});

test("slugify with maxLength 0 or empty slug returns empty string", () => {
  assert.equal(slugify("Hello", 0), "");
  assert.equal(slugify("  !!  ", 5), "");
  assert.equal(slugify("", 3), "");
});

test("slugify truncates Korean by character", () => {
  assert.equal(slugify("내일 마켓 2026", 2), "내일");
  assert.equal(slugify("내일 마켓 2026", 3), "내일");
  assert.equal(slugify("내일 마켓 2026", 5), "내일-마켓");
});

test("slugify rejects invalid maxLength with RangeError", () => {
  for (const bad of [-1, 1.5, NaN, Infinity, "5", null]) {
    assert.throws(() => slugify("Hello", bad), RangeError);
  }
});
