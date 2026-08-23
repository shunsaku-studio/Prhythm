---
name: prhythm-docs
description: >-
  Format skill output into consultant-facing docs: Markdown + standalone HTML
  slides under docs/prhythm/{skill}/. Use after a research/analysis skill when
  the user asks to まとめて, ドキュメントにして, スライドにして, ファイルに保存,
  write up the results, or create a summary document. Meta-skill that fills
  each skill's collocated templates/docs/ and builds the deck with
  scripts/build-deck.mjs.
disable-model-invocation: false
rank: meta
---

# prhythm-docs — Document & slide formatter

Meta-skill: take raw skill output (chat and/or existing `docs/` artifacts) and fill **collocated templates** into shareable files for engineer ↔ consultant dialogue.

## When to use

- After a skill run, when the user says 「まとめて」「ドキュメントにして」「スライドにして」「ファイルに保存」
- Explicit `/prhythm-docs`
- Need a durable artifact that does not depend on chat history

## How to use

1. Identify the source skill (and mode if any: prep/analysis, asis/tobe, …)
2. Read [references/shared-rules.md](references/shared-rules.md). For Markdown also read [references/md-grammar.md](references/md-grammar.md). For slides also read [references/slide-grammar.md](references/slide-grammar.md)
3. Fill `skills/{skill}/templates/docs/index.md` and `sections.html` from the chat / existing docs — do not invent facts. Unused mode sections: delete whole headings. Leftover placeholders: delete the row
4. Build the deck; never hand-write the HTML shell:

```bash
node skills/prhythm-docs/scripts/build-deck.mjs \
  skills/{skill}/templates/docs/sections.html \
  docs/prhythm/{skill}/index.html \
  --title "…"
```

5. Check the budget, and the real layout if the deck matters:

```bash
node skills/prhythm-docs/scripts/lint-deck.mjs docs/prhythm/{skill}/index.html --visual
```

6. Write the Markdown to `docs/prhythm/{skill}/index.md`
7. Report the paths written and any lint findings

Default output: **both** md and html unless the user asks for one.

## The rules that matter most

Markdown ([references/md-grammar.md](references/md-grammar.md)):

- **Answer the skill's question, not the product story.** Each of the 5 blocks carries unique information. No `Synthesis`
- **Evidence is one structure** that only this skill can produce. Catalogs stay in native `docs/` or chat
- **Aim for 50–80 lines.** Markdown and slides share the same Answer and Gates, not the same density

Slides ([references/slide-grammar.md](references/slide-grammar.md)):

- **Every slide's `h2.msg` is one sentence stating the claim.** Never a noun phrase like "Research Frame"
- **Every deck has an Answer slide** (`.s-statement`) before the evidence. A deck without it fails the lint
- **Stay inside the information budget.** Over budget means cut content, not shrink type — the canvas is fixed at 1920×1080

Shell, components and build: [references/deck-shell.md](references/deck-shell.md). Markdown skeleton for a new skill: [templates/docs/index.md](templates/docs/index.md).

## Routing — templates live in each skill

| Source skill | Template directory |
|--------------|-------------------|
| hearing | `skills/hearing/templates/docs/` |
| market-landscape | `skills/market-landscape/templates/docs/` |
| defining-personas-and-segments | `skills/defining-personas-and-segments/templates/docs/` |
| create-journey-map | `skills/create-journey-map/templates/docs/` |
| function-usecase-map | `skills/function-usecase-map/templates/docs/` |
| product-vision-and-concept | `skills/product-vision-and-concept/templates/docs/` |
| ooui-graphql-modeling | `skills/ooui-graphql-modeling/templates/docs/` |
| uncertainty-map | `skills/uncertainty-map/templates/docs/` |
| assumption-breaker | `skills/assumption-breaker/templates/docs/` |
| feature-backlog-map | `skills/feature-backlog-map/templates/docs/` |
| proto-storyboard | `skills/proto-storyboard/templates/docs/` |
| delivery-team-plan | `skills/delivery-team-plan/templates/docs/` |
| delivery-phase-plan | `skills/delivery-phase-plan/templates/docs/` |

Each directory holds `sections.html` (slide bodies only) and `index.md` (Frame columns + Evidence specialized from [templates/docs/index.md](templates/docs/index.md)). Output path always: `docs/prhythm/{skill}/index.{md,html}` with `{skill}` matching the table above.

To add a skill: copy the shared Markdown skeleton, replace Frame and Evidence only, add `sections.html`, then add a row here.

## Relationship to skill-native docs

Skills may already write detailed artifacts (`docs/uncertainty-map.md`, `docs/usecase-map.md`, `docs/feature-list.md`, …). Those stay as-is. `docs/prhythm/` is a **briefing** layer: the skill's question, observation conditions, one Evidence structure, gates, next steps — not a dump of catalogs.

## Out of scope

- Re-running research or inventing conclusions
- create-html-deck assemble/preview (output is a single self-contained file)
- Formatting skills that have no `templates/docs/` (add templates first)
