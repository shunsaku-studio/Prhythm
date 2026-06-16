# Prhythm

提案のリズムを生み出すエージェントスキル集。[Agent Skills](https://agentskills.io) オープンスタンダード準拠。

## インストール

```bash
gh skill install shunsaku-studio/Prhythm
```

Claude Code からプラグインとしてインストール:

```bash
/plugin marketplace add shunsaku-studio/Prhythm
/plugin install prhythm@shunsaku-studio/Prhythm
```

## スキル一覧

スキルは `skills/<skill-name>/` に配置されます。

| スキル | 説明 |
|---|---|
| [usecase-mapper](skills/usecase-mapper/) | コードベースや仕様書から**ユースケース一覧・ユースケース図**を生成し `docs/usecase-map.md` に出力する |

## Slidev (プレゼン用)

[Slidev](https://sli.dev/) が同梱されており、Markdown からプレゼンスライドの作成・PPTX エクスポートが可能。

```bash
npm install                    # 依存関係インストール
npm run dev                    # 開発サーバー起動
npm run export:pptx            # PPTX にエクスポート
npm run export:pdf             # PDF にエクスポート
```

## ディレクトリ構成

```
Prhythm/
├── .claude-plugin/
│   └── plugin.json            # プラグインマニフェスト
├── skills/                    # Agent Skills (SKILL.md) を配置
├── slides.md                  # Slidev スライド
├── package.json               # Slidev + playwright-chromium
└── README.md
```

## ライセンス

MIT
