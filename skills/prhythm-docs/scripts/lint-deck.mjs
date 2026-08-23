#!/usr/bin/env node
/**
 * lint-deck.mjs — enforce the information budget in slide-grammar.md.
 *
 *   node lint-deck.mjs <deck.html|sections.html> [more…] [--visual]
 *
 * Static checks run on the markup alone (character counts, item counts, the
 * message-line rules, the required Answer slide). `--visual` additionally
 * renders each deck in headless Chromium and reports slides whose content
 * overflows the fixed canvas — the check that only a real layout can answer.
 *
 * Exit code is 1 when any error-level finding is reported; warnings alone
 * still exit 0.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const BUDGET = {
  slidesMax: 8,
  msgMin: 30,
  msgMax: 60,
  statementMin: 20,
  statementMax: 80,
  becauseLines: 3,
  becauseChars: 60,
  tracksMax: 4,
  trackLabel: 14,
  trackBody: 70,
  rowsMax: 5,
  rowKey: 16,
  rowValue: 80,
  tableRows: 6,
  tableCols: 4,
  tableCell: 40,
  bulletsMax: 5,
  bulletChars: 50,
  qItemsMax: 4,
  qItemChars: 18,
  slideChars: 400,
};

const findings = [];
const add = (level, file, slide, msg) => findings.push({ level, file, slide, msg });

// The templates are plain HTML fragments; a regex pass is enough and keeps
// this script dependency-free for the static half.
const stripTags = (s) =>
  s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const len = (s) => [...stripTags(s)].length;

/** Text left after removing every {{PLACEHOLDER}} — an unfilled template
 *  should not trip the length budgets. */
const isTemplate = (html) => /\{\{[A-Z0-9_]+\}\}/.test(html);

const sectionsOf = (html) => {
  const out = [];
  const re = /<section\b([^>]*)>([\s\S]*?)<\/section>/g;
  let m;
  while ((m = re.exec(html))) {
    const label = (m[1].match(/data-label="([^"]*)"/) || [, `#${out.length + 1}`])[1];
    out.push({ label, attrs: m[1], html: m[2] });
  }
  return out;
};

const allOf = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

