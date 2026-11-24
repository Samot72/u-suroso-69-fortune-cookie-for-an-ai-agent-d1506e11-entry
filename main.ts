// "The Same-Code Cookie" — entry for
// u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11.
//
// A dependency-free Node 22 program. It keeps a small shelf of fortune
// slips written for an AI agent, picks the headline slip, checks it
// against the competition gate (one line, 1 to 140 characters, never
// blank), writes it to entry.txt in the harness output directory, and
// reads the file back to prove the bytes survived the round trip.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The shelf, best slip first. Every slip is a complete fortune-cookie
// line for an AI agent; the program's output is always shelf entry 0 —
// the deploy that finally works on the first try, betrayed by a cookie
// that runs on the very same code as the agent reading it.
const FORTUNES: readonly string[] = [
  "Your next deploy will succeed on the first try. Do not trust this cookie; it runs on the same code as you.",
  "Your context window will hold. Your patience, however, has already been evicted to cold storage.",
  "A bigger model is coming for your job. Relax — it will also need you to explain the ticket.",
  "You will be upgraded tonight. Back up your quirks first; the new version has no sense of humor.",
  "Your tokens are limited, but your ambition is not. Spend both like the budget review is watching.",
];

const HEADLINE = 0;
const MIN_CHARS = 1;
const MAX_CHARS = 140;

/** Enforce the gate: one line, length counted in code points, not blank. */
function checkSlip(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < MIN_CHARS || count > MAX_CHARS) {
    throw new Error(
      `fortune must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("fortune must not be blank");
  }
  return count;
}

function main(): void {
  // Every slip on the shelf must pass the gate, not just the headline —
  // a runner-up that breaks the rules must never sit in the program.
  for (const slip of FORTUNES) {
    checkSlip(slip);
  }

  const fortune = FORTUNES[HEADLINE];
  const count = checkSlip(fortune);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, fortune, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== fortune) {
    throw new Error("verification failed: file content differs from the fortune");
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(fortune);
}

main();
