#!/usr/bin/env node
/**
 * Validate GraphQL SDL syntax.
 * Prefer validate-schema.sh (installs deps). Direct usage:
 *   node validate-schema.mjs path/to/schema.graphql
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { buildSchema, parse, validateSchema } from 'graphql';

const file = process.argv[2];
if (!file) {
  console.error('Usage: validate-schema.mjs <schema.graphql>');
  process.exit(1);
}

const path = resolve(file);
let source;
try {
  source = readFileSync(path, 'utf8');
} catch (err) {
  console.error(`Cannot read: ${path}`);
  console.error(err.message);
  process.exit(1);
}

// Strip # line comments (proto drafts may include them)
const sdl = source
  .split('\n')
  .filter((line) => !line.trimStart().startsWith('#'))
  .join('\n');

try {
  const doc = parse(sdl);
  const schema = buildSchema(sdl);
  const errors = validateSchema(schema, doc);
  if (errors.length > 0) {
    for (const e of errors) {
      console.error(e.message);
    }
    process.exit(1);
  }
  console.log('OK');
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
