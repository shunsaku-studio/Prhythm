# Extraction

Derive types and mutations from capabilities (use cases).  
Input is the **user message** (conversation requirements).  
Read [principles.md](principles.md) and [modeling-patterns.md](modeling-patterns.md) before writing SDL.

## Inputs (from user message)

| Source | Yields |
|--------|--------|
| App summary and purpose | Scope boundary |
| 3–5 main tasks | Primary nouns and verbs |
| Reference products | Phase 1 observation targets |
| Out of scope / assumptions | Boundary decisions |
| Domain events (listed in Phase 1) | State types vs event types |

## Phase 1 prep (structure Step 0)

### A. Requirement summary (chat only)

Organize from the user message and paste into Structure ready. Do not create separate files.

### B. Reference product observation

Check the relevant feature via web search or known knowledge. Summarize observation notes in 3–5 lines.

### C. Domain event listing (lightweight)

| Event | State that changes (types) | Record that remains (types) |
|-------|---------------------------|------------------------------|
| Article liked | Like, Article.likeCount | Notification |

## Noun → type

### Step 1: List nouns from tasks

Extract nouns from each "the user wants to …". **Do not copy DB table names or screen labels as types.**

### Step 2: Merge and decide aggregates

| Situation | Decision |
|-----------|----------|
| Same concept, different words | One type |
| Noun is a property of another | Field on parent |
| Noun is a value set | `enum` |
| Body hangs off a parent | Container + child type |
| Who × what combination | Relation type + aggregate scalar if needed |
| Record of something that happened | Notification, etc. |

### Step 3: Minimum fields per type

- `id: ID!`
- Scalars for list view
- Scalars for detail view
- Relations (write together with scalars)

## Verb → Mutation

### Step 1: List verbs from tasks + domain events

### Step 2: Classify — collection vs single-object

### Step 3: Name `{object}{Verb}`

### Step 4: Return updated `{Type}!`

## Phase boundaries

| Phase | Extract |
|-------|---------|
| 1 structure | observation + events + nouns → types + relations |
| 2 mutations | verbs + events → Mutation fields |
