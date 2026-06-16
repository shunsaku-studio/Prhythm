#!/usr/bin/env bun
/**
 * Detect design tokens from the repo and suggest slide theme CSS.
 * Usage: bun detect-project-theme.mjs [slides/my-deck]
 * With deck path: writes content/theme-detected.css
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const deckPath = process.argv[2];
const scriptDir = new URL('.', import.meta.url).pathname;
const repoRoot = resolve(scriptDir, '../../../..');

const candidates = [
  'src/styles.css',
  'src/app/globals.css',
  'app/globals.css',
  'styles/globals.css',
  'src/index.css',
];

const found = [];
for (const rel of candidates) {
  const abs = join(repoRoot, rel);
  if (existsSync(abs))
    found.push({ rel, abs, text: readFileSync(abs, 'utf8') });
}

const extractVar = (text, name) => {
  const re = new RegExp(`--${name}\\s*:\\s*([^;]+);`);
  const m = text.match(re);
  return m ? m[1].trim() : null;
};

const componentsPath = join(repoRoot, 'components.json');
let shadcn = null;
if (existsSync(componentsPath)) {
  try {
    shadcn = JSON.parse(readFileSync(componentsPath, 'utf8'));
  } catch {}
}

const sources = found.map((f) => f.rel);
const css = found.map((f) => f.text).join('\n');

const v = (name) => extractVar(css, name);

const background = v('background') ?? 'oklch(1 0 0)';
const foreground = v('foreground') ?? 'oklch(0.145 0 0)';
const card = v('card') ?? background;
const muted = v('muted') ?? background;
const mutedFg = v('muted-foreground') ?? foreground;
const border = v('border') ?? 'oklch(0.922 0 0)';
const primary = v('primary') ?? foreground;
const chart1 = v('chart-1') ?? primary;
const chart2 = v('chart-2') ?? primary;

const tokensCss = `/* Theme: project — auto-detected from ${sources.join(', ') || 'none'} */
:root {
  --paper: ${background};
  --surface: ${card};
  --subtle: ${muted};
  --line: ${border};
  --line-strong: ${border};
  --ink: ${foreground};
  --ink-2: ${mutedFg};
  --ink-3: ${mutedFg};
  --grad: linear-gradient(95deg, ${primary} 0%, ${chart1} 50%, ${chart2} 100%);
  --sans: system-ui, -apple-system, "Segoe UI", "Noto Sans JP", sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
`;

const report = {
  detected: sources.length > 0,
  sources,
  shadcn: shadcn
    ? { style: shadcn.style, baseColor: shadcn.tailwind?.baseColor }
    : null,
  preview: {
    paper: background,
    ink: foreground,
    primary,
  },
};

console.log('## Project theme detection\n');
if (!report.detected) {
  console.log('No project CSS tokens found. Use preset themes or default.\n');
} else {
  console.log(`Sources: ${sources.join(', ')}`);
  if (report.shadcn) {
    console.log(
      `shadcn: style=${report.shadcn.style}, baseColor=${report.shadcn.baseColor}`,
    );
  }
  console.log(
    `\nMapped preview:\n- paper: ${report.preview.paper}\n- ink: ${report.preview.ink}\n- accent: ${report.preview.primary}\n`,
  );
}

if (deckPath) {
  const out = resolve(repoRoot, deckPath, 'content/theme-detected.css');
  if (existsSync(resolve(repoRoot, deckPath, 'content'))) {
    writeFileSync(out, tokensCss, 'utf8');
    console.log(`Wrote: ${out}`);
  }
}

export { report, tokensCss };
