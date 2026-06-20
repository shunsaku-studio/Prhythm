# Mode B output template — `docs/proto-value-report.md`

Stakeholder-facing prototype value report. Inherit assumption labels from `docs/uncertainty-map.md` (Mode A). **Body uses natural language; F ID / A ID live only in footnotes and Appendix A** (脚注方式).

## Full template (standard 6 sections)

````markdown
# <プロダクト名> プロト価値レポート

> ステークホルダー向け。プロトタイプで何が確かめられ、何が次の検証対象かを正直に整理。
> 内部の検証優先順位マップは `docs/uncertainty-map.md`。仮説 ID 対応は Appendix A。

## エグゼサマ

本プロトでは、コア仮説 <C> 件のうち <V> 件を実ユーザー検証で確認、<P> 件は実装レベルで動作を確認しました [^1]。残る <U> 件のコア仮説（<最大の検証対象>）が次サイクルの最優先テーマです。プロトの主たる価値は <一行で>、対する最大のリスクは <一行で>。

## スコープ

本プロトは「<対象動線 / 機能群>」を扱いました。

含むもの:
- <主要動線 1>
- <主要動線 2>

含まないもの:
- <未対象動線>（次フェーズ）

詳細な機能対応表は Appendix A。

## 検証済成果

> コア × 検証済の事実のみ。本文は自然言語、ID は脚注。

### 1. <成果の見出し（一行）>

<事実をストーリーで 2-3 文。誰が、何を、どれくらいの規模で、何分で、どんな結果を観察したか。> [^2]

### 2. <成果の見出し>

<同上> [^3]

<!-- ✅ ラベルがついた assumption の数だけ続ける -->

## 残課題

> コア × 未検証 を **隠さず** ここに出す。Mode B でも未検証コアを省略しない。

最大の未検証仮説は <一行>。これは次の検証計画で扱います [^4]。

その他の残課題:
- <仮説 1>: <なぜ検証できなかったか> [^5]
- <仮説 2>: <なぜ検証できなかったか> [^6]

## デモ動線

ステークホルダーがプロトに触れる際の推奨動線。検証済成果と紐付ける。

1. **<画面 1>** から <成果 #1 を体験できる動作>
2. **<画面 2>** で <成果 #2 を確認>
3. （次の検証で塞ぐ箇所は手前で停止）

## 次の検証計画

| 仮説 | 検証手段 | 必要工数 | 期待結果 | 失格条件 |
|---|---|---|---|---|
| <仮説の自然言語表現> [^4] | LP + スモークテスト | 5 日 | CVR 3% 以上 | CVR 1% 未満 |
| <仮説の自然言語表現> [^5] | 5 ユーザーテスト | 3 日 | 完了率 80% 以上 | 完了率 50% 未満 |

---

## Appendix A — 仮説 ID 対応表

> 内部識別子の対応関係。本文は脚注で参照。

[^1]: 全 assumption: <N> 件 / コア <C> / 周辺 <P> / ✅ <V> / 🟡 <PP> / ⬜ <U>
[^2]: A-D01-01-01 / F-D01-01 / 観察ログ `docs/usability-log.md#L23`
[^3]: A-D02-03-01 / F-D02-03 / 観察ログ `docs/usability-log.md#L45`
[^4]: A-CORE-05 / 関連 F: F-D04-01
[^5]: A-D01-01-03 / F-D01-01
[^6]: A-D03-XX-02 / F-D03-XX

## Appendix B — プロトのスコープ詳細 (任意)

| エリア | 機能 (F ID 一覧) | プロト範囲 | 観察対象 |
|---|---|---|---|
| 認証 | F-D01-01, F-D01-02 | フル実装 | あり |
| 共有 | F-D02-01, F-D02-03 | フル実装 | あり |
| 課金 | F-D04-01 | UI スタブのみ | なし (次の検証で実装) |
````

## Required sections (in order)

1. エグゼサマ — 1 段落、最大の価値と最大のリスクを 1 文ずつ
2. スコープ — 含む / 含まない を明示
3. 検証済成果 — ✅ ラベルの assumption ごとにサブセクション
4. 残課題 — ⬜ コア assumption を隠さず併記
5. デモ動線 — 検証済成果と紐付ける手順
6. 次の検証計画 — 仮説 / 手段 / 工数 / 期待結果 / 失格条件

Plus mandatory:

- **Appendix A: 仮説 ID 対応表** — 全脚注を集約

Optional:

- Appendix B: プロトのスコープ詳細
- Appendix C: 検証手段の選定理由 (高度な読者向け)

## ID exposure rules (脚注方式)

| Where | What appears |
|-------|--------------|
| Body text | 自然言語のみ。「F-D01-01」「A-CORE-05」を本文に書かない |
| Section headers | 自然言語のみ。ID を見出しに使わない |
| Footnotes | A ID + F ID + 観察ログ参照 |
| Appendix A | 全脚注の集約。ID と本文のマッピング |
| Tables | 仮説の自然言語表現を主、ID は脚注で添える |

**MUST**: every assumption referenced in the body has a corresponding footnote in Appendix A.  
**NEVER**: write A IDs / F IDs in body prose or section headers.

## Stakeholder-facing tone rules

| Do | Don't |
|----|-------|
| Concrete numbers ("5 ユーザー / 47 秒平均") | Vague claims ("ユーザーに好評") |
| Honest about Unverified Core | "全部検証済" claim when not |
| Link to next validation plan | Hide remaining risks |
| Lead with strongest verified result | Bury success in technical detail |
| Use product feature names | Use F-ID / A-ID strings |

## Anti-patterns

| Anti-pattern | Fix |
|--------------|-----|
| Body shows F-D01-01 | Replace with feature name; move ID to footnote |
| 残課題 が空 (because Unverified Core hidden) | Surface ⬜ コア items; this is required for honesty |
| エグゼサマ が長文 | Compress to 1 段落 (3-4 文) |
| デモ動線 が単なる画面リスト | Tie each step to a verified result |
| 次の検証計画 に失格条件なし | Add "what would refute this" to every row |
| 観察人数が `—` のまま ✅ | Demote to 🟡 in Mode A first; then re-emit Mode B |

## Hand-off

Before emit, run [quality-checklist.md](quality-checklist.md) §Mode B section. If any item fails, fix Mode A first (Mode B inherits errors).
