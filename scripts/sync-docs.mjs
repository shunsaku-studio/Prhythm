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

const RANK_ORDER = ['core', 'utility', 'meta'];
const RANK_LABELS = {
  core: 'コア',
  utility: 'ユーティリティ',
  meta: 'メタ',
};
const CATEGORY_ORDER = ['business', 'design', 'tech', 'delivery'];
const CATEGORY_LABELS = {
  business: 'ビジネス',
  design: 'デザイン',
  tech: 'テック',
  delivery: '実行計画',
};

/** README「How — 5 つのシーン」の初出順。サイドバー用（束ラベルは出さない） */
const SKILL_SIDEBAR_ORDER = [
  'hearing',
  'market-landscape',
  'defining-personas-and-segments',
  'create-journey-map',
  'function-usecase-map',
  'product-vision-and-concept',
  'assumption-breaker',
  'feature-backlog-map',
  'ooui-graphql-modeling',
  'ooui-architect',
  'prototype-design-md',
  'shadcn-explorer',
  'uncertainty-map',
  'proto-storyboard',
  'create-html-deck',
  'delivery-team-plan',
  'delivery-phase-plan',
  'prhythm-skill-review',
  'prhythm-skill-pr',
  'prhythm-docs',
];

const readText = (filePath) => fs.readFileSync(filePath, 'utf8');
const readJson = (filePath) => JSON.parse(readText(filePath));

const parseSkillFrontmatter = (skillSlug) => {
  const skillMdPath = path.join(SKILLS_DIR, skillSlug, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) return { rank: null, categories: [] };

  const text = readText(skillMdPath);
  if (!text.startsWith('---\n')) return { rank: null, categories: [] };

  const end = text.indexOf('\n---\n', 4);
  if (end < 0) return { rank: null, categories: [] };

  const fm = text.slice(4, end);
  const rankMatch = fm.match(/^rank:\s*(\S+)/m);
  const rank = rankMatch?.[1] ?? null;

  const categories = [];
  const lines = fm.split('\n');
  let inCategories = false;
  for (const line of lines) {
    if (/^categories:\s*$/.test(line)) {
      inCategories = true;
      continue;
    }
    if (inCategories) {
      const item = line.match(/^\s+-\s+(\S+)/);
      if (item) {
        categories.push(item[1]);
        continue;
      }
      if (/^[a-zA-Z_]/.test(line)) break;
    }
  }

  return { rank, categories };
};

const categoryBadgeHtml = (categories) =>
  (categories ?? [])
    .map(
      (cat) =>
        `<span class="skill-badge skill-badge--cat skill-badge--${cat}">${CATEGORY_LABELS[cat] ?? cat}</span>`,
    )
    .join(' ');

