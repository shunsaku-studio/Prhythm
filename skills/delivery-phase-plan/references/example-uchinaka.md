# Example — ウチナカ公募（仮）

Fictional case from the Prhythm intro deck. Copy the **shape**, not the product.

- **主指標:** 応募率 1.2% → 10%
- **パイロット:** 2部署 50名 · 3ヶ月
- **Lanes:** 人事企画 · 鈴木さん / 情シス · IT / 現場チャンピオン / 瞬作 Eng × Design

## Phase spine

| PHASE | Name | Duration | Gate | Judgment |
|-------|------|----------|------|----------|
| 0 | 設計・提案 | 2週間 | 提案承認 | 検証仮説を確定 |
| 1 | 準備 | 1ヶ月 | 開始判定 | 2部署 50名の登録完了 |
| 2 | パイロット | 3ヶ月 · 2部署 50名 | パイロット完了 | 「気になる」月40件 / 越境開始 30件 |
| 3 | 評価・展開判断 | 1ヶ月 | Go / No-Go | 体験者50名・継続率60%。未達なら概念を再検討 |

## 矢羽 (lane × phase)

| ROLE / PHASE | 0 設計・提案 | 1 準備 | 2 パイロット | 3 評価・展開 |
|--------------|--------------|--------|--------------|--------------|
| A 人事企画 · 鈴木さん | 稟議・合意形成 | 対象部署選定・説明会 | 週次モニタリング → 展開判断 | *(span from 2)* |
| R 情シス · IT | — | SSO・権限設計 | HR 連携・監査ログ運用 | *(span from 2)* |
| C 現場チャンピオン | — | ミッション原案づくり | 登録・呼びかけ | 体験者インタビュー |
| S 瞬作 Eng × Design | プロト・絵コンテ | 計測実装・改善リリース | *(span from 1)* | 分析レポート |

Spans: 人事 P2–P3 は1本。IT P2–P3 は1本。瞬作 P1–P2 は1本。IT と現場の P0 は空。

## Where this stops

No RACI table. No 2x2 of hypotheses. Methods for Core × Unverified stay in `uncertainty-map`; this file times them.
