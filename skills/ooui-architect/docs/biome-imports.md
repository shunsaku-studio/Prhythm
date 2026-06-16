# Biome imports

## Rule

Imports ordered **abstract → concrete**, blank lines between groups:

```
:NODE: → :PACKAGE: → @/env → @/common → @/gql → @/model → @/pages|@/app → :PATH:
```

Matches dependency flow (`common` → `model` → `pages` / `app`) so wrong-direction imports stand out.

## Apply

```sh
bash skills/ooui-architect/scripts/apply-biome-imports.sh
```

- `src/pages/` present → `@/pages` group
- `src/app/` present → `@/app` group
- `@/env`, `@/gql` dropped if those dirs don't exist

Groups: [templates/biome-import-groups.json](../templates/biome-import-groups.json)

Run **after** `src/model/` exists so `@/model` is included.

## biome.json shape

```json
"organizeImports": {
  "level": "on",
  "options": { "groups": ["..."] }
}
```

`apply-biome-imports.sh` merges this without touching other linter/formatter rules.

## Custom layers

Add project layers (e.g. `@/schema`) between `@/common` and `@/model`. Keep order: portable → data → domain → routing dir.
