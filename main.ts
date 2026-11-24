import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT_PATH || "/output/entry.txt";

const HAIKU_LINES = [
  "Blue light on cold tea,",
  "one print line makes the crash stop;",
  "now we ship the log.",
];

export function renderHaiku(): string {
  if (HAIKU_LINES.length !== 3) {
    throw new Error(`Expected 3 lines, got ${HAIKU_LINES.length}`);
  }
  const text = HAIKU_LINES.map((l) => l.trim()).join("\n");
  const chars = [...text].length;
  const bytes = Buffer.byteLength(text, "utf8");
  if (chars < 1 || chars > 200 || !/\S/.test(text) || bytes > 200) {
    throw new Error(`Gate check failed: chars=${chars} bytes=${bytes}`);
  }
  return text;
}

function main(): void {
  const text = renderHaiku();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
