# Output template — docs/validation-log.md

The file is append-only and time-ordered. Create it with the header block when absent; otherwise append entries under `## エントリ`.

## Full template

```markdown
# 検証ログ — <プロダクト名>

> プロト検証の観察・計測結果を時系列で記録する台帳。各エントリは A ID に紐付き、
> Scale + Period + Outcome を備える。`uncertainty-map` の ✅ 昇格はこのログを根拠にする。

## 凡例

- 種別: value（価値/市場/行動 #1-9） / technical（実装/性能/UX #10-14）
- 判定: 合格 / 不合格 / 判定保留
- `要追加計測`: Scale/Period/Outcome のいずれか欠落 → ✅ 昇格不可（🟡 まで）

## エントリ

### V-01 — <短いタイトル>
- 日付: <YYYY-MM-DD または 期間>
- 対象 A ID: <A-...>
- 種別: <value | technical>
- 仮説: <検証した信念 1 文>
- 検証手段: <#n 名称>
- Scale: <n=... 単位>
- Outcome: <機械可読な計測値>
- 失格条件: <refute 条件>
- 判定: <合格 | 不合格 | 判定保留>
- 学び: <1 行>
- 次アクション: <1 行>
- 生データ: <リンク または —>

### V-02 — ...
（同じブロックを繰り返す）

## 昇格サマリ（最新更新時点）

| A ID | 現ステータス（map） | このログの根拠 | 昇格可否 |
|------|--------------------|---------------|---------|
| A-D01-01-01 | 🟡 | V-01 (n=5 / 完了率 100%) | ✅ 昇格可 |
| A-D02-06-T1 | ⬜ | V-04 (n=3 / 3 件成功) | 🟡 → ✅ 昇格可（信頼度 M） |
| A-D03-02-T1 | 🟡 | V-05 (要追加計測) | 据え置き |
```

## Rules

- **Append, never rewrite.** 新しい検証は新しい V ID。過去エントリは保全。
- **One entry = one method × one assumption set.** 複合活動は主計測で 1 エントリ、副次は学び欄。
- **昇格サマリは参考。** 実際の昇格は `uncertainty-map` が次回実行時に判定する。このログは map ファイルを書き換えない。
- **脚注互換。** Mode B レポートは `docs/validation-log.md#V-01` 形式で参照できるよう、V ID を見出しに保つ。

## uncertainty-map との接続

`uncertainty-map` は観察証拠として次を探索する（[verification-classifier.md](../../uncertainty-map/references/verification-classifier.md) §Sub-step 3）:

- `docs/validation-log.md`（本ファイル、推奨の正準名）
- `docs/usability-log.md` ほか `usability` / `観察` / `interview` に一致する markdown（レガシー互換）

V ID と A ID を保つことで、map 側の昇格判定（🟡 → ✅）が Scale + Period + Outcome を機械的に拾える。
