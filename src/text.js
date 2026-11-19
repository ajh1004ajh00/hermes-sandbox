// 파이프라인 검증용 작은 유틸리티. 에이전트가 기능을 추가하고 테스트를 늘려 가는 대상이다.

/** 앞뒤 공백을 지우고 연속 공백을 하나로 줄인다. */
export function normalizeSpaces(input) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  return input.trim().replace(/\s+/g, " ");
}

/**
 * 문자열을 URL에 쓰기 좋은 slug로 바꾼다. 한글은 그대로 둔다.
 * @param {string} input
 * @param {number} [maxLength] 생략하면 길이 제한 없음. 주면 음이 아닌 정수여야 하며
 *   (아니면 RangeError), slug를 maxLength 글자(code point)로 자른 뒤 끝의 "-"를 지운다. 0이면 "".
 */
export function slugify(input, maxLength) {
  if (maxLength !== undefined && !(Number.isInteger(maxLength) && maxLength >= 0)) {
    throw new RangeError("maxLength must be a nonnegative integer");
  }
  const slug = normalizeSpaces(input)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  if (maxLength === undefined) return slug;
  return Array.from(slug).slice(0, maxLength).join("").replace(/-+$/, "");
}
