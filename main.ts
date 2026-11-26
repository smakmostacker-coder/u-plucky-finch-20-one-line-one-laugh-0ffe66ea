// One Line, One Laugh — make.fun entry.
// Writes exactly one original funny line (at most 200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node 22, standard library only. No network, no randomness, no secrets:
// the output is fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "My smartwatch congratulated me on my steps today \u2014 all 47 of them, from the bed to the fridge and back.";

// Validate the line before writing it. Character count is by code point,
// so the em dash counts as one character, matching the 200-char rule.
const charCount = [...LINE].length;
if (charCount === 0) {
  throw new Error("line must not be empty");
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not start or end with whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (charCount > MAX_CHARS) {
  throw new Error(
    `line is ${charCount} characters, over the ${MAX_CHARS} limit`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
