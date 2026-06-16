# Sentiment Sources

Phase 2 **User sentiment** must not rely on marketing copy alone. Run at least one sentiment search per service.

---

## Priority order

Search in this order; use lower tiers only when higher tiers are empty.

| Priority | Source | Search pattern |
|----------|--------|----------------|
| 1 | **App Store / Google Play** reviews | `{service} site:apps.apple.com` or app name + 口コミ |
| 2 | **G2 / Capterra** (B2B SaaS) | `{service} G2 reviews` |
| 3 | **Reddit, HN, X** (global) | `{service} reddit review`, `site:news.ycombinator.com {service}` |
| 4 | **知恵袋 / 価格.com / みん評** (Japan consumer) | `{サービス名} 口コミ 評判` |
| 5 | Comparison blogs | Last resort — label profile **二次情報** |

---

## What to extract

For each service, fill exactly **3 praised + 3 complaints**:

- **Prefer 2–3★ reviews** — they name both value and friction
- Quote themes, not single outliers
- Note if sentiment is thin: "App Store レビュー少 — 公式・ブログ中心"

---

## Per-service search minimum (Phase 2)

1. Official site (pricing, features)
2. `{service} review` or `{service} 口コミ 評判`
3. `{service} vs {closest competitor}` OR app store page
4. Optional: founder interview / press release for design rationale

---

## Verification tags

Use in profiles and Phase 1 entries:

| Tag | Meaning |
|-----|---------|
| `Verified` | Confirmed on official site or app store within research session |
| `二次情報` | Aggregator blog / comparison site only |
| `要確認` | Could not verify — do not state as fact |
