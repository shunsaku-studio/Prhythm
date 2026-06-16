# Schema → Screen Mapping

## Schema → screen meaning

| Schema expression | Screen meaning |
|---|---|
| `type User { ... }` | One object kind |
| Fields | Display attributes |
| Lists | Collection views |
| Object references | Navigation or inline embed |
| `postCreate`-style mutations | Collection actions |
| `postPublish`-style mutations | Detail actions |

## OOUI scaffolding (out of scope)

After `src/model/schema.graphql` is stable, scaffold per-type OOUI screens (list, detail, action) in a separate task.

## Visualize schema

Paste `src/model/schema.graphql` into [Basedash GraphQL schema visualizer](https://www.basedash.com/tools/graphql-schema-visualizer).

## Example schema

[../templates/example.graphql](../templates/example.graphql)

```sh
bash skills/ooui-graphql-modeling/scripts/validate-schema.sh skills/ooui-graphql-modeling/templates/example.graphql
```

## Production and deep dives

See external links in [principles.md](principles.md).
