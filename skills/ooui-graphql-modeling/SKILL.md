---
name: ooui-graphql-modeling
description: >-
  Proto-stage GraphQL SDL design: capability→type, verbs→mutation, domain-first.
  Use when designing domain schema, GraphQL SDL, schema.graphql, or domain modeling.
disable-model-invocation: false
rank: core
categories:
  - tech
  - business
---

# OOUI GraphQL Modeling

Phased domain modeling: user requirements → structure → mutations → validate.  
**Input:** requirements in the conversation (app summary, tasks, reference products).  
**Output:** `src/model/schema.graphql`.

Use the Task router below; read the linked doc for the current phase.

## Iron rules

1. **GraphQL SDL is single source of truth** — all structure lives in `src/model/schema.graphql`
2. **type = object, Mutation = action**
3. **Design for the business domain** — not DB tables, REST payloads, or naive UI mirroring ([principles.md](references/principles.md))
4. **No constraints, validation, or fragments** — proto focuses on structure and actions only
5. **Mutation naming: `objectVerb`** — e.g. `postPublish`, not `updatePost(status: PUBLISHED)`
6. **Mutations return updated object** — for UI re-render after action
7. **Never skip gates** — structure OK → mutations OK, in that order
8. **One phase per turn** — do not advance until the user says continue
9. **No Mermaid ER** — paste SDL into [Basedash visualizer](https://www.basedash.com/tools/graphql-schema-visualizer)
10. **Before Phase 1, read [modeling-patterns.md](references/modeling-patterns.md) + [principles.md](references/principles.md)**

## Phases

```
Phase 0  init        → init-schema.sh → stub at src/model/schema.graphql → proceed to Phase 1
Phase 1  structure   → observe → types + relations  → ⛔ user approval
Phase 2  mutations   → ⛔ user approval
Phase 3  validate    → validate src/model/schema.graphql
```

Phase 0 done when stub exists (`Query` only). Fails if `src/model/schema.graphql` already exists — use edit mode instead.

## Upstream input (conversation only)

Read from the user's message:

- What the app is, who uses it
- 3–5 tasks ("the user wants to …")
- Reference products (if any)
- Out of scope / assumptions

At Phase 1 **Structure ready**, paste the summary in chat. Do not create separate requirement files.

## Task router

| Task | Doc |
|------|-----|
| Full workflow, gate messages | [workflow.md](references/workflow.md) |
| Curated principles + external links | [principles.md](references/principles.md) |
| Modeling quality, bad/good examples | [modeling-patterns.md](references/modeling-patterns.md) |
| Noun/verb extraction, domain events | [extraction.md](references/extraction.md) |
| SDL conventions | [sdl-conventions.md](references/sdl-conventions.md) |
| Schema→screen mapping | [schema-screen-mapping.md](references/schema-screen-mapping.md) |
| Reference SDL example | [example.graphql](templates/example.graphql) |

## Modes

| User intent | Phases |
|-------------|--------|
| New schema | 0 → 1 → 2 → 3 |
| Add / fix types & relations | 1 |
| Add mutations | 2 |
| Edit existing SDL | edit `src/model/schema.graphql` directly, re-validate |

## Edit boundaries

**NEVER**

- Create requirement artifact files — keep requirements in the conversation
- Mirror DB schemas, REST APIs, or screen fields without domain reasoning
- Generate Mermaid ER diagrams
- Add constraints, validation, fragments, or DB details
- Collapse domain verbs into CRUD (`updateX`, `deleteX` unless domain uses that verb)
- Advance past a gate without user OK
- Scaffold application code — out of scope for this skill

**MAY**

- `src/model/schema.graphql`

## Common commands

```sh
bash skills/ooui-graphql-modeling/scripts/init-schema.sh
bash skills/ooui-graphql-modeling/scripts/validate-schema.sh src/model/schema.graphql
```

## After Phase 3

Schema design is done. The object model connects to per-type OOUI scaffolding (list, detail, action screens) in a separate task.

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/ooui-graphql-modeling/templates/docs/sections.html docs/prhythm/ooui-graphql-modeling/index.html --title "…"`
4. Write `docs/prhythm/ooui-graphql-modeling/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

