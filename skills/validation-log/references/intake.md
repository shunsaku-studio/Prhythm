# Intake — what happened, where to record, how to append

Confirm the activity and the targets before writing. Never invent results you were not told.

## What to gather (one batched intake)

| Item | Why | If missing |
|------|-----|------------|
| 検証アクティビティ | 何を検証したか（ユーザーテスト / スパイク / ベンチ / A/B …） | ユーザーに 1 行で確認 |
| 対象 A ID | どの仮説の証拠か | `docs/uncertainty-map.md` を読んで突き合わせ。無ければ `(A候補)` |
| Scale / Period / Outcome | ✅ 級証拠の 3 要素 | 欠落は捏造せず `要追加計測` |
| 失格条件 | 合否判定の基準 | 設定が無ければ「事後基準」を 1 行で確認 |
| 生データ場所（任意） | 追跡可能性（録画 / analytics / ベンチ出力） | 任意。無くても可 |

Send **one message** if multiple items are unknown. Do not loop more than once.

## Files to read

1. `docs/validation-log.md` — 既存なら **追記モード**。最後の V ID を読み、次番号を採番。
2. `docs/uncertainty-map.md` — 対象 A ID と仮説文・value/technical 種別を突き合わせる。
3. `docs/proto-value-report.md`（任意）— Mode B レポートの脚注がこのログを参照するため、整合を意識。

## Append mode (when docs/validation-log.md exists)

| Sub-step | Action |
|----------|--------|
| 1 | 既存エントリと V ID を読む |
| 2 | 既存エントリは **verbatim で保全**（書き換え禁止） |
| 3 | 新エントリに次の V ID（`V-NN`）を採番。retired ID は再利用しない |
| 4 | 訂正は旧エントリを消さず新エントリで上書きし、旧エントリ末尾に `訂正→V-NN` を付す |
| 5 | 追記前に 1 行サマリをユーザーに提示 |

Append summary format:

```
📥 既存ログ検出: docs/validation-log.md (エントリ N 件、最新 V-NN)
➕ 追加: <m> 件 / 対象 A: A-D01-01-01, A-CORE-05
```

## Aligning to A IDs

- 対象 A ID が `docs/uncertainty-map.md` に存在する → その仮説文を引用して紐付ける。
- 存在しない → ユーザーに「この観察はどの仮説の証拠ですか」を 1 度だけ確認。
- それでも未確定 → `(A候補)` ラベル + 暫定 `A-PROV-NN` で記録し、「次回 `/uncertainty-map` で正式 ID に取り込み」と注記。

## Anti-fabrication policy

- Scale / Period / Outcome のどれも **聞いていない値は書かない**。`—` + `要追加計測`。
- 「動かした」「だいたい」「数人」は outcome として不可。具体数値を再確認するか `—`。
- 2 つの情報源が矛盾する（録画では完了、メモでは未完了）→ 両方記録し、ユーザーに判断を委ねる。

## Hand-off to Step 1

After intake, output a one-line summary:

```
記録対象: A-D01-01-01 (5 ユーザーテスト) / A-D02-06-T1 (スパイク 3 ケース)
ログ: docs/validation-log.md（既存 4 件に追記）
```

Then proceed to Step 1 of [SKILL.md](../SKILL.md).
