# Modeling Patterns

Read **before** writing SDL in Phase 1. Use with [principles.md](principles.md).

## Common AI failure patterns

| Failure | Countermeasure (principle) | Proto example |
|---------|---------------------------|---------------|
| Mirror DB tables as types | Domain-first (Shopify #3) | `articles` table → `Article { title, body }` only |
| Stuff everything into one type | MOIST — restrained in proto | Start with one `User`. Do not add `Viewer`/`Author` without reason |
| Flat attribute lists | Child type when separate lifecycle (Shopify #6 proto variant) | Book body as `Book.body` |
| Aggregate scalar only | Derive relations from capability | `likeCount` alone → no who / no notification |
| CRUD mutations | Domain verbs (Iron rule #5) | `updateArticle` → `articlePublish` |
| Skip reference observation | Web search / screen check in Phase 1 | Zenn Scrap as single `body` |
| Skip enums | Fixed value sets → `enum` | `status: String` → `ArticleStatus` |

## Bad → Good (few-shot)

### Scrap as single body

```graphql
# ❌ DB / notepad mirroring
type Scrap {
  id: ID!
  body: String!
}

# ✅ Thread container + posts + replies
type Scrap {
  id: ID!
  title: String!
  status: ScrapStatus!
  rootEntries: [ScrapEntry!]!
}
type ScrapEntry {
  id: ID!
  body: String!
  parent: ScrapEntry
  replies: [ScrapEntry!]!
}
```

### Like as count only

```graphql
# ❌ Mirror screen number only
type Article {
  likeCount: Int!
}

# ✅ State (who) + aggregate + event (notification)
type Like { id: ID!, user: User!, article: Article! }
type Notification { kind: NotificationKind!, actor: User!, article: Article! }
type Article {
  likeCount: Int!
  likes: [Like!]!
}
```

### Book body inline

```graphql
# ❌ One file = one type mirroring
type Book {
  id: ID!
  body: String!
}

# ✅ Container + chapters
type Book {
  id: ID!
  title: String!
  chapters: [Chapter!]!
}
type Chapter {
  id: ID!
  slug: String!
  body: String!
  book: Book!
}
```

## State vs events (lightweight)

In Phase 1 Step 0, list "what happens" from tasks:

| Domain event | State that changes | Record (persists) |
|--------------|-------------------|-------------------|
| Liked | `Like` created, `likeCount` up | `Notification` ARTICLE_LIKED |
| Unlike | `Like` removed, `likeCount` down | notification remains |
| Article published | `Article.status` | `FOLLOWEE_ARTICLE_PUBLISHED` to followers |

**Rule:** If "current state" and "something that happened in the past" differ, use separate types.

## Observation checklist (before writing SDL)

1. **Reference product** — check at least one feature from a product the user named (web search OK)
2. **Container / content** — parent holds meta; body/posts are child types?
3. **Relation vs aggregate** — if who×what matters, use relation type + scalar if needed
4. **Event vs state** — filled the table above?
5. **Thread** — if append/reply exists, child posts + `parent` / `replies`
6. **List view fields** — each type has fields visible in a list?
7. **Not DB mirroring** — not using table names or screen labels as-is?

## Common patterns

### Container + child content

```
Book (title, cover, price) ── chapters[] ──► Chapter
Scrap (title, status)      ── rootEntries[] ──► ScrapEntry (parent, replies)
Article (1 post = 1 body)  ── body lives on Article
```

Child type criteria: **separate lifecycle**, **separate mutation** (`chapterCreate` vs `bookPublish`).

### Relation record vs aggregate

| Requirement | Model |
|-------------|-------|
| Count only | `likeCount` |
| Who / Unlike | `Like` + `likeCount` |
| Notify author | `Notification` |

### MOIST (context-specific types) — restrained in proto

```
Default: one User for author, commenter, liker
Consider split: when list-card info differs completely across 3 screens
```

Do not proliferate `Author` / `Viewer` / `Member` early in proto.

### Sub-objects — restrained in proto

```
Default: flat scalars on type (title, avatarUrl, bio)
Child type: when independent create/list/lifecycle (Chapter, ScrapEntry)
Value-object nesting: only when 3+ fields repeat as a set across types
```

### Comment vs ScrapEntry

Article comments and scrap replies are **separate types** (different actions, screens, meaning).

### enum

Fixed sets like `DRAFT` / `PUBLISHED`, `OPEN` / `CLOSED`, `NotificationKind` → `enum`. Avoid `interface` / `union` unless requested.

## Phase 1 self-review (before showing user)

Include in Structure ready message:

- [ ] Reference product feature mapping (one line each)
- [ ] Domain event list (state vs record)
- [ ] List view fields per type
- [ ] Parent/child and N:M refs
- [ ] Confirmed avoidance of DB/UI mirroring
