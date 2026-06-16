# Design Principles (proto)

Curated principles for proto SDL. See external resources for full depth.

## Adopt (use with Iron rules)

| # | Principle | Source | Proto meaning |
|---|-----------|--------|---------------|
| 1 | **Design for the business domain — do not mirror DB / UI / REST** | [Shopify #3](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md#3-designing-for-the-business-domain) | Derive types from user tasks and domain vocabulary, not table shapes or naive screen mirroring |
| 2 | **Derive types from capabilities (use cases)** | [WunderGraph](https://wundergraph.com/blog/graphql-schema-design-principles) | "The user wants to …" → nouns/verbs → type / mutation |
| 3 | **Expose only what is needed** | [Shopify #4](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md#4-designing-for-the-long-term) | Even in proto, ask "needed in a list view?" per field. Hard to remove in production |
| 4 | **Map domain verbs to mutations** | Shopify, Stemmler | Do not collapse to `updateX` / `deleteX`. Derive `articlePublish` etc. from events |
| 5 | **Separate state and events** | Stemmler (lightweight) | `Like` (current state) and `Notification` (something that happened) are different types |

## Proto vs production boundaries

| Principle | Production API | Proto SDL |
|-----------|----------------|-----------|
| **MOIST** (different context → different type) | May split `Viewer` / `Author` | Default to one `User`. Split only when the **information set shown** clearly differs |
| **Group into sub-objects** (Shopify #6) | `Profile { name, avatar }` etc. | Flat scalars on types by default. Child types when **separate lifecycle** (Book/Chapter) |
| **interface / union** | Polymorphism | Prefer `enum` in proto. union/interface only on explicit user request |
| **Fields cannot be removed** | Strict in production | Proto can be rebuilt. Note in references as caution |

## Domain events (lightweight)

Full Event Storming is not required. List from user tasks in Phase 1 Step 0:

```
Article published → articlePublish, notify followers
Article liked → articleLike, create Like, notify author
```

→ Material for separating **types that change state** (Article, Like) from **record-only types** (Notification).

## External resources (production / deep dives)

| Resource | URL | When to read |
|----------|-----|--------------|
| Shopify GraphQL Design Tutorial | https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md | Naming, structure bad/good examples |
| WunderGraph 10 Principles | https://wundergraph.com/blog/graphql-schema-design-principles | capability, MOIST |
| Stemmler Event Storming → GraphQL | https://khalilstemmler.com/articles/graphql/ddd/schema-design/ | events → commands |
| Apollo Demand-Oriented Design | https://www.apollographql.com/docs/graphos/schema-design/guides/demand-oriented-schema-design | incremental evolution |
| Principled GraphQL | https://principledgraphql.com/ | schema boundaries |
| graphql-style-guide | https://github.com/hendrikniemann/graphql-style-guide | naming, type details |
