# Prhythm Proposal for Wave

Waveレーベル向けに、Horizon版（[PR #42](https://github.com/shunsaku-studio/Prhythm/pull/42) の `slides/prhythm-proposal-for-horizon/`）をそのまま使う派生デッキです。

## 正本との関係

- 正本: [`slides/prhythm/`](../prhythm/)
- 派生元: `slides/prhythm-proposal-for-horizon/`（[PR #42](https://github.com/shunsaku-studio/Prhythm/pull/42)、未マージ）
- この派生: `slides/prhythm-proposal-for-wave/`

内容は Horizon版と同じです。Wave向けの差分は次だけです。

- 表紙の聴衆（WAVE）と日付（2026.10.13）
- フッター表記（瞬作スタジオ / Prhythm Wave紹介）

Prhythm全体に共通する変更は、正本へ先に反映してください。

## トークスクリプトとスピーカーノート

このリポジトリでは管理しません。Notion 側が正本です。`reassemble.sh` は
`content/speaker-notes.json` があれば埋め込み、無ければ空配列を入れます。

## 編集と再生成

```bash
./reassemble.sh
```
