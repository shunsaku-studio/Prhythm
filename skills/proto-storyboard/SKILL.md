---
name: proto-storyboard
description: >-
  Compress a To-Be journey and a chosen core scene into a timed 3-cut
  demo-play storyboard (画面 / 操作 / 台本) for a ~5 minute proposal demo.
  Use when the user asks for 絵コンテ, プロトの見せ方, デモプレイ, storyboard,
  3カット, or how to show a prototype in a pitch.
disable-model-invocation: false
rank: core
categories:
  - design
---

# Proto Storyboard

Turn a To-Be journey and one chosen core scene into a **デモプレイ絵コンテ**: 3 cuts, ~5 minutes, each with 画面 / 操作 / 台本.

Human-facing overview: [README.md](README.md).

| File | When to read |
|------|--------------|
| [references/cut-grammar.md](references/cut-grammar.md) | Before writing 画面 / 操作 / 台本 |
| [references/example-uchinaka.md](references/example-uchinaka.md) | After the cut outline is confirmed; match this shape |

## When to use

- Proposal day needs a demo, and the team has not decided what to touch
- A customer must replay the same demo internally
- To-Be JM + concept exist, but they are not yet one on-screen story

Do NOT use:

- No core scene chosen yet → stop. Send the user to `create-journey-map` mode:tobe and wait for one scene
- User wants DESIGN.md, tokens, or generated UI → `prototype-design-md` / 瞬作
- User wants the full To-Be script again → that is the journey map, not this skill

## MUST / NEVER

MUST:

- Name **one 山場** cut. Place it on the As-Is valley (the drop-off the product is rewriting)
- Write 台本 as **one claim sentence**, not a feature tour
- Keep 画面 at "what is visible" — no component specs, hex, or padding
- Stop after the cut outline. Do not fill 画面 / 台本 until the user confirms

NEVER:

- Write the running prototype or `DESIGN.md` here
- Reprint every To-Be phase
- Ship more than 4 cuts, or a runtime over 5 minutes
- Ship a feature catalog dressed as a storyboard

## 1. Intake

Collect these. Guess only when the user cannot supply the field; mark guesses `※推測`.

| Field | Required |
|-------|----------|
| To-Be JM (or a tight summary of phases + As-Is valley) | yes |
| Chosen core scene (one, not a candidate list) | yes |
| One-line concept | yes |
| Protagonist persona | yes |
| Domain objects to put on screen | no — use if a model exists |

If core scene is **not** chosen → stop. Do not invent the 山場. Tell the user to finish `create-journey-map` mode:tobe and pick one scene.

If the user asks for the actual prototype or DESIGN.md → refuse here. Point to `prototype-design-md` and 瞬作.

Output a one-block frame, then go to step 2:

```markdown
## Frame
- Persona: …
- Core scene: …
- Concept: …
- As-Is valley: …
- Runtime target: ~5:00
```

## 2. Cut outline — then stop

Propose **3 cuts** (4 max). Each row: verb name, one line, role, clock.

Roles: 導入 / **山場** / 着地. Exactly one 山場. Put 山場 on the As-Is valley.

Cut names are verbs, not nouns: 出会う / 匿名で近づく / 越境が成立.

```markdown
## Cut outline (confirm before fill)

| CUT | Name | Role | Clock | One line |
|-----|------|------|-------|----------|
| 1 | … | 導入 | 0:00–1:30 | … |
| 2 | … | 山場 | 1:30–3:20 | … |
| 3 | … | 着地 | 3:20–5:00 | … |

Confirm this 3-cut shape (especially 山場). I will not write 画面 / 台本 until you say yes.
```

If cut outline is **not** confirmed → do not write 画面 / 台本.

## 3. Fill and write

After confirmation, read [references/cut-grammar.md](references/cut-grammar.md). Fill each cut:

- **画面** — what is on screen (wire level)
- **操作** — the verb that moves to the next cut (`tap`, `match`, …)
- **台本** — the sentence the presenter says (also the take-home script)

Then write `docs/proto-storyboard.md` using the template in cut-grammar.

Point next work to `prototype-design-md` (look and feel) and 瞬作 (build the three screens).

## Documenting with prhythm-docs

After the skill run, when the user asks to save or present results（まとめて / ドキュメントにして / スライドにして）:

1. Use `/prhythm-docs` (or follow that meta-skill)
2. Fill `templates/docs/index.md` and `templates/docs/sections.html` in this skill
3. Build the deck: `node skills/prhythm-docs/scripts/build-deck.mjs skills/proto-storyboard/templates/docs/sections.html docs/prhythm/proto-storyboard/index.html --title "…"`
4. Write `docs/prhythm/proto-storyboard/index.md`

Do not dump full catalogs into those files. Markdown is a briefing (Answer / Frame / Evidence / Gates / Next) — see `skills/prhythm-docs/references/md-grammar.md`.

## Done / fail

| State | Evidence |
|-------|----------|
| Waiting on outline | Transcript has 3 cuts with name, role, clock, and one 山場, and the turn stopped for confirmation |
| Done | `docs/proto-storyboard.md` exists; each cut has 画面 / 操作 / 台本; one 山場; total clock ≤ 5:00 |
| Fail | Full storyboard with no chosen core scene; 5+ cuts; feature catalog; DESIGN.md or implementation written by this skill |

Pre-send (also in cut-grammar):

- [ ] 3 cuts (4 max), total ≤ 5:00
- [ ] One 山場, mapped to the As-Is valley
- [ ] Each cut has 画面 / 操作 / 台本
- [ ] 台本 is one claim sentence
- [ ] 画面 is "what is visible" only
