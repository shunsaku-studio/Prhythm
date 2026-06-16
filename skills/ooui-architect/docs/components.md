# Components

## 4-file folder

`model/{model}/components/{view-name}/`:

```
{view-name}/
├── index.tsx    — async container (fetch → view)
├── server.tsx   — fetch functions only (no JSX)
├── view.tsx     — display (object props)
└── loading.tsx  — Suspense fallback
```

| File | Role |
|------|------|
| `index.tsx` | Async container; wires fetch + view |
| `server.tsx` | `fetch{Entities}`, `fetch{Entity}ById`, etc. — no components |
| `view.tsx` | OOUI UI; add `'use client'` if needed |
| `loading.tsx` | Skeleton; no data |

`pages` / `app` imports container + loading from `index` only (`index` re-exports `loading`). Wraps `Suspense` itself. Never import `server` / `view` / `loading` directly from outside the folder.

```tsx
// server.tsx — fetch only
export async function fetchArticles(): Promise<Article[]> { ... }

// index.tsx — container + re-export loading
export { ArticleListLoading } from './loading';

export async function ArticleList() {
  const entities = await fetchArticles();
  return <ArticleListView entities={entities} />;
}

// pages — assembly (single import path)
import { ArticleList, ArticleListLoading } from '@/model/article/components/list';

<Suspense fallback={<ArticleListLoading />}>
  <ArticleList />
</Suspense>
```

New views (`preview/` etc.) use the same 4-file set.

## OOUI props

```tsx
// OK
<UserAvatar user={user} />
<ArticleCard article={article} />

// NG — object as unit of concern is lost
<UserAvatar name={name} iconUrl={iconUrl} />
```

- Model components take objects (or id + loaded object) as core props
- Split fields **inside** the component
- `common/ui` is object-agnostic; model hooks/stores bridge object ↔ fields

## Naming — no path duplication

```
NG  hooks/use-list-filter.ts
OK  hooks/list-filter.ts  → export function useListFilter()
```

| Kind | Path | Symbol |
|------|------|--------|
| hook | `hooks/{kebab}.ts` | `use{Pascal}` |
| const | `const/{topic}.ts` | `STATUS_LABELS` etc. |
| lib | `lib/{topic}.ts` | function name |
| view | `view.tsx` | `{Entity}{View}View` |
| fetch | `server.tsx` | `fetch{Entities}` / `fetch{Entity}ById` |
| container | `index.tsx` | `{Entity}{View}` |

## Where to put code

| Content | Location |
|---------|----------|
| Shared across views | `model/{model}/hooks/`, `lib/`, `const/`, `query.ts` |
| One view only | `components/{view}/hooks/`, `lib/`, `store/` |
| Fetch functions | `server.tsx` (no JSX) |
| Wire fetch + view | `index.tsx` |
| Form state | `components/{view}/store/` |

## common/

| Kind | Path | Examples |
|------|------|----------|
| Visual UI | `common/ui/` | `TextInput`, `Dialog` |
| Side effects (null render) | `common/effects/` | `BeforeUnload` |
| Logic | `common/hooks/` | `useBeforeUnload` |

Hook holds logic; effect is a thin declarative wrapper. Providers with children → `common/ui/theme-provider/`.

## Model naming

**Singular** kebab-case (`article`). URL route **plural** (`articles`).
