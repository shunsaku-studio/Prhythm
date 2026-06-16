#!/usr/bin/env bun
/**
 * Validate slides/{deck}/content/ before assembly.
 * Usage: bun validate-content.mjs slides/my-deck
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const deckPath = process.argv[2];
if (!deckPath) {
  console.error('Usage: bun validate-content.mjs slides/my-deck');
  process.exit(1);
}

const scriptDir = new URL('.', import.meta.url).pathname;
const repoRoot = resolve(scriptDir, '../../../..');
const contentDir = resolve(repoRoot, deckPath, 'content');
const sectionsDir = join(contentDir, 'sections');

const errors = [];
const warnings = [];

if (!existsSync(contentDir)) {
  console.error(`Not found: ${contentDir}`);
  process.exit(1);
}

const sectionFiles = existsSync(sectionsDir)
  ? readdirSync(sectionsDir)
      .filter((f) => f.endsWith('.html'))
      .sort()
  : [];

if (sectionFiles.length === 0) {
  errors.push('No section files in content/sections/');
}

for (const file of sectionFiles) {
  const html = readFileSync(join(sectionsDir, file), 'utf8').trim();
  if (!html.startsWith('<section')) {
    errors.push(`${file}: must start with <section>`);
  }
  if (!html.includes('data-label=')) {
    errors.push(`${file}: missing data-label`);
  }
  if (!/\bclass="s-(title|content|divider)"/.test(html)) {
    warnings.push(`${file}: expected class s-title, s-content, or s-divider`);
  }
  if (/<script|deck-stage|image-slot\.js/i.test(html)) {
    errors.push(`${file}: must not include script tags or viewer runtime`);
  }
}

const notesPath = join(contentDir, 'speaker-notes.json');
if (existsSync(notesPath)) {
  try {
    const notes = JSON.parse(readFileSync(notesPath, 'utf8'));
    if (!Array.isArray(notes)) {
      errors.push('speaker-notes.json must be a JSON array');
    } else if (notes.length !== sectionFiles.length) {
      warnings.push(
        `speaker-notes count (${notes.length}) != sections count (${sectionFiles.length})`,
      );
    }
  } catch {
    errors.push('speaker-notes.json is invalid JSON');
  }
}

for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nValidation failed (${errors.length} errors)`);
  process.exit(1);
}

console.log(`OK: ${sectionFiles.length} sections validated`);
