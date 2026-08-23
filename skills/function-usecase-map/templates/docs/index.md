<!-- prhythm-docs markdown — function-usecase-map
     Fill: docs/prhythm/function-usecase-map/index.md
     Rules: skills/prhythm-docs/references/md-grammar.md
     Strip this comment. 機能別図は docs/usecase-map.md へ。 -->
# {{PRODUCT}} — Use Case Sketch

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
| **アクター** | {{ACTORS}} |
| **システム境界** | {{BOUNDARY}} |
| **材料** | {{SOURCES}} |
| **今回描かないもの** | {{OUT_OF_SCOPE}} |

---

## Evidence

```mermaid
{{MERMAID_USECASE_DIAGRAM}}
```

| ID | アクター | 達成したいこと | 未確定 |
|----|---------|---------------|--------|
| **{{UC1_ID}}** | {{UC1_ACTOR}} | {{UC1_GOAL}} | {{UC1_OPEN}} |
| {{UC2_ID}} | {{UC2_ACTOR}} | {{UC2_GOAL}} | {{UC2_OPEN}} |
| {{UC3_ID}} | {{UC3_ACTOR}} | {{UC3_GOAL}} | {{UC3_OPEN}} |
| {{UC4_ID}} | {{UC4_ACTOR}} | {{UC4_GOAL}} | {{UC4_OPEN}} |
| {{UC5_ID}} | {{UC5_ACTOR}} | {{UC5_GOAL}} | {{UC5_OPEN}} |

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

詳細: `docs/usecase-map.md`
