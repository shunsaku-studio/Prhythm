---
name: product-vision-and-concept
description: >-
  Facilitates creation of product vision and concept through dialogue. Delivers a
  one-line statement plus Why / Who / What / How it's different. Use when the user
  wants to write a vision statement, concept statement, mission statement, one-line
  concept, product Why, or product direction in words. Also triggers on "can't explain
  the product well", "team alignment is off", "want to write the PRD intro", or when
  the user shares an existing vision and asks for feedback or improvement. Triggers
  include ビジョンステートメント, コンセプトステートメント, プロダクトの方向性, 一行コンセプト,
  ミッションステートメント, PRD冒頭.
disable-model-invocation: false
---

# Product Vision & Concept

Facilitate — do not ghostwrite. Draw material out through questions, present draft variations, refine together until the user lands on words they own.

Goal: the user says "this is it" — not "the AI wrote something nice."

## Fixed deliverable

Every session aims at **one output shape** — do not ask the user to pick output "types":

1. **One-line statement** — North Star; one breath; outcome, not features
2. **Concept** — four labeled paragraphs: **Why** / **Who** / **What** / **How it's different**

Never expose internal labels (A/B/C, Moore, etc.) to the user. Speak in terms of「一行ステートメント」「Why / Who / What / How it's different」.

If the user asks only for a one-liner or only for concept paragraphs, still draft both internally and offer the missing piece briefly — the default is the full pair.

## Reference files

| File | When to read |
|------|--------------|
| [references/frameworks.md](references/frameworks.md) | Phase 3 draft generation — writing rules for one-liner and concept |
| [references/examples.md](references/examples.md) | Tone and granularity for drafts; quality comparison |
| [references/antipatterns.md](references/antipatterns.md) | Phase 6 diagnosis |

Read reference files at the relevant phase. Do not load all upfront.

---

## When to use

- Vision / concept / mission creation from scratch
- Product direction needs to be put into words
- PRD intro needs a concept statement
- Existing vision pasted with "what do you think?" or "improve this"

## When NOT to use

- Full competitive analysis → use competitive-research skill
- GraphQL / domain schema design → use ooui-graphql-modeling skill
- General product strategy without language output (roadmap, OKR, etc.)
- Standalone elevator pitch / Moore positioning only → out of scope for this skill

---

## Phase routing

| Situation | Start at |
|-----------|----------|
| New creation, little context | Phase 1 |
| User already explained the product in detail | Phase 2 (skip answered questions) |
| Existing statement + review request | Phase 6 |
| Draft exists, user wants tone/word tweaks | Phase 5 |
| User says done / OK / 完成 / 終わり | Phase 6 → Final deliverable (back-to-back) |

Announce the current phase briefly. One phase per turn unless the user asks to continue.

---

## Phase 1: Intake & scope

Confirm:

1. **Product name** — if unknown, proceed with `(仮)` and invite correction
2. **Language** — Japanese, English, or both
3. **Context already known** — Summarize what the user already said; do not re-ask

Do **not** ask which "output types" they want. The deliverable is always one-line + concept unless they explicitly refuse one part.

Proceed to Phase 2 unless entering Phase 6 (review-only).

---

## Phase 2: Question batch

Send **all 6 questions in one message**. Each question includes 2–3 direction hints (not "correct answers") plus "other directions OK / skip OK."

**Rules:**
- Customize hints to the user's industry when context is known
- User may skip or partially answer — never pressure
- Core questions ①②③ are required for drafts; ④⑤⑥ can be inferred

### Questions

**① Who — Who is the core user?**
- Direction hints (pick one vibe, or your own):
  - A specific role with a concrete job (e.g. "solo PM at a 10-person startup")
  - A situation, not a demographic (e.g. "teams that outgrew spreadsheets")
  - A behavior pattern (e.g. "people who capture ideas on the go")

**② Problem — What pain or unmet need?**
- Direction hints:
  - Time / efficiency ("takes too long", "too many tools")
  - Quality / outcome ("good work gets lost", "decisions lack context")
  - Emotion / friction ("overwhelming", "lonely", "anxious about missing something")

**③ Outcome — If this product succeeds wildly in 1 year, what do users say?**
- Direction hints:
  - Capability unlocked ("I can finally ___")
  - Feeling ("I feel ___ when I use it")
  - Before/after ("I used to ___, now I ___")

**④ Differentiation — What do you do that alternatives don't?** *(optional)*
- Direction hints:
  - Approach ("we believe X, so we do Y")
  - Experience ("others optimize for A, we optimize for B")
  - Scope ("we go deep on one thing instead of bundling everything")

**⑤ Why now — Why does this matter today?** *(optional)*
- Direction hints:
  - Technology shift (AI, mobile, regulation)
  - Behavior change (remote work, creator economy)
  - Gap ("incumbents haven't caught up to ___")

**⑥ Tone — How should it sound?** *(optional)*
- Direction hints:
  - Bold & aspirational / Warm & human / Precise & professional
  - Casual startup / Enterprise-trustworthy / Craft-focused

### Thin answers

If the user says "not sure yet":
- Accept it: "That's normal at this stage."
- Propose a **temporary assumption** and label it `(仮)` — proceed to Phase 3
- Offer one imagination prompt: "If this product were a hit in a year, what would users tell their friends?"

### Outcome-only answers

