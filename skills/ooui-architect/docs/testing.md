# Testing

## Strategy

Push logic to `common`. **Most tests live in common.**

| Layer | Volume | Coverage target |
|-------|--------|-----------------|
| `common` | **High** | ~80%+ |
| `model/common` | Medium | Cross-cutting essentials |
| `model/{model}` | Low | Wiring, critical paths |
| `pages` / `app` | **Minimal** | Smoke / e2e |

## Rules

1. Test next to logic — `lib/converter.test.ts`
2. Test `common` heavily (fast, stable)
3. `model` tests wiring only — don't re-test logic
4. No business logic tests in `pages` / `app`

## Extract to common

| Move to common | Path |
|----------------|------|
| Validation, predicates, transforms | `common/lib/` |
| Date, string, URL formatting | `common/lib/` |
| Generic input UI (no domain names) | `common/ui/` |

Before adding to `model`:

1. Does it mention project-specific names?
2. If not, put it in `common`
3. Pure functions in `model` → move to `common/lib/` on review

`model/view.tsx` should wire OOUI props only. Logic goes to `common`.

## TDD flow

```
1. Extract logic to common/lib
2. Write unit tests in common first
3. Model only wires common
4. Add one model integration test if needed
```

## Sample

[templates/common/lib/example.test.ts](../templates/common/lib/example.test.ts)

Use the project's test runner. If none, prefer bun:test or vitest.

`*.test.ts` sits beside source — not in a `tests/` folder (avoid path duplication).
