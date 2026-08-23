# Cut grammar

Read this after the user confirms the 3-cut outline. Do not invent extra cuts here.

## Cut shape

Each cut is one beat of the デモプレイ.

```markdown
### CUT {n} {verb-name}  {clock}  {role}

**画面**
- {what is visible — labels, primary CTA, one key object}

**操作**
- {verb to the next cut: tap / match / send / …}

**台本**
{one claim sentence the presenter says}
```

CUT 3 has 操作: `end` (or omit).

## 画面

Write what a viewer sees in ~5 bullets or a short wire sketch.

Do:

- Product copy that proves the concept (button labels, empty states, badges)
- One primary CTA
- Domain objects if a model exists (Mission, Match, …)

Do not:

- Hex, type scale, padding, component library names
- Every field on the screen
- Screens that are not in the 3-cut path

## 操作

One verb. It is the seam between cuts, not a user-flow diagram.

Examples: `tap` → next screen; `match` → both sides agree.

## 台本

One sentence. It is the claim of the cut, and the script the customer takes home.

Do:

- Point at the As-Is valley on the 山場 cut
- Name the structural change ("上司に伝わるのは合意した後")

Do not:

- List features ("here is search, filter, and notifications")
- Narrate every click
- Read the 画面 labels aloud without a claim

## Names and clock

- Cut names are verbs: 出会う, 匿名で近づく, 越境が成立
- Default 3 cuts, 4 max, total ≤ 5:00
- Typical clocks: 0:00–1:30 / 1:30–3:20 / 3:20–5:00 — shift to fit the 山場, keep the sum

## Artifact: `docs/proto-storyboard.md`

```markdown
# デモプレイ絵コンテ — {product}

- **Persona:** {name · role}
- **Core scene:** {chosen scene}
- **Concept:** {one-liner}
- **Runtime:** ~5:00
- **山場:** CUT {n} {verb-name} — {As-Is valley in one line}

## Cut outline

| CUT | Name | Role | Clock | One line |
|-----|------|------|-------|----------|
| 1 | | 導入 | | |
| 2 | | 山場 | | |
| 3 | | 着地 | | |

## Cuts

### CUT 1 …

### CUT 2 …  ← 山場

### CUT 3 …

## Where to put proto effort

- Build these screens, in this order. Do not build the rest of the product for the demo.
- Next: `prototype-design-md` for look; 瞬作 for the three screens.
```

## Pre-send checklist

- [ ] 3 cuts (4 max), total ≤ 5:00
- [ ] One 山場, mapped to the As-Is valley
- [ ] Each cut has 画面 / 操作 / 台本
- [ ] 台本 is one claim sentence (not a feature tour)
- [ ] 画面 is "what is visible" only (no component specs)
