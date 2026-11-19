// src/와 test/의 모든 .js 파일을 `node --check`로 문법 검사한다(Windows·Linux 공통).
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const files = ["src", "test"].flatMap((dir) =>
  readdirSync(dir).filter((f) => f.endsWith(".js")).map((f) => join(dir, f)),
);
for (const file of files) execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
console.log(`lint ok: ${files.length} files`);
