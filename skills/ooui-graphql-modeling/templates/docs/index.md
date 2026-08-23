<!-- prhythm-docs markdown — ooui-graphql-modeling
     Fill: docs/prhythm/ooui-graphql-modeling/index.md
     Rules: skills/prhythm-docs/references/md-grammar.md
     Strip this comment. SDL 全文はスキーマファイルへ。 -->
# {{PRODUCT}} — Domain Model Summary

> {{CONTEXT_LINE}}

## Answer

> **{{ANSWER_STATEMENT}}**

- {{BECAUSE_1}}
- {{BECAUSE_2}}
- {{BECAUSE_3}}

---

## Frame

| Field | Content |
|-------|---------|
| **フェーズ / ゲート** | {{PHASE}} |
| **入力にした成果物** | {{SOURCES}} |
| **スキーマの置き場** | {{SCHEMA_PATH}} |
| **今回扱わないもの** | {{OUT_OF_SCOPE}} |

---

## Evidence

```mermaid
erDiagram
  {{ER_LINES}}
```

| 能力（やりたいこと） | 操作 | 設計上の判断 |
|--------------------|------|-------------|
| **{{CAP_1}}** | {{OP_1}} | {{NOTE_1}} |
| {{CAP_2}} | {{OP_2}} | {{NOTE_2}} |
| {{CAP_3}} | {{OP_3}} | {{NOTE_3}} |
| {{CAP_4}} | {{OP_4}} | {{NOTE_4}} |

---

## Decision Gates

1. {{GATE_1}}
2. {{GATE_2}}
3. {{GATE_3}}

---

## Gaps & Next Steps

| 誰が | 何を |
|------|------|
| {{WHO_1}} | {{NEXT_1}} |
| {{WHO_2}} | {{NEXT_2}} |
| {{WHO_3}} | {{NEXT_3}} |

SDL 全文: `{{SCHEMA_PATH}}`
