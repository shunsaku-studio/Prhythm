#!/usr/bin/env node
/**
 * docs-site/site.meta.json を正本に .generated/ と VitePress 用 meta を生成する。
 *
 * - skills/{name}/README.md — スキルページ（SSOT は skills/）
 * - docs-site/pages/* — 任意ページ
 * - sidebar / nav — site.meta.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const DOCS_SITE = path.join(ROOT, 'docs-site');
const META_PATH = path.join(DOCS_SITE, 'site.meta.json');
const OUT_DIR = path.join(DOCS_SITE, '.generated');
const RESOLVED_META_PATH = path.join(OUT_DIR, '.vitepress-meta.json');
const REPO_BASE = 'https://github.com/shunsaku-studio/Prhythm/blob/main';

const readText = (filePath) => fs.readFileSync(filePath, 'utf8');
const readJson = (filePath) => JSON.parse(readText(filePath));

const loadMeta = () => {
  if (!fs.existsSync(META_PATH)) {
    throw new Error(`site.meta.json が見つかりません: ${META_PATH}`);
  }
  return readJson(META_PATH);
};

const listAllSkills = () =>
  fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(SKILLS_DIR, name, 'README.md')))
    .sort();

const resolveSkillInclude = (skillsConfig) => {
  const include = skillsConfig?.include ?? 'all';
  if (include === 'all') return listAllSkills();
  if (!Array.isArray(include)) {
    throw new Error('skills.include は "all" または string[] である必要があります');
  }
  for (const slug of include) {
    if (!fs.existsSync(path.join(SKILLS_DIR, slug, 'README.md'))) {
      throw new Error(`skills.include に未知のスキル: ${slug}`);
    }
  }
  return [...include].sort();
};

const extractTitle = (content) =>
  content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? 'Untitled';

const extractSummary = (content) => {
  const fromSection = content.match(/##\s+概要\s*\n+([\s\S]*?)(?=\n##\s|\n<details>|\Z)/)?.[1] ?? '';
  const fromSectionLine = fromSection
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('<'));
  if (fromSectionLine) return fromSectionLine;

  const fromBlockquote = content.match(/^>\s+(.+)$/m)?.[1]?.trim();
  if (fromBlockquote) return fromBlockquote;

  return (
    content
      .replace(/^#\s+.+\n+/, '')
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('<') && line !== '---') ?? ''
  );
};

const toFrontmatter = (fields) => {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== '') {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
};

const routeToLink = (route) => {
  const normalized = route.replace(/\\/g, '/').replace(/^\//, '').replace(/\/index\.md$/, '');
  return normalized.endsWith('/') ? `/${normalized}` : `/${normalized}/`;
};

const repoPath = (skillSlug, ...segments) =>
  `${REPO_BASE}/skills/${skillSlug}/${segments.join('/')}`;

const rewriteSkillLinks = (content, skillSlug) =>
  content
    .replace(/\]\(\.\.\/([a-z0-9-]+)\/?\)/g, '](/skills/$1/)')
    .replace(/\]\(docs\/([^)#]+?)\.md\)/g, `](/skills/${skillSlug}/docs/$1)`)
    .replace(/\]\((reference\.md)\)/g, `](/skills/${skillSlug}/reference)`)
    .replace(/\]\(\.\.\/\.\.\/([^)]+)\)/g, (_, target) => `](${REPO_BASE}/${target})`)
    .replace(/\]\((SKILL\.md)\)/g, `](${repoPath(skillSlug, 'SKILL.md')})`)
    .replace(/\]\(\.\.\/(templates\/[^)]+)\)/g, (_, target) => `](${repoPath(skillSlug, target)})`)
    .replace(/\]\((references\/[^)]*)\)/g, (_, target) => `](${repoPath(skillSlug, target)})`)
    .replace(/\]\((templates\/[^)]+)\)/g, (_, target) => `](${repoPath(skillSlug, target)})`)
    // 同階層の補助ファイル（example.md, questions.md 等）はページ化していないため GitHub 直リンクにする
    .replace(/\]\(([a-zA-Z0-9_-]+\.md)\)/g, (_, target) => `](${repoPath(skillSlug, target)})`);

const writeFile = (outPath, content) => {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
};

const buildSkillRegistry = (skillSlugs) =>
  Object.fromEntries(
    skillSlugs.map((slug) => {
      const content = readText(path.join(SKILLS_DIR, slug, 'README.md'));
      return [
        slug,
        {
          slug,
          title: extractTitle(content),
          summary: extractSummary(content),
          link: `/skills/${slug}/`,
          hasReference: fs.existsSync(path.join(SKILLS_DIR, slug, 'reference.md')),
          docs: fs.existsSync(path.join(SKILLS_DIR, slug, 'docs'))
            ? fs
                .readdirSync(path.join(SKILLS_DIR, slug, 'docs'))
                .filter((f) => f.endsWith('.md'))
                .map((f) => f.replace(/\.md$/, ''))
                .sort()
            : [],
        },
      ];
    }),
  );

const syncReadme = (skillSlug) => {
  const content = readText(path.join(SKILLS_DIR, skillSlug, 'README.md'));
  const title = extractTitle(content);
  const description = extractSummary(content);
  const body = content.replace(/^#\s+.+\n+/, '');
  const frontmatter = toFrontmatter({ title, skill: skillSlug, description });
  writeFile(
    path.join(OUT_DIR, 'skills', skillSlug, 'index.md'),
    `${frontmatter}<SkillInstall />\n\n${rewriteSkillLinks(body, skillSlug)}`,
  );
};

const syncSkillMarkdown = (skillSlug, relativePath, skillsConfig) => {
  const src = path.join(SKILLS_DIR, skillSlug, relativePath);
  if (!fs.existsSync(src)) return;

  const content = readText(src);
  const title = extractTitle(content);
  const baseName = path.basename(relativePath, '.md');
  const outRel =
    baseName === 'reference'
      ? path.join('skills', skillSlug, 'reference.md')
      : path.join('skills', skillSlug, relativePath);
  const body = content.replace(/^#\s+.+\n+/, '');
  const frontmatter = toFrontmatter({ title, skill: skillSlug });
  writeFile(path.join(OUT_DIR, outRel), `${frontmatter}${rewriteSkillLinks(body, skillSlug)}`);
};

const syncSkill = (skillSlug, skillsConfig) => {
  syncReadme(skillSlug);
  if (skillsConfig.syncReference !== false) {
    syncSkillMarkdown(skillSlug, 'reference.md', skillsConfig);
  }
  if (skillsConfig.syncDocs !== false) {
    const docsDir = path.join(SKILLS_DIR, skillSlug, 'docs');
    if (fs.existsSync(docsDir)) {
      for (const entry of fs.readdirSync(docsDir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          syncSkillMarkdown(skillSlug, path.join('docs', entry.name), skillsConfig);
        }
      }
    }
  }
};

const syncCustomPage = (pageId, pageConfig) => {
  const src = path.join(DOCS_SITE, pageConfig.source);
  if (!fs.existsSync(src)) {
    throw new Error(`pages.${pageId}.source が見つかりません: ${pageConfig.source}`);
  }

  const content = readText(src);
  const title = pageConfig.title ?? extractTitle(content);
  const route = pageConfig.route ?? pageId;
  const body = pageConfig.keepTitle ? content : content.replace(/^#\s+.+\n+/, '');
  const frontmatter = toFrontmatter({
    title,
    ...(pageConfig.description ? { description: pageConfig.description } : {}),
    ...(pageConfig.layout ? { layout: pageConfig.layout } : {}),
  });

  writeFile(path.join(OUT_DIR, route, 'index.md'), `${frontmatter}${body}`);

  return {
    id: pageId,
    title,
    route,
    link: routeToLink(route),
  };
};

const generateHome = (meta, skillRegistry, sidebarSkillOrder) => {
  const skills =
    sidebarSkillOrder.length > 0
      ? sidebarSkillOrder.filter((slug) => skillRegistry[slug])
      : Object.keys(skillRegistry).sort();

  const rows = skills.map((slug) => {
    const skill = skillRegistry[slug];
    return `| [${skill.title}](${skill.link}) | ${skill.summary.replace(/\|/g, '\\|')} |`;
  });

  return [
    toFrontmatter({
      title: meta.home?.title ?? 'Prhythm Skills',
      description: meta.home?.description,
    }),
    `# ${meta.home?.title ?? 'Prhythm Skills'}`,
    '',
    meta.home?.intro ?? '',
    '',
    '| スキル | 概要 |',
    '|--------|------|',
    ...rows,
    '',
  ].join('\n');
};

const collectSidebarSkillOrder = (items, acc = []) => {
  for (const item of items ?? []) {
    if (item.skill) acc.push(item.skill);
    if (item.items) collectSidebarSkillOrder(item.items, acc);
  }
  return acc;
};

const buildSkillSidebarItems = (slug, skill, expand) => {
  const items = [{ text: 'Overview', link: skill.link }];

  if (expand !== false && skill.hasReference) {
    items.push({ text: 'Reference', link: `/skills/${slug}/reference` });
  }

  if (expand === true || expand === 'docs' || expand === 'all') {
    for (const doc of skill.docs) {
      const docTitle = extractTitle(readText(path.join(SKILLS_DIR, slug, 'docs', `${doc}.md`)));
      items.push({ text: docTitle, link: `/skills/${slug}/docs/${doc}` });
    }
  }

  return expand ? { text: skill.title, collapsed: false, items } : { text: skill.title, link: skill.link };
};

const resolveSidebarItems = (items, ctx) =>
  (items ?? []).flatMap((item) => {
    if (item.items) {
      return [
        {
          text: item.text,
          ...(item.collapsed !== undefined ? { collapsed: item.collapsed } : {}),
          items: resolveSidebarItems(item.items, ctx),
        },
      ];
    }

    if (item.link) {
      return [{ text: item.text ?? item.link, link: item.link }];
    }

    if (item.page) {
      const page = ctx.pages[item.page];
      if (!page) throw new Error(`sidebar: 未知の page "${item.page}"`);
      return [{ text: item.text ?? page.title, link: page.link }];
    }

    if (item.skill) {
      const skill = ctx.skills[item.skill];
      if (!skill) throw new Error(`sidebar: 未知の skill "${item.skill}"`);
      return [buildSkillSidebarItems(item.skill, skill, item.expand ?? false)];
    }

    throw new Error(`sidebar item を解決できません: ${JSON.stringify(item)}`);
  });

const cleanOutDir = () => {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
};

const main = () => {
  const meta = loadMeta();
  const skillsConfig = meta.skills ?? {};
  const skillSlugs = resolveSkillInclude(skillsConfig);

  if (skillSlugs.length === 0) {
    throw new Error('同期対象のスキルがありません');
  }

  cleanOutDir();

  const skillRegistry = buildSkillRegistry(skillSlugs);
  for (const slug of skillSlugs) syncSkill(slug, skillsConfig);

  const pageRegistry = {};
  for (const [pageId, pageConfig] of Object.entries(meta.pages ?? {})) {
    pageRegistry[pageId] = syncCustomPage(pageId, pageConfig);
  }

  const sidebarSkillOrder = collectSidebarSkillOrder(meta.sidebar ?? []);
  writeFile(path.join(OUT_DIR, 'index.md'), generateHome(meta, skillRegistry, sidebarSkillOrder));

  const resolved = {
    nav: meta.nav ?? [],
    sidebar: resolveSidebarItems(meta.sidebar ?? [], {
      pages: pageRegistry,
      skills: skillRegistry,
    }),
    skills: skillSlugs,
    pages: pageRegistry,
  };

  writeFile(RESOLVED_META_PATH, `${JSON.stringify(resolved, null, 2)}\n`);

  const pageCount = Object.keys(pageRegistry).length;
  console.log(
    `sync-docs: ${skillSlugs.length} skills, ${pageCount} pages → ${path.relative(ROOT, OUT_DIR)}/`,
  );
};

main();
