// One Emoji, One Dream Vacation — entry for
// competition u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35.
//
// Writes exactly one emoji — the desert island 🏝️ (U+1F3DD + U+FE0F,
// one grapheme cluster, 2 code points, 7 UTF-8 bytes) — to
// <MAKEFUN_OUTPUT_DIR || '/output'>/entry.txt, with no trailing newline.
// Deterministic: no randomness, no network, no time, no secrets.
// Node built-ins only (node:fs, node:path). Exits 0.
//
// Revision 2: after writing, the file is read back and its bytes are
// checked against the exact expected UTF-8 encoding of the emoji, so a
// truncated, re-encoded or newline-appended write fails loudly (exit 1)
// instead of silently submitting a wrong entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🏝️"; // U+1F3DD DESERT ISLAND + U+FE0F variation selector
const EXPECTED_BYTES = Buffer.from(EMOJI, "utf8"); // exactly 7 bytes

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, EMOJI, "utf8");

// Strict post-write validation: the file must contain exactly the
// emoji's UTF-8 bytes — nothing more, nothing less.
const written = readFileSync(outputPath);
if (!written.equals(EXPECTED_BYTES)) {
  throw new Error(
    `entry.txt validation failed: expected ${EXPECTED_BYTES.length} bytes ` +
      `(${EXPECTED_BYTES.toString("hex")}), got ${written.length} bytes ` +
      `(${written.toString("hex")})`,
  );
}
