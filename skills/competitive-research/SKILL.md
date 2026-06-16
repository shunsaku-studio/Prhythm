---
name: competitive-research
description: Research competing and reference services when building a new product or feature. Use when the user wants to survey products in a space, find competitors or reference services, compare UX/business models/positioning, or explore how others solve a similar problem. Triggers on "research competitors", "what services exist in X", "find similar products", "competitive analysis", "reference services for my product idea", "how are others solving Y", "競合調査", "参考サービス", "類似サービスを探して", "ポジショニング整理".
disable-model-invocation: false
---

# Competitive / Reference Service Research

Research existing services when building a new product. Two-phase process: broad scan first, then deep dive on selected services.

Goal: help the user make design decisions for their own product, not just list services.

Deliver all output as inline Markdown in chat so the user can discuss and iterate.

**Before finishing any phase:** read [references/output-checklist.md](references/output-checklist.md) and confirm all items pass.

## Reference templates

| File | Use |
|------|-----|
| [phase0-template.md](references/phase0-template.md) | Research frame table + category-only input rule |
| [phase1-template.md](references/phase1-template.md) | Broad scan catalog + Recommended section |
| [phase2-template.md](references/phase2-template.md) | Profiles, cross-comparison, insights |
| [shortlist-selection.md](references/shortlist-selection.md) | Picking 5–8 services; frame-change re-selection |
| [sentiment-sources.md](references/sentiment-sources.md) | Review source priority + 3 praised / 3 complaints |
| [output-checklist.md](references/output-checklist.md) | Pre-send quality gate |

Follow template section order. Do not skip sections marked required in templates.

## When to use

Use:
- "What services exist in the X space?"
- "Research competitors for my product idea"
- "What approaches are others taking to solve Y?"
- Planning a new product/feature and need reference points

Do NOT use:
- One specific service's features only, without broader product design context (answer inline or Phase 2 Layer 1 profile only)
- General market size / industry analysis without product design intent

---

## Phase 0: Frame the research question

Before searching, clarify with the user:

1. **Problem statement** — What user problem does their product solve? (not "what category" but "what pain")
2. **Scope** — Any constraints on geography, platform, target segment?
3. **Focus** — What aspect matters most: UX patterns, business models, feature coverage, or positioning gaps?

Output the **Research Frame** table from [phase0-template.md](references/phase0-template.md) at the start of Phase 1 (and update it when the frame changes before Phase 2).

### Category-only input (required behavior)

If the user names only a **category** (e.g. "家事代行", "booking SaaS") without pain, segment, or product intent:

1. **Ask one minimum question** — who is the primary user and what pain are they solving? (template wording in phase0-template.md)
2. If the user does not answer in the same turn, **state assumptions** labeled `(前提)` and proceed to Phase 1
3. Do **not** treat category alone as sufficient context for Phase 2 recommendations

If the user already provided pain, segment, or product intent in conversation, skip asking and state assumptions.

---

## Phase 1: Broad Scan

**Goal:** Build a scannable catalog. Default **15–20** services; extend to 30 only if the user asks for a wider scan.

Full output structure: [phase1-template.md](references/phase1-template.md)

### Search strategy

Search across three axes. Run 5–10 web searches varying keywords:

- **Function axis** — Services doing the same thing. Search: "[problem] tool", "[problem] app", "[problem] SaaS". Also search adjacent domains where the same verb applies (e.g., "booking" exists in restaurants, healthcare, facilities).
- **UX axis** — Services using similar interaction patterns regardless of domain. Search: "[interaction pattern] UI examples", "[pattern] app".
- **User context axis** — What the target user currently uses as workaround. Search: "[target user role] [problem] workflow", "[problem] spreadsheet alternative", "[problem] slack bot".

Also check at least **two** of: Product Hunt, G2/Capterra, Crunchbase, Y Combinator directory, App Store categories, STARTUP DB (Japan), INITIAL (Japan).

### Output format for Phase 1

Use the per-service entry format in [phase1-template.md](references/phase1-template.md). Keep each entry short — the user needs to scan 15–20 items quickly.

After the full list, add **Recommended for Deep Dive** (see phase1-template.md). Include a table mapping each pick to what it teaches. This section is the most important output of Phase 1. Do not skip it.

### Phase 1 anti-patterns

See Phase 1 and **Anti-patterns (fail if true)** in [references/output-checklist.md](references/output-checklist.md). Search and entry rules: [phase1-template.md](references/phase1-template.md).

---

## Phase 2: Deep Dive

**Goal:** Produce actionable insights for the user's product design decisions.

Full output structure: [phase2-template.md](references/phase2-template.md)

### Triggers

- User selects services from Phase 1 list
- User says "dig deeper into these" or "let's analyze X, Y, Z"
- User provides their own shortlist
- User **refines the research frame** (new segment, pain, or focus) — run Phase 2 with a **re-selected shortlist**; see [shortlist-selection.md](references/shortlist-selection.md)

### Selection Rationale (required)

Before profiles, output the **Selection Rationale** table:

| Service | From Phase 1? | Why selected for this frame |
|---------|---------------|----------------------------|

Explain dropped well-known services when non-obvious. If the agent picks without user input, say so and invite swaps.

Run **2–4 web searches per service**. Sentiment: follow [sentiment-sources.md](references/sentiment-sources.md).

### Output structure — three layers

#### Layer 1: Individual Profiles (per service)

For each service, output the structure in [phase2-template.md](references/phase2-template.md). **User sentiment** must use a 3 praised + 3 complaints table — not bullet lists only.

#### Layer 2: Cross-comparison

Follow **Cross-Comparison** in [phase2-template.md](references/phase2-template.md): Approach Matrix + Positioning Map.

Pick 3–5 design dimensions from the user's research frame (not generic "simple vs rich"). Positioning axes must reflect real trade-offs — e.g. "Self-serve onboarding vs Sales-led" × "Single-player vs Team-first", not "Simple vs Feature-rich".

#### Layer 3: Insights (most important)

Follow **Insights for Your Product** in [phase2-template.md](references/phase2-template.md): Common patterns, Differentiation types, Opportunities, and **Borrow / Avoid** recommendations.

Synthesize — do not summarize. "Most services assume Z, but user reviews show that assumption breaks for [segment]" is synthesis; listing what each service does is not.

### Phase 2 anti-patterns

See Phase 2 and **Anti-patterns (fail if true)** in [references/output-checklist.md](references/output-checklist.md).

---

## Search guidelines

- Search in both English and Japanese (and other languages if the user's market demands it)
- Prefer primary sources: official sites, GitHub repos, founder interviews, app store pages
- For user sentiment: follow priority in [sentiment-sources.md](references/sentiment-sources.md)
- Reviews at 2-3 stars are most informative — they show both value and frustration
- When a founder interview or podcast summary exists, it often reveals design rationale not visible on the product page
- Always check if a service has pivoted, renamed, or shut down before including it
- Tag unverified facts with `要確認`; do not present aggregator blog pricing as confirmed

---

## After each phase

Do not end with just the output. Add:
- Any gaps or uncertainties in the research (services you couldn't verify, markets you didn't cover)
- 1-2 suggested next steps ("want me to deep-dive on these 5?", "should I look at pricing models specifically?", "I noticed a pattern in onboarding — want me to compare those flows in detail?")

This keeps the research iterative rather than one-shot.
