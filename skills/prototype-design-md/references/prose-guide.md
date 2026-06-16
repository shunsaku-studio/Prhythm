# Prose Guide

Prototype DESIGN.md = **judgment brief**, not design system doc.

Read [prototype-brief.md](prototype-brief.md) for section map.

## Product Feel (required)

Include **negatives**. AI adds decoration when told only "warm" or "happy".

```markdown
### Product Feel
社内の感謝ボード。朝光のクリーム机と白いカード。
Bonusly くらい軽いが、本文は便箋のように誠実。
**近くないもの:** ランディングページ、confetti、全面イエロー。
```

Banned without follow-up: `modern`, `clean`, `premium`, `sleek`, `intuitive`

## Surface & Density

```markdown
### Surface Type
- **Primary:** operational tool — send/read gratitude daily
- **Secondary:** form — compose message

### Density
Primary: medium — readable messages, not admin table density.
```

## Layout (rules, not specs)

Write **how to use** layout primitives:

- Shell pattern (single column vs sidebar+main)
- Card policy (when allowed; no nesting)
- No hero on app screens

Defer pixel max-width until screens exist — principles OK.

## Components (selection only)

**Surface-dependent** — do not universalize:

| Surface | List pattern |
|---------|--------------|
| CRUD / admin | Table |
| Feed / recognition | Card list |

```markdown
- Compose flow → form + single primary button
- Destructive → danger + confirm dialog
- Modal → only when interrupting current work is justified
```

## Forbidden Patterns (extension)

Verifiable slop defenses — see [anti-slop.md](anti-slop.md).

## Copy Guidelines (extension)

- Buttons: verb-first（「送る」「保存する」）
- Errors: fact + next step
- Placeholders: no「ここに入力してください」

## Minimum Verification (extension)

Checkbox list AI can self-review against.

## YAML

Metadata only. Never `colors`, `typography`, `components` blocks.
