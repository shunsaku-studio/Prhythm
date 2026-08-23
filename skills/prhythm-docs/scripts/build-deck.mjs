#!/usr/bin/env node
/**
 * build-deck.mjs — assemble a self-contained prhythm-docs slide deck.
 *
 *   node build-deck.mjs <sections.html> <out.html> --title "…"
 *
 * Inlines assets/deck.css and assets/deck-stage.js into assets/shell.html so
 * the output is a single file that opens from disk with no server and no
 * build step. The mermaid CDN block is only added when the sections actually
 * contain a .mermaid element.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');

// Kept in sync with the tokens in deck.css — mermaid renders into an <svg>
// that our stylesheet can't reach, so its palette has to be passed in.
const MERMAID_BLOCK = `<script type="module">
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base",
  // htmlLabels must be off at the root, not just under flowchart: the default
  // <foreignObject> labels are sized from an estimate that comes up about a
  // character short and then hard-clips the overflow. SVG <text> labels are
  // sized from getBBox instead, which is exact.
  htmlLabels: false,
  // Everything stays at mermaid's default 16px — it measures with one
  // font-size and renders with another, and a mismatch clips labels. Nothing
  // here or in deck.css may override the diagram's type size; legibility comes
  // from scaling the finished SVG to the frame.
  flowchart: { useMaxWidth: false, htmlLabels: false, padding: 18, nodeSpacing: 60 },
  er: { useMaxWidth: false, entityPadding: 22 },
  fontFamily: '"Noto Sans JP", "Hiragino Sans", system-ui, sans-serif',
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#ffffff",
    primaryTextColor: "#0a0a0a",
    primaryBorderColor: "#0a0a0a",
    secondaryColor: "#f2f0ec",
    tertiaryColor: "#ffffff",
    lineColor: "#4a4a4a",
    textColor: "#0a0a0a",
    mainBkg: "#ffffff",
    nodeBorder: "#0a0a0a",
    clusterBkg: "#ffffff",
    clusterBorder: "#e6e4e0",
    edgeLabelBackground: "#ffffff"
  }
});

// mermaid sizes every node by measuring its rendered label, so it has to run
// (a) after the webfonts land and (b) while the slide is actually on screen —
// measuring a hidden slide yields widths that clip the last characters of CJK
// labels. So each diagram is rendered lazily the first time its slide shows.
const fontsReady = Promise.race([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise((r) => setTimeout(r, 2000)),
]);

const renderIn = async (slide) => {
  if (!slide) return;
  const pending = [...slide.querySelectorAll(".mermaid:not([data-processed])")];
  if (!pending.length) return;
  await fontsReady;
  await mermaid.run({ nodes: pending });
  slide.querySelectorAll(".diagram svg").forEach((svg) => {
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.maxWidth = "100%";
  });
};

const stage = document.querySelector("deck-stage");
stage.addEventListener("slidechange", (e) => renderIn(e.detail.slide));
renderIn(document.querySelector("[data-deck-active]"));
// Print lays every slide out at once, so anything still unrendered has to be
// caught up before the browser paginates.
window.addEventListener("beforeprint", () => {
  document.querySelectorAll(".slide").forEach((s) => renderIn(s));
});
</script>`;

const parseArgs = (argv) => {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq > -1) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = argv[++i] ?? '';
    } else positional.push(a);
  }
  return { positional, flags };
};

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const indent = (s, pad) =>
  s
    .split('\n')
    .map((l) => (l.trim() ? pad + l : l))
    .join('\n');

const main = async () => {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [sectionsPath, outPath] = positional;

  if (!sectionsPath || !outPath) {
    console.error('usage: build-deck.mjs <sections.html> <out.html> --title "…"');
    process.exit(2);
  }

  const [shell, css, js, sections] = await Promise.all([
    readFile(resolve(ASSETS, 'shell.html'), 'utf8'),
    readFile(resolve(ASSETS, 'deck.css'), 'utf8'),
    readFile(resolve(ASSETS, 'deck-stage.js'), 'utf8'),
    readFile(resolve(sectionsPath), 'utf8'),
  ]);

  const leftover = [...sections.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)].map((m) => m[1]);
  if (leftover.length) {
    console.warn(
      `warn: ${sectionsPath} still has unfilled placeholders: ${[...new Set(leftover)].join(', ')}`,
    );
  }

  const title = flags.title || 'Prhythm';
  const html = shell
    .replace('{{TITLE}}', escapeHtml(title))
    .replace('{{DECK_CSS}}', () => css.trimEnd())
    .replace('{{SECTIONS}}', () => indent(sections.trim(), '  '))
    .replace('{{DECK_JS}}', () => js.trimEnd())
    .replace('{{MERMAID}}', () => (/class="[^"]*\bmermaid\b/.test(sections) ? MERMAID_BLOCK : ''));

  await mkdir(dirname(resolve(outPath)), { recursive: true });
  await writeFile(resolve(outPath), html, 'utf8');

  const slides = (sections.match(/<section\b/g) || []).length;
  console.log(`built ${outPath} — ${slides} slides, ${(html.length / 1024).toFixed(0)}KB`);
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
