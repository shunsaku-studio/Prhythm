# Intake — input sources and missing-input fallback

Confirm what is on the table before decomposing. Never decompose against assumptions you have not surfaced to the user.

## Required input

- `docs/usecase-map.md` — produced by [usecase-mapper](../../usecase-mapper/SKILL.md). Contains:
  - `## ユースケース一覧` table with `UC ID`, `ユースケース`, `アクター`, `ドメイン`, `状態`, `関連API/画面`
  - Per-domain sections with use case diagrams and activity tables

Read the **ユースケース一覧** table and the **ドメイン概要一覧** first. They are sufficient inputs for Mode A in 90% of cases.

## Optional inputs

| Source | Path / format | What it adds |
|--------|---------------|--------------|
| Vision | `docs/product-vision.md` (or `docs/vision.md`) | One-line statement → MoSCoW Must yardstick |
| Competitive notes | inline chat or `docs/competitive-research/*` | Should / Could candidates with provenance |
| Hearing notes | `docs/hearing/*.md`, Notion exports | Constraints, deadlines, regulatory limits |

Read optional inputs only when present. Do not block on them.

## When `docs/usecase-map.md` is missing

Run the fallback in this order. Do **not** silently invent UC IDs.

1. **Suggest `/usecase-mapper` first.** One sentence: "先に `usecase-mapper` でユースケースマップを作ると機能の根拠が明確になります。先に走らせますか？"
2. If the user accepts → stop here and let `usecase-mapper` run; resume after.
3. If the user declines → run a **single-turn UC interview**:
   - Ask for 1-3 actors and 3-6 use cases in one message
   - Accept partial answers; do not loop more than once
   - Mint provisional UC IDs `UC-PROV-NN` and write them inline at the top of the output (not into a new `usecase-map.md`)
   - Tag every emitted feature with `(UC候補)` so the missing anchor is visible

## Anti-fabrication policy (inherits from usecase-mapper)

- **Never fill cells you cannot verify.** Use `—` for unknown API paths, screen routes, or actors.
- Distinguish "実装で確認できた" vs "文書に書いてある" vs "推測"; only the first two go into the inventory without `(UC候補)`.
- If two sources conflict (e.g. spec says X, code says Y), record both and let the user choose; do not silently pick.

## Reading order for usecase-map.md

1. `## ユースケース一覧` — the master table; this drives Step 2 decomposition
2. `## システム概要` → `アクター一覧` — used in User Story actor field for Mode B
3. Per-domain `### アクティビティ` tables — for `関連API/画面` to seed Mode A acceptance sketch and Mode B AC

Skip the Mermaid diagrams unless you need to verify a relationship.

## Hand-off to Step 1

After reading inputs, output a one-line summary:

```
📥 入力: docs/usecase-map.md (UC 全 N 件 / M ドメイン) + docs/product-vision.md
```

Then proceed to Step 1 of [SKILL.md](../SKILL.md).