const sortSkillsByTaxonomy = (skills) =>
  [...skills].sort((a, b) => {
    const ra = RANK_ORDER.indexOf(a.rank ?? '');
    const rb = RANK_ORDER.indexOf(b.rank ?? '');
    if (ra !== rb) return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);

    const ca = CATEGORY_ORDER.indexOf(a.categories?.[0] ?? '');
    const cb = CATEGORY_ORDER.indexOf(b.categories?.[0] ?? '');
    if (ca !== cb) return (ca === -1 ? 99 : ca) - (cb === -1 ? 99 : cb);

    return a.title.localeCompare(b.title, 'ja');
  });

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
      const { rank, categories } = parseSkillFrontmatter(slug);
      return [
        slug,
        {
          slug,
          title: extractTitle(content),
          summary: extractSummary(content),
          link: `/skills/${slug}/`,
          rank,
          categories,
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

const syncReadme = (skillSlug, skillMeta) => {
  const content = readText(path.join(SKILLS_DIR, skillSlug, 'README.md'));
  const title = extractTitle(content);
  const description = extractSummary(content);
  const body = content.replace(/^#\s+.+\n+/, '');
  const frontmatter = toFrontmatter({
    title,
    skill: skillSlug,
    description,
    ...(skillMeta?.rank ? { rank: skillMeta.rank } : {}),
    ...(skillMeta?.categories?.length ? { categories: skillMeta.categories } : {}),
  });
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

const syncSkill = (skillSlug, skillsConfig, skillMeta) => {
  syncReadme(skillSlug, skillMeta);
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

const generateHome = (meta, skillRegistry) => {
  const allSkills = sortSkillsByTaxonomy(Object.values(skillRegistry));

  const legend = [
    '## 分類',
    '',
    '- **ランク** — `コア` は他スキルの入力になる成果物を出す / `ユーティリティ` は端末成果物や横断ツール / `メタ` はスキル自体の整備',
    '- **カテゴリ** — 誰が使うかではなく、注入する視点（`ビジネス` / `デザイン` / `テック` / `実行計画`）。2つ持つスキルは職能横断の対話誘発装置',
    '',
  ];

  const sections = [];
  for (const rank of RANK_ORDER) {
    const skills = allSkills.filter((s) => s.rank === rank);
    if (skills.length === 0) continue;

    const isMeta = rank === 'meta';
    sections.push(`## ${RANK_LABELS[rank]}`);
    sections.push('');
    if (isMeta) {
      sections.push('| スキル | 概要 |');
      sections.push('|--------|------|');
      for (const skill of skills) {
        sections.push(
          `| [${skill.title}](${skill.link}) | ${skill.summary.replace(/\|/g, '\\|')} |`,
        );
      }
    } else {
      sections.push('| スキル | カテゴリ | 概要 |');
      sections.push('|--------|----------|------|');
      for (const skill of skills) {
        const cats = categoryBadgeHtml(skill.categories) || '—';
        sections.push(
          `| [${skill.title}](${skill.link}) | ${cats} | ${skill.summary.replace(/\|/g, '\\|')} |`,
        );
      }
    }
    sections.push('');
  }

  // skills without rank (should not happen after taxonomy rollout)
  const unranked = allSkills.filter((s) => !s.rank);
  if (unranked.length > 0) {
    sections.push('## 未分類');
    sections.push('');
    sections.push('| スキル | 概要 |');
    sections.push('|--------|------|');
    for (const skill of unranked) {
      sections.push(
        `| [${skill.title}](${skill.link}) | ${skill.summary.replace(/\|/g, '\\|')} |`,
      );
    }
    sections.push('');
  }

  return [
    toFrontmatter({
      title: meta.home?.title ?? 'Prhythm Skills',
      description: meta.home?.description,
    }),
    `# ${meta.home?.title ?? 'Prhythm Skills'}`,
    '',
    meta.home?.intro ?? '',
    '',
    ...legend,
    ...sections,
  ].join('\n');
};

const sortSkillsBySidebarOrder = (skills) => {
  const index = new Map(SKILL_SIDEBAR_ORDER.map((slug, i) => [slug, i]));
  return [...skills].sort((a, b) => {
    const ia = index.has(a.slug) ? index.get(a.slug) : SKILL_SIDEBAR_ORDER.length;
    const ib = index.has(b.slug) ? index.get(b.slug) : SKILL_SIDEBAR_ORDER.length;
    if (ia !== ib) return ia - ib;
    return a.slug.localeCompare(b.slug);
  });
};

const buildRankGroupedSidebar = (skillRegistry, expandMap = {}) => {
  const groups = [];
  for (const rank of RANK_ORDER) {
    const skills = sortSkillsBySidebarOrder(
      Object.values(skillRegistry).filter((s) => s.rank === rank),
    );
    if (skills.length === 0) continue;

    groups.push({
      text: RANK_LABELS[rank],
      collapsed: rank === 'meta',
      items: skills.map((skill) =>
        buildSkillSidebarItems(skill.slug, skill, expandMap[skill.slug] ?? false),
      ),
    });
  }
  return groups;
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

  return expand
    ? { text: skill.title, collapsed: false, items }
    : { text: skill.title, link: skill.link };
};

const resolveSidebarItems = (items, ctx) =>
  (items ?? []).flatMap((item) => {
    if (item.groupSkillsBy === 'rank') {
      return buildRankGroupedSidebar(ctx.skills, item.expand ?? ctx.sidebarExpand ?? {});
    }

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
  for (const slug of skillSlugs) syncSkill(slug, skillsConfig, skillRegistry[slug]);

  const pageRegistry = {};
  for (const [pageId, pageConfig] of Object.entries(meta.pages ?? {})) {
    pageRegistry[pageId] = syncCustomPage(pageId, pageConfig);
  }

  writeFile(path.join(OUT_DIR, 'index.md'), generateHome(meta, skillRegistry));

  const resolved = {
    nav: meta.nav ?? [],
    sidebar: resolveSidebarItems(meta.sidebar ?? [], {
      pages: pageRegistry,
      skills: skillRegistry,
      sidebarExpand: skillsConfig.sidebarExpand ?? {},
    }),
    skills: skillSlugs,
    pages: pageRegistry,
    taxonomy: {
      ranks: RANK_LABELS,
      categories: CATEGORY_LABELS,
    },
  };

  writeFile(RESOLVED_META_PATH, `${JSON.stringify(resolved, null, 2)}\n`);

  const pageCount = Object.keys(pageRegistry).length;
  console.log(
    `sync-docs: ${skillSlugs.length} skills, ${pageCount} pages → ${path.relative(ROOT, OUT_DIR)}/`,
  );
};

main();
