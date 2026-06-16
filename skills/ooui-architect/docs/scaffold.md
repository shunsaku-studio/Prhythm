# Scaffold

Components: [components.md](components.md)

## Workflow

```
Phase 0  detect     → framework routing dir (see reference.md)
Phase 1  scaffold  → model/ + page files in that dir
Phase 2  wire      → nav, Provider initial state
Phase 3  implement → fill in components/*
```

**Gate**: after Phase 1, show generated files to user before Phase 2.

## Phase 0 — detect routing dir

1. Inspect repo layout and dependencies (Waku, Next, Remix, …).
2. Identify the framework routing dir ([reference.md](../reference.md)).
3. Read an existing route file if present — match its naming and export style.

## Phase 1 — scaffold

**Step A — model/** (always):

```sh
bash skills/ooui-architect/scripts/init-entity.sh article articles Article
```

When `src/pages/` or `src/app/` exists, the script scaffolds `model/` **and** route files.

When the script exits non-zero (no `src/pages/` / `src/app/`): copy [templates/model/xxx/](../templates/model/xxx/), update MODELS, apply placeholders — same as the script's model phase.

**Step B — page files** (when Step A did not create them):

Write list + detail page files under the detected routing dir. Only assemble model components — follow [Route shell](#route-shell). Use [templates/pages/](../templates/pages/) or [templates/app/](../templates/app/) as starting points; adapt file paths and names to the framework.

**Never create an OOUI-only routing dir.**

**Phase 3 only** (not in Phase 1): Zustand, GraphQL, `hooks/`, `query.ts`

## Templates

| Path | Purpose |
|------|---------|
| [templates/model/xxx/](../templates/model/xxx/) | Model stub |
| [templates/model/common/const/MODELS.ts](../templates/model/common/const/MODELS.ts) | MODELS seed |
| [templates/pages/](../templates/pages/) | Page shell reference (`src/pages/`) |
| [templates/app/](../templates/app/) | Page shell reference (`src/app/`) |

Placeholders: `__ENTITY__`, `__entity__`, `__route__`, `__label__` (not `{{}}` — Biome breaks JSX)

## Route shell

Wrap `Suspense` in page files — model `index.tsx` is an async container only.

```tsx
import { Suspense } from 'react';

import { ArticleList, ArticleListLoading } from '@/model/article/components/list';

export default async function ArticleListPage() {
  return (
    <main>
      <h1>Articles</h1>
      <Suspense fallback={<ArticleListLoading />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
```

## Naming

- model: **singular** `article`
- route: **plural** `articles`
- irregular plurals: pass explicitly in arg2 (`person` → `people`)
