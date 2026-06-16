# SDL Conventions

Proto-stage GraphQL SDL. Domain-first ([principles.md](principles.md)).  
Examples: [schema-screen-mapping.md](schema-screen-mapping.md).

## Write

### type layer

- `id: ID!` on every object type
- Scalars, `enum`, relations (write with scalars in the same pass)
- `!` = always has a value. nullable = empty state allowed

### Mutation layer

- `type Mutation { ... }` at bottom
- `{object}{Verb}` camelCase
- Return updated `{Type}!`

### Query (minimal stub)

```graphql
type Query {
  _empty: String
}
```

## Do not write

- Constraints, indexes, validation, fragments, directives
- DB / resolver implementation details

## File layout

```
src/model/
├── schema.graphql     # SDL single source of truth
├── article/           # Article OOUI screen stubs (separate task)
└── ...
```

SDL lives only in `src/model/schema.graphql`. This skill's final output is that file.
