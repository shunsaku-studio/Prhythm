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

### Cursor でこのリポジトリを開発する場合

スキルの正本は `skills/`。Cursor が `/` スラッシュコマンド用に読むのは `.cursor/skills/` だけなので、**symlink でつなぐ**（コピーしない）。

```bash
bash scripts/link-cursor-skills.sh
```

| パス | 役割 |
|------|------|
| `skills/<name>/` | 正本。編集・validate・PR はここ |
| `.cursor/skills/<name>/` | Cursor 検出用 symlink → `skills/<name>/` |

ファイルツリー上は両方に同じ内容が見えるが、実体は `skills/` のみ。`/prhythm-skill-review` などメタスキルは `disable-model-invocation: true` のため、スラッシュで明示呼び出しする。

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
├── .cursor/skills/            # Cursor 用 symlink → skills/*（link-cursor-skills.sh）
├── skills/                    # Agent Skills 正本 (SKILL.md)
├── scripts/
│   └── link-cursor-skills.sh  # .cursor/skills/ symlink 生成
├── slides.md                  # Slidev スライド
├── package.json               # Slidev + playwright-chromium
└── README.md
```

## ライセンス

MIT
