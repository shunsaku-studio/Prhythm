# Architecture

## Layers

| Layer | What it is |
|-------|------------|
| `common` | Portable — works in other projects |
| `model/common` | App-wide, not tied to one object |
| `model/{model}` | Per-object OOUI (**singular** kebab-case) |
| Routing dir | Thin assembly shell — dir name follows the framework (see [reference.md](../reference.md)) |

**Page components belong in the framework routing dir** — see [reference.md](../reference.md). Never add an OOUI-only dir.

## Dependency flow

```
routing dir → model/{model} → model/common → common
              ↘ model/{other} (cross-object links)
```

- `common` never imports `model`
- No business logic or domain types in the framework routing dir
- Types, URLs, related objects → `model/{model}/type.ts` + `path.ts`

## OOUI rules

1. **Object-centric** — nav, URL, types, screens center on `model/{model}`
2. **Route files are entry points** — routing dir only assembles `<EntityList />` etc.
3. **Views under the model** — `list/`, `detail/`, `form/`, `preview/` (4-file folder → [components.md](components.md))
4. **MODELS catalog** — `model/common/const/MODELS.ts`
5. **Related objects** — ref types in `type.ts`, paths in `path.ts`
6. **Object props** — `<UserAvatar user={user} />` (see [components.md](components.md))

## MODELS.ts

`model/common/const/MODELS.ts` = registry of app objects.

```ts
export const MODELS = {
  Article: { label: 'Article' },
} as const;
```

- Labels for nav, titles, breadcrumbs
- `init-entity.sh` appends on new model
- Type source of truth: `type.ts`. Label source of truth: `MODELS`

More: [reference.md](../reference.md)

## Naming

| Target | Form | Example |
|--------|------|---------|
| model dir | singular | `src/model/article/` |
| URL route | plural | `src/pages/articles/` or `src/app/articles/` |

## Placement checklist

1. No project-specific names? → try `common` first
2. Portable elsewhere? → `common`
3. App-specific, not one object? → `model/common`
4. One object's types/screens? → `model/{model}`
5. URL + Provider wiring only? → framework routing dir ([reference.md](../reference.md))

## common/ (overview)

```
common/ui/       — visual UI
common/effects/  — side-effect components (render null)
common/hooks/    — logic
common/lib/      — pure functions
```

Details: [components.md](components.md)