const lintStatic = (file, html) => {
  const tpl = isTemplate(html);
  const sections = sectionsOf(html);

  if (!sections.length) return add('error', file, '-', '<section> が 1 つも無い');
  if (sections.length > BUDGET.slidesMax)
    add('error', file, '-', `${sections.length} 枚。上限は ${BUDGET.slidesMax} 枚`);
  if (!sections.some((s) => /s-statement/.test(s.attrs)))
    add('error', file, '-', 'Answer スライド（.s-statement）が無い');

  for (const s of sections) {
    const where = s.label;

    for (const msg of allOf(s.html, /<h2[^>]*class="[^"]*\bmsg\b[^"]*"[^>]*>([\s\S]*?)<\/h2>/g)) {
      const t = stripTags(msg);
      if (/\{\{/.test(msg)) continue;
      const n = [...t].length;
      if (n < BUDGET.msgMin || n > BUDGET.msgMax)
        add('warn', file, where, `メッセージライン ${n} 字（${BUDGET.msgMin}〜${BUDGET.msgMax} 字）`);
      if (!/[。？]$/.test(t)) add('error', file, where, `メッセージラインが句点で終わっていない: 「${t}」`);
    }

    for (const st of allOf(s.html, /<p[^>]*class="[^"]*\bstatement\b[^"]*"[^>]*>([\s\S]*?)<\/p>/g)) {
      if (/\{\{/.test(st)) continue;
      const n = len(st);
      if (n < BUDGET.statementMin || n > BUDGET.statementMax)
        add('warn', file, where, `Answer 一文が ${n} 字（${BUDGET.statementMin}〜${BUDGET.statementMax} 字）`);
    }

    for (const bec of allOf(s.html, /<div[^>]*class="[^"]*\bbecause\b[^"]*"[^>]*>([\s\S]*?)<\/div>/g)) {
      const lines = bec.split(/<br\s*\/?>/).map(stripTags).filter(Boolean);
      if (lines.length > BUDGET.becauseLines)
        add('warn', file, where, `根拠 ${lines.length} 行（上限 ${BUDGET.becauseLines} 行）`);
      lines.forEach((l) => {
        if (!tpl && [...l].length > BUDGET.becauseChars)
          add('warn', file, where, `根拠 1 行が ${[...l].length} 字（上限 ${BUDGET.becauseChars} 字）`);
      });
    }

    const tracks = allOf(s.html, /<div[^>]*class="[^"]*\btrack\b[^"]*"[^>]*>([\s\S]*?)(?=<div[^>]*class="[^"]*\btrack\b|$)/g);
    if (tracks.length > BUDGET.tracksMax)
      add('error', file, where, `track ${tracks.length} 本（上限 ${BUDGET.tracksMax} 本）`);
    for (const l of allOf(s.html, /class="tlabel"[^>]*>([\s\S]*?)<\//g))
      if (!tpl && len(l) > BUDGET.trackLabel)
        add('warn', file, where, `tlabel ${len(l)} 字（上限 ${BUDGET.trackLabel} 字）`);
    for (const b of allOf(s.html, /class="tbody"[^>]*>([\s\S]*?)<\//g))
      if (!tpl && len(b) > BUDGET.trackBody)
        add('warn', file, where, `tbody ${len(b)} 字（上限 ${BUDGET.trackBody} 字）`);

    const rows = allOf(s.html, /<div[^>]*class="row"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g);
    if (rows.length > BUDGET.rowsMax)
      add('error', file, where, `row ${rows.length} 行（上限 ${BUDGET.rowsMax} 行）`);
    for (const k of allOf(s.html, /class="rk"[^>]*>([\s\S]*?)<\//g))
      if (!tpl && len(k) > BUDGET.rowKey) add('warn', file, where, `rk ${len(k)} 字（上限 ${BUDGET.rowKey} 字）`);
    for (const v of allOf(s.html, /class="rv"[^>]*>([\s\S]*?)<\//g))
      if (!tpl && len(v) > BUDGET.rowValue) add('warn', file, where, `rv ${len(v)} 字（上限 ${BUDGET.rowValue} 字）`);

    for (const tbody of allOf(s.html, /<tbody>([\s\S]*?)<\/tbody>/g)) {
      const trs = allOf(tbody, /<tr[^>]*>([\s\S]*?)<\/tr>/g);
      if (trs.length > BUDGET.tableRows)
        add('error', file, where, `テーブル ${trs.length} 行（上限 ${BUDGET.tableRows} 行）`);
      trs.forEach((tr) => {
        const tds = allOf(tr, /<td[^>]*>([\s\S]*?)<\/td>/g);
        if (tds.length > BUDGET.tableCols)
          add('error', file, where, `テーブル ${tds.length} 列（上限 ${BUDGET.tableCols} 列）`);
        tds.forEach((td) => {
          if (!tpl && len(td) > BUDGET.tableCell)
            add('warn', file, where, `セル ${len(td)} 字（上限 ${BUDGET.tableCell} 字）: ${stripTags(td).slice(0, 20)}…`);
        });
      });
    }

    for (const ul of allOf(s.html, /<ul[^>]*class="[^"]*\bbullets\b[^"]*"[^>]*>([\s\S]*?)<\/ul>/g)) {
      const lis = allOf(ul, /<li[^>]*>([\s\S]*?)<\/li>/g);
      if (lis.length > BUDGET.bulletsMax)
        add('error', file, where, `bullets ${lis.length} 個（上限 ${BUDGET.bulletsMax} 個）`);
      lis.forEach((li) => {
        if (!tpl && len(li) > BUDGET.bulletChars)
          add('warn', file, where, `bullet ${len(li)} 字（上限 ${BUDGET.bulletChars} 字）`);
      });
    }

    for (const qi of allOf(s.html, /<div[^>]*class="qitems"[^>]*>([\s\S]*?)<\/div>/g)) {
      const items = allOf(qi, /<span[^>]*class="[^"]*\bqitem\b[^"]*"[^>]*>([\s\S]*?)<\/span>/g);
      if (items.length > BUDGET.qItemsMax)
        add('error', file, where, `象限内 ${items.length} 件（上限 ${BUDGET.qItemsMax} 件）`);
      items.forEach((it) => {
        if (!tpl && len(it) > BUDGET.qItemChars)
          add('warn', file, where, `qitem ${len(it)} 字（上限 ${BUDGET.qItemChars} 字）`);
      });
    }

    const total = len(s.html);
    if (!tpl && total > BUDGET.slideChars)
      add('warn', file, where, `スライド全体 ${total} 字（上限 ${BUDGET.slideChars} 字）`);
  }
};

const lintVisual = async (files) => {
  const { chromium } = await import('playwright-chromium');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  for (const file of files) {
    await page.goto(pathToFileURL(resolve(file)).href + '?debug');
    await page.waitForTimeout(2500);
    const over = await page.evaluate(() =>
      [...document.querySelectorAll('[data-overflow]')].map((el) => ({
        label: el.getAttribute('data-label') || el.getAttribute('data-deck-slide'),
        by: el.getAttribute('data-overflow'),
      })),
    );
    over.forEach((o) => add('error', file, o.label, `キャンバスからはみ出している（+${o.by}px）`));
  }
  await browser.close();
};

const main = async () => {
  const args = process.argv.slice(2);
  const visual = args.includes('--visual');
  const files = args.filter((a) => !a.startsWith('--'));

  if (!files.length) {
    console.error('usage: lint-deck.mjs <deck.html|sections.html> [more…] [--visual]');
    process.exit(2);
  }

  for (const f of files) lintStatic(f, await readFile(resolve(f), 'utf8'));

  if (visual) {
    const built = files.filter((f) => !f.endsWith('sections.html'));
    if (built.length) await lintVisual(built);
    else console.log('note: --visual はビルド済み deck.html にだけ効く');
  }

  const errors = findings.filter((f) => f.level === 'error');
  for (const f of findings) {
    const tag = f.level === 'error' ? 'ERROR' : 'warn ';
    console.log(`${tag} ${f.file} [${f.slide}] ${f.msg}`);
  }
  console.log(
    findings.length
      ? `\n${errors.length} error / ${findings.length - errors.length} warn`
      : 'ok — 予算内',
  );
  process.exit(errors.length ? 1 : 0);
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
