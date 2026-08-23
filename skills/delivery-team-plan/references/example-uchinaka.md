# Example — ウチナカ公募（仮）

Fictional case from the Prhythm intro deck. Copy the **shape**, not the product.

- **Scope:** 社内ジョブボードのパイロット（2部署 50名）
- **Owner:** 人事企画 · 鈴木さん — スコープ・予算・Go / No-Go の決裁
- **瞬作:** プロト改修・計測実装・分析レポート

## Layers

| Layer | Who | Holds |
|-------|-----|-------|
| Owner | 人事企画 · 鈴木さん | スコープ・予算・Go / No-Go |
| Exec | 人事企画チーム 2名 | 説明会・運用ルール・週次モニタリング |
| Exec | 情シス · IT 1名（兼務） | SSO・権限設計・HR 連携 |
| Exec | 現場チャンピオン（2部署 × 各1名） | ミッション登録・呼びかけ・現場の声 |
| Support | 瞬作チーム Eng × Design | プロト改修・計測・分析レポート |

## RACI

| 意思決定事項 | 人事 | IT | 現場 | 瞬作 |
|--------------|------|----|------|------|
| 対象部署・スコープ | A | C | C | I |
| 匿名性の運用ルール | A | C | C | R |
| 権限設計・HR 連携 | C | A | I | R |
| ミッション登録・呼びかけ | C | I | A | C |
| Go / No-Go 判断 | A | C | C | R |

A 決裁 / R 実行 / C 相談 / I 報告

## Where this stops

No phase dates, no 応募率 KPI, no 矢羽. Those belong in `delivery-phase-plan`.
