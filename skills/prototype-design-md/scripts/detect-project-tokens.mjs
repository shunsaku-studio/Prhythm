#!/usr/bin/env node
/**
 * Detect CSS custom properties in the repo.
 * Usage: node detect-project-tokens.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const findProjectRoot = (start) => {
  try {
    return execSync('git rev-parse --show-toplevel', {
      cwd: start,
      encoding: 'utf8',
    }).trim();
  } catch {
    return start;
  }
};

const repoRoot = findProjectRoot(process.cwd());

const candidates = [
  'src/app/globals.css',
  'app/globals.css',
  'src/index.css',
  'src/styles.css',
  'styles/globals.css',
];

const found = candidates
  .map((rel) => ({ rel, abs: join(repoRoot, rel) }))
  .filter(({ abs }) => existsSync(abs));

const hasCssVars = (text) => /--[\w-]+\s*:/.test(text);

const withVars = found.filter(({ abs }) =>
  hasCssVars(readFileSync(abs, 'utf8')),
);

console.log('## Project token detection\n');

if (withVars.length === 0) {
  console.log('No project CSS variables found.\n');
  console.log(
    '**Action:** Propose creating CSS variables (e.g. `src/app/globals.css`)',
  );
  console.log(
    'with a `:root { --primary: …; --background: …; }` block from intent.',
  );
  console.log('Do not invent token values in DESIGN.md.\n');
} else {
  console.log('CSS variables found:\n');
  for (const { rel } of withVars) {
    console.log(`- \`${rel}\``);
  }
  console.log(
    '\n**Action:** Map semantic roles to `var(--*)` in DESIGN.md Colors prose.',
  );
  console.log('CSS is authoritative — no hex in DESIGN.md.\n');
}
