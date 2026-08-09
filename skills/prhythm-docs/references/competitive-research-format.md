# competitive-research Document Format

Use this template when formatting output from the `competitive-research` skill into a document file.

The key structural principle: **Positioning and Synthesis first, Catalog details later.**

---

## Template

```markdown
# {Product Name} 参考サービス調査

## Research Frame

| Field | Content |
|-------|---------|
| **Problem** | {pain, not category} |
| **Target** | {user segment} |
| **Scope** | {geography, platform, B2B/B2C} |
| **Focus** | {product-specific axes, e.g. "Cursor的UX × Registry性"} |
| **Assumptions** | {inferred items, flagged if unconfirmed} |

---

## Positioning

### 軸の定義

{Define the 2 axes used for positioning. Must be product-specific, not generic.}

| 軸 | 意味 | 高い例 |
|----|------|--------|
| **{Axis 1}** | {definition} | {concrete example} |
| **{Axis 2}** | {definition} | {concrete example} |

### ポジショニングマップ

{ASCII positioning map. Mark the product's target position with ★.}

### 比較表

{All services scored on the 2 axes. This is the most-referenced table in the doc.}

| Service | {Axis 1} | {Axis 2} | 備考 |
|---------|:---:|:---:|------|

---

## Verb-Axis Research: 異ドメインからの参考サービス

### 動詞抽出

| # | RFC statement | Verb phrase (domain nouns removed) |
|---|--------------|-----------------------------------|

### 各動詞 × 異ドメイン参考サービス

{Per-verb table: Service | Domain | What it does | Design implication}

### 設計示唆まとめ

| Verb | Best reference | Pattern to steal |
|------|---------------|-----------------|

{Architecture paragraph: what emerges when combining these patterns}

---

## Catalog

### Direct Competitors

{Per-service entries from Phase 1. Standard format:}

#### [{Service Name}]({url})
- **What:** {one sentence}
- **Relevance:** Direct Competitor | Indirect | UX Reference | BM Reference
- **Why listed:** {1–2 sentences tied to research frame}
- **{Axis 1}:** {score + rationale}
- **{Axis 2}:** {score + rationale}
- **Scale signal:** {funding, users, etc.}
- **Verified:** {YYYY-MM source}

### Indirect Competitors & Adjacent

{Same entry format}

### UX & Business Model References

{Same entry format}

---

## Synthesis

### 空白地帯（誰もやっていないこと）

| 機能 | 最も近い既存 | 足りていない部分 |
|------|-------------|-----------------|

### 自プロダクトのポジション定義

{1–2 paragraphs: "we are X × Y, which nobody does because Z"}

### アーキテクチャ示唆

{Combine verb-axis patterns into a layered architecture sketch.
Use a code block for the layer diagram.}

---

## Gaps & Next Steps

- {Per-service or cross-cutting unknowns}
- {Suggested follow-up research}
```

---

## Formatting rules

- **Positioning section must come before Catalog.** Readers want "so what?" before "what's out there?"
- **比較表 is the anchor.** If someone reads only one thing, it should be this table
- **Verb-Axis section is not optional.** It consistently produces the highest-value insights
- **Synthesis merges both Catalog and Verb-Axis findings.** Don't just list — synthesize
- **空白地帯 table is required.** The whole point of the research is to find where nobody is playing
- **Architecture sketch in Synthesis** should reference specific verb-axis products by name

## Anti-patterns

- Catalog before Positioning (buries the lead)
- Verb-Axis section missing or treated as appendix
- Generic positioning axes ("simple vs feature-rich")
- Synthesis that just restates the comparison table
- No architecture sketch (misses the chance to make research actionable)
