# Prhythm Proposal for Horizon

Horizonレーベル向けに、正本 [`slides/prhythm/`](../prhythm/) をほぼそのまま使う派生デッキです。

## 正本との関係

- 正本: [`slides/prhythm/`](../prhythm/)
- この派生: `slides/prhythm-proposal-for-horizon/`

8スキルまでの本編は正本と同じです。Horizon向けの差分は次です。

- 表紙の聴衆（HORIZON）
- 本編の締めは Horizon 固有の「瞬作の提案」（M+ × M- の二人三脚）。正本のビジョン／ロードマップ／Next Action は Appendix
- サマリーで伝える3点と持ち帰り（自分の案件ならどこで使うか）を置く
- デモのチームは PM × エンジニア。各スキルの下段は As-Is / To-Be の帯
- 議論は15のあと、この場でやる

Prhythm全体に共通する変更は、正本へ先に反映してください。

## トークスクリプトとスピーカーノート

このリポジトリでは管理しません。Notion 側が正本です。`reassemble.sh` は
`content/speaker-notes.json` があれば埋め込み、無ければ空配列を入れます。

## 編集と再生成

```bash
./reassemble.sh
```
