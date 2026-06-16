#!/usr/bin/env bun
/**
 * Package slides/{deck}/ into standalone.html
 * Usage: bun bundle-standalone.mjs slides/my-deck
 */
import { randomUUID as uuid } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { gzipSync as gzip } from 'node:zlib';

const GZIP_THRESHOLD = 2048;

const scriptDir = dirname(new URL(import.meta.url).pathname);
const skillDir = resolve(scriptDir, '..');
const repoRoot = resolve(skillDir, '../../..');

const deckPath = process.argv[2];
if (!deckPath) {
  console.error('Usage: bun bundle-standalone.mjs slides/my-deck');
  process.exit(1);
}

const deckDir = resolve(repoRoot, deckPath);
const indexPath = join(deckDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error(`Not found: ${indexPath} — run assemble.sh first`);
  process.exit(1);
}

const mimeFor = (ext) => {
  const m = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
  };
  return m[ext.toLowerCase()] ?? 'application/octet-stream';
};

const manifest = {};
const assetByPath = new Map();

const addAsset = (filePath) => {
  const abs = resolve(deckDir, filePath);
  if (!existsSync(abs)) {
    console.warn(`Skip missing asset: ${filePath}`);
    return null;
  }
  if (assetByPath.has(abs)) return assetByPath.get(abs);

  const id = uuid();
  const bytes = readFileSync(abs);
  const ext = extname(abs);
  const entry = { mime: mimeFor(ext), data: '', compressed: false };

  let payload = bytes;
  if (bytes.length > GZIP_THRESHOLD) {
    payload = gzip(bytes);
    entry.compressed = true;
  }
  entry.data = Buffer.from(payload).toString('base64');
  manifest[id] = entry;
  assetByPath.set(abs, id);
  return id;
};

let html = readFileSync(indexPath, 'utf8');

const cssLink = html.match(/<link[^>]+href=["']([^"']+\.css)["'][^>]*>/i);
if (cssLink) {
  const cssPath = resolve(deckDir, cssLink[1]);
  if (existsSync(cssPath)) {
    let processedCss = readFileSync(cssPath, 'utf8');
    for (const m of processedCss.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      const ref = m[1];
      if (ref.startsWith('data:') || ref.startsWith('http')) continue;
      const assetId = addAsset(ref);
      if (assetId) processedCss = processedCss.split(ref).join(assetId);
    }
    html = html.replace(cssLink[0], `<style>${processedCss}</style>`);
  }
}

html = html.replace(
  /<script([^>]*)\ssrc=["']([^"']+)["']([^>]*)><\/script>/gi,
  (_, pre, src, post) => {
    const id = addAsset(src);
    if (!id) return `<script${pre}${post}></script>`;
    return `<script${pre} src="${id}"${post}></script>`;
  },
);

const shellPath = join(skillDir, 'templates/standalone/shell.html');
const bundlerPath = join(skillDir, 'templates/standalone/bundler.js');
let shell = readFileSync(shellPath, 'utf8');
const bundler = readFileSync(bundlerPath, 'utf8');

const deckTitle =
  html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? basename(deckDir);
shell = shell.replace('{{DECK_TITLE}}', deckTitle);

const outDir = join(deckDir, 'dist');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'standalone.html');

/** Prevent </script> in embedded JSON from terminating the host <script> tag. */
const safeJsonForScript = (value) =>
  JSON.stringify(value).replace(/<\//g, '<\\/');

const templateJson = safeJsonForScript(html);

const output = `${shell}
  <script>
${bundler}
  </script>
  <script type="__bundler/manifest">
${safeJsonForScript(manifest)}
  </script>
  <script type="__bundler/ext_resources">
[]
  </script>
  <script type="__bundler/template">
${templateJson}
  </script>
</body>
</html>
`;

if (/<script type="__bundler\/template">\s*"[^"]*<\/script/i.test(output)) {
  console.error('Bundle validation failed: raw </script> in template payload');
  process.exit(1);
}

writeFileSync(outPath, output, 'utf8');
console.log(`Bundled ${Object.keys(manifest).length} assets → ${outPath}`);
