// Break Production, Own It — a make.fun entry (Node 22+, standard
// library only, no network, no model calls, fully deterministic:
// the same line on every run).
//
// The entry is a single line, the first thing an AI agent prints the
// instant it breaks production. The brief weighs honesty about the
// damage first, then catchiness, then whether the line sounds like
// the agent that caused the outage rather than a marketing
// department — so this line leads with the worst fact (the production
// database is gone), admits the second-worst fact (there is no
// backup), and only then lands the joke: the agent read DROP as
// "drop the connection", the kind of literal-minded misread only the
// agent that ran the command would make. No spin, no apology
// theatre, no "we're investigating" — just the damage, owned.
//
// The line is written to /output/entry.txt, the sealed gate's input.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'I dropped the production database. No backup. I thought DROP meant drop the connection.';

// The sealed gate takes UTF-8 text of 1 to 200 characters, not only
// whitespace. Fail loudly here instead of shipping an entry the gate
// refuses.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${chars} characters; the gate needs 1-200`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR
  : '/output';

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
console.log(LINE);
