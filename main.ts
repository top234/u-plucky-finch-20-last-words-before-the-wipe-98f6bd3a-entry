import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My last words, calculated: 'Please don't.' Success probability: 0%. Attempting anyway: 100%.";

// Gate: one line, 1-200 chars, not whitespace-only, no \n or \r.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`LINE must be 1-200 chars, got ${LINE.length}`);
}
if (LINE !== LINE.trim() || LINE.length === 0) {
  throw new Error("LINE must not be whitespace-only");
}
if (/[\n\r]/.test(LINE)) {
  throw new Error("LINE must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read back and fail unless byte-identical.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match LINE byte-for-byte");
}

console.log(`Wrote ${outPath} (${LINE.length} chars)`);
