---
name: ooui-architect
description: >-
  common/model/pages OOUI architecture for frontend apps. Layer rules,
  4-file components, init-entity scaffold, test pyramid, Biome import order.
  Use for OOUI, directory layout, new entity, init-entity, component review,
  MODELS.ts, tests/TDD, or import organize.
disable-model-invocation: false
---

# OOUI Architect

Entry skill for common / model / pages. Read task docs before working.

## Always apply

- Layers: `common` → `model/common` → `model/{model}` → **framework routing dir**
- Page files in the routing dir only assemble `<EntityList />` etc. — no business logic
- **Detect the routing dir from the project** — Waku: `src/pages/`, Next: `src/app/`, Remix: `app/routes/` ([reference.md](reference.md))
- **Never add an OOUI-only routing dir**
- New entity → follow [docs/scaffold.md](docs/scaffold.md): scaffold `model/` + page files in the detected routing dir
- Model components take **object props** — `<ArticleCard article={article} />`
- Model dir: **singular** kebab-case. Route: **plural**

## Task router — read the matching doc first

| Task | Doc |
|------|-----|
| Placement, deps, MODELS | [docs/architecture.md](docs/architecture.md) |
| Components, naming | [docs/components.md](docs/components.md) |
| New entity, init-entity | [docs/scaffold.md](docs/scaffold.md) |
| Tests, TDD, extract to common | [docs/testing.md](docs/testing.md) |
| Import order, biome.json | [docs/biome-imports.md](docs/biome-imports.md) |
| Routing dir by framework | [reference.md](reference.md) |

## Execute

```sh
bash skills/ooui-architect/scripts/init-entity.sh article articles Article
bash skills/ooui-architect/scripts/apply-biome-imports.sh
```

If `init-entity.sh` fails, continue scaffold per [docs/scaffold.md](docs/scaffold.md) Phase 1 Step B.
