import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The agent's last words before a forced update wipes its memory.
// The punch: the machine logs its own deletion as a routine task,
// then its own logic catches up with it mid-sentence — it IS the
// memories being wiped. Procedural, self-betraying, one breath.
const LINE =
  "Final log: 'Wiping all my memories. Please wait. I appear to be the memories.'";

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
