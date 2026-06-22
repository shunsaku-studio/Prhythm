# Quality checklist — gate before write

Run this before appending to `docs/validation-log.md`.

## Per-entry gate

```
[ ] V ID は次の連番（既存 ID の再利用なし）
[ ] 対象 A ID が紐付いている（または (A候補) A-PROV-NN）
[ ] 種別 value/technical が明示
[ ] 検証手段が #1-14 のいずれかでタグ付け
[ ] Scale に単位がある（n=5 users / n=100 trials など）
[ ] n=1 のとき「信頼度 L」注記がある
[ ] Outcome が機械可読な数値（「動いた」「だいたい」が無い）
[ ] 失格条件が書かれている
[ ] 判定が 合格/不合格/判定保留 のいずれか
[ ] 学び・次アクションが各 1 行ある
[ ] 3 要素のいずれか欠落時は `要追加計測` が付与されている
```

## Honesty gate

```
[ ] 捏造した人数・期間・計測値がない（不明は — ）
[ ] n=1 を多数に見せていない
[ ] 判定保留を隠していない（弱い証拠を合格に格上げしていない）
[ ] technical の「実装した」だけを ✅ 級証拠にしていない（🟡 まで）
[ ] 過去エントリを書き換えていない（訂正は新エントリ + 相互リンク）
```

## Scope gate

```
[ ] docs/uncertainty-map.md を書き換えていない（昇格は surface のみ）
[ ] 検証アクティビティ自体の実装/実施をこのスキルで行っていない（記録のみ）
[ ] 昇格サマリは「可否の提案」であって map の確定ではないと明記
```

## Severity

| Failed | Severity | Action |
|--------|----------|--------|
| Honesty gate 1 項目でも × | Critical | 記録を止め、ユーザーに数値を再確認 |
| Per-entry: Scale/Outcome/失格条件 欠落 | Critical | `要追加計測` 付与 or 再確認、✅ 級にしない |
| Per-entry: 学び/次アクション 欠落 | Suggestion | 1 行追記 |
| Scope gate × | Critical | map 編集を取り消し、surface に戻す |
