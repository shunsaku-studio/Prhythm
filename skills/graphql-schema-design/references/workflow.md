# Workflow

Phased gates are mandatory. Read [principles.md](principles.md) and [modeling-patterns.md](modeling-patterns.md) before Phase 1.

**Upstream:** user requirements from the conversation  
**Output:** `src/model/schema.graphql`

## Phase 0 — init

```sh
bash skills/graphql-schema-design/scripts/init-schema.sh
```

- Creates `src/model/schema.graphql` stub (`Query` only)
- Fails if `src/model/schema.graphql` already exists (use edit mode instead)

## Phase 1 — structure ⛔

Read app summary, tasks, and reference products from the user's message.  
Read [extraction.md](extraction.md) Step 0 first.

### Step 0 — Observe + domain events (required before SDL)

1. **Summarize requirements** — app, tasks, reference products, out of scope (chat only; no separate files)
2. **Observe** — check the relevant feature on reference products (web search OK)
3. **List domain events** — table what happens from tasks (state vs record)
4. **DB/UI mirroring check**

### Step 1–4 — SDL

5. Extract nouns → type candidates
6. Merge synonyms; decide aggregates
7. Write to `src/model/schema.graphql` **in one pass**:
   - `id: ID!` on every type
   - Scalars + enums
   - Object refs and lists
8. **No mutations yet**
9. Run validate + modeling-patterns self-review

```sh
bash skills/graphql-schema-design/scripts/validate-schema.sh src/model/schema.graphql
```

**Stop.** Show:

```
Structure ready.

## 要求サマリ（チャット要約）
## 観察メモ（3–5行）
## ドメインイベント（状態 vs 記録の表）
## type 一覧
## 関係一覧
## schema.graphql（全文または主要部分）

Reply "OK" to continue, or give fixes.
Mutation はまだ触らない。
```

## Phase 2 — mutations ⛔

Start only after structure OK. Rules: [extraction.md](extraction.md), [sdl-conventions.md](sdl-conventions.md).

1. Extract verbs from tasks + domain events
2. Classify: collection vs single-object actions
3. Name `{object}{Verb}` — domain verbs, not CRUD
4. Append `type Mutation { ... }` to `src/model/schema.graphql`
5. Each mutation returns updated `{Type}!`
6. Run validate

**Stop.** Show mutation list and full SDL:

```
Mutations ready.（mutation 一覧と schema.graphql を貼る）
Reply "OK" to validate and finish, or give fixes.
```

## Phase 3 — validate

Start only after mutations OK.

```sh
bash skills/graphql-schema-design/scripts/validate-schema.sh src/model/schema.graphql
```

Tell the user:

```
Schema done: src/model/schema.graphql

Visualize: paste SDL into Basedash GraphQL schema visualizer
https://www.basedash.com/tools/graphql-schema-visualizer
```

## Gate summary

| Phase | Output | Stop for user? |
|-------|--------|----------------|
| 0 init | `src/model/schema.graphql` stub | No |
| 1 structure | observation + events + SDL | **Yes** |
| 2 mutations | `type Mutation` | **Yes** |
| 3 validate | validated SDL | No |

## Edit mode

When `src/model/schema.graphql` exists:

- Edit `src/model/schema.graphql` directly
- Re-run validate after changes
- Re-paste into Basedash to refresh diagram
