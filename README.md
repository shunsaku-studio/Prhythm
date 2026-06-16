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

| スキル | 説明 |
|--------|------|
| [prhythm-skill-review](skills/prhythm-skill-review/) | スキルの README 整備と品質レビュー |
| [graphql-schema-design](skills/graphql-schema-design/) | プロト段階の GraphQL SDL 設計（ドメイン中心・段階的ゲート） |
| [prhythm-skill-pr](skills/prhythm-skill-pr/) | スキル追加・更新の PR 作成（preflight + gh） |

スキルは `skills/<skill-name>/SKILL.md` として追加されます。

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