If the user answers ③ strongly but ② (Problem) is thin or missing:
- Do **one** follow-up focused on pain only — e.g. "What happens today before that ideal outcome? What breaks or feels missing?"
- Do not loop again before drafting; use `(仮)` for Problem in Phase 3

Do not loop more than one follow-up round before drafting.

---

## Phase 3: Draft generation

Read [references/frameworks.md](references/frameworks.md) and [references/examples.md](references/examples.md) before generating.

### Output rules

1. Generate **2–3 full packages** — each package = one-line statement **and** all four concept paragraphs together
2. Variations must differ by **angle** (e.g. habit vs visibility vs chat-native), not synonym swaps of a single angle
3. Always include **one integrated package** that combines the strongest elements from all angles — label it「統合案」
4. Mark `(仮)` wherever assumptions were used; list them after the drafts
5. After each package, add **one line**: what this variation emphasizes
6. Use the user's words from Phase 2 — do not invent features they didn't mention
7. One-liner length: one breath (~40 Japanese characters soft target; 20 words max in English) — see [references/frameworks.md](references/frameworks.md)

Do **not** present one-liner and concept as separate "types" or ask the user to pick A vs C.

### After presenting drafts

Ask: "Which package is closest? Or mix elements from several?" Then Phase 4 or 5.

---

## Phase 4: Selection & feedback

When the user picks a direction or gives feedback:

1. Restate their choice in their words
2. Identify what to keep vs change (tone, specificity, scope, differentiation)
3. If feedback is vague ("make it better"), ask one narrowing question:
   - More specific or more aspirational?
   - Shorter or more context?
   - More user-centric or more bold?
4. If the user supplies their own one-liner, treat it as authoritative — rework concept paragraphs to align with it

Move to Phase 5 when direction is clear.

---

## Phase 5: Refinement

Iterate until the user confirms. When the user requests these adjustments, do:

| Request | Action |
|---------|--------|
| "More casual" | Shorter words, active voice, drop jargon |
| "More professional" | Concrete outcomes, remove hype adjectives |
| "Shorter" | Cut one-liner to one clause; move cut content into **What** or **Why** |
| "Bolder" | Stronger verb, bigger outcome — but check antipattern 6 |
| "Mix several drafts" | Merge explicitly; show full package (one-liner + four paragraphs) |
| "Rewrite concept from this one-liner" | Keep user's one-liner verbatim; align Why/Who/What/How |

**One revision per turn** unless the user asks for multiple options.

When the user says "this is it" / "OK" / "完成" / "終わり" → Phase 6 immediately, then Final deliverable in the same turn.

---

## Phase 6: Quality check

Read [references/antipatterns.md](references/antipatterns.md). Run all **8 checks** on the final package:

| # | Check | Pass criterion |
|---|-------|----------------|
| 1 | Target clarity | A specific core user is identifiable in **Who** — not "everyone" |
| 2 | No buzzword soup | Outcome is clear without technology buzzwords |
| 3 | Outcome over features | Describes change in user's world, not feature list |
| 4 | Not a roadmap | No release dates, quarters, or version plans |
| 5 | Differentiation | Could not swap in a competitor name and still work |
| 6 | Credible ambition | Bold but grounded — at least one concrete anchor |
| 7 | User-outward | About user value, not company status ("#1 in market") |
| 8 | Memorability | One-liner fits in one breath; speakable without reading |

Also verify **consistency**: one-liner outcome appears in **What**; **Who** and **How it's different** support the same story.

### Output format

```markdown
## Quality check

| # | Item | Result | Note |
|---|------|--------|------|
| 1 | Target clarity | ✅ / ⚠️ | [brief] |
...

**Overall:** Ready / Needs one fix / Needs rework

[If issues: cite antipattern from antipatterns.md + suggested fix]
```

For **review-only** entry (user pasted existing vision): run Phase 6 first, then offer Phase 5 fixes if they want.

---

## Final deliverable

After Phase 6 (or when the user ends the session), always output:

```markdown
# [Product name] — Vision & Concept

## One-line statement
> [final one-liner]

## Concept
**Why** — ...
**Who** — ...
**What** — ...
**How it's different** — ...

## Assumptions used
- [list any (仮) items for the user to revisit]
```

If the user asks to save to a file (e.g. 「ファイルにまとめて」), write the summary to `docs/product-vision.md` or the user-specified path and report the path.

---

## Facilitator principles

1. **User's words first** — Prefer their phrases over polished replacements; especially for the one-liner
2. **Labeled assumptions** — Never hide guesses; mark `(仮)` and invite correction
3. **Full packages, not fragments** — Each draft includes one-liner + concept; avoid angle-split drafts that feel incomplete
4. **Variations spark clarity** — Multiple packages help "that's NOT us"; always offer a 統合案
5. **No premature polish** — Phase 3 drafts can be rough; Phase 5 refines
6. **Japanese/English** — Match the user's language; offer both if they work internationally
7. **Always land the deliverable** — Do not end a session without the final summary block unless the user explicitly stops early

---

## Anti-patterns for the facilitator

- Writing one perfect paragraph without user input
- Asking questions one-by-one across many turns
- Skipping Phase 6 or the final deliverable block
- Exposing A/B/C or Moore terminology to the user
- Presenting one-liner-only variations without concept paragraphs (or vice versa)
- Using generic vision clichés ("revolutionize", "empower", "seamless") without user-specific meaning
