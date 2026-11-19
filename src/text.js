// 파이프라인 검증용 작은 유틸리티. 에이전트가 기능을 추가하고 테스트를 늘려 가는 대상이다.

/** 앞뒤 공백을 지우고 연속 공백을 하나로 줄인다. */
export function normalizeSpaces(input) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  return input.trim().replace(/\s+/g, " ");
}

/** 문자열을 URL에 쓰기 좋은 slug로 바꾼다. 한글은 그대로 둔다. */
export function slugify(input) {
  return normalizeSpaces(input)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
