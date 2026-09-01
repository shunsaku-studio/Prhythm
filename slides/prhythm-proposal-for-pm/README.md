# Prhythm Proposal for PM

PM向け説明会のために、既存の `prhythm-proposal` を調整した派生デッキです。

## 正本

- 正本: 既存の `prhythm-proposal`（リポジトリ上の配置: [`slides/prhythm/`](../prhythm/)）
- PM向け派生版: `slides/prhythm-proposal-for-pm/`

このディレクトリは正本ではありません。Prhythm全体に共通する内容・構成・デザインは、まず正本へ反映してください。

## 更新方針

1. Prhythm全体に共通する変更は、正本の `slides/prhythm/` を先に更新する。
2. 正本の変更から、PM向け説明に必要なものをこの派生版へ意図的に取り込む。
3. PMの課題、判断、案件延長・拡大など、PM固有の文脈はこの派生版で管理する。
4. PM向けの変更を正本へ戻す場合は、全体向けにも必要な内容かを確認してから反映する。

## 編集と再生成

編集対象は主に `content/sections/` と `content/speaker-notes.json` です。編集後は次のコマンドで `index.html` を再生成します。

```bash
./reassemble.sh
```
