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
| [competitive-research](skills/competitive-research/) | 新規プロダクト・機能向けに競合・参考サービスを調査し、設計判断に使えるインサイトを出す |
| [product-vision-and-concept](skills/product-vision-and-concept/) | 対話でプロダクトのビジョン・コンセプト（一行ステートメント + Why/Who/What/差別化）を言語化する |
| [prototype-design-md](skills/prototype-design-md/) | プロトタイプ段階の DESIGN.md — UI 生成前の判断ブリーフ（feel・サーフェス・禁止・コンポーネント選び） |
| [ooui-graphql-modeling](skills/ooui-graphql-modeling/) | プロト段階の GraphQL SDL 設計（ドメイン中心・段階的ゲート） |
| [ooui-architect](skills/ooui-architect/) | OOUI の common/model/ルーティング dir 構成、scaffold、4-file コンポーネント |
| [usecase-mapper](skills/usecase-mapper/) | コードベースや仕様書から**ユースケース一覧・ユースケース図**を生成し `docs/usecase-map.md` に出力する |
| [prhythm-skill-pr](skills/prhythm-skill-pr/) | スキル追加・更新の PR 作成（preflight + gh） |
| [create-html-deck](skills/create-html-deck/) | HTML スライドデッキを deck-stage ビューアで段階的に構築（アウトライン→テーマ→プレビュー） |
| [shadcn-explorer](skills/shadcn-explorer/) | shadcn/ui エコシステム（200+ registry / 60+ テーマ）からコンポーネント・block・テーマ候補をリアルタイム検索 |

スキルは `skills/<skill-name>/SKILL.md` として追加されます。人間向けの説明は各スキルの `README.md`（[ドキュメントサイト](#ドキュメントサイト) でも閲覧可）。

## ドキュメントサイト

[VitePress](https://vitepress.dev/) でスキルカタログを公開する（公開 URL: https://shunsaku-studio.github.io/Prhythm/）。正本は `skills/` の README のみ — ビルド時に `scripts/sync-docs.mjs` が `docs-site/.generated/` を生成する（git 管理外）。

```bash
cd docs-site && npm install   # 初回のみ
npm run docs:dev              # sync + ローカルプレビュー
npm run docs:build            # 静的ビルド
```

| パス | 役割 |
|------|------|
| `docs-site/site.meta.json` | nav / sidebar / カスタムページの定義 |
| `docs-site/pages/` | スキル以外の Markdown 正本 |
| `skills/<name>/README.md` | スキル紹介ページの正本 |

`main` への push で [GitHub Pages](https://docs.github.com/pages) に自動デプロイ（`.github/workflows/pages.yml`）。リポジトリ Settings → Pages → Source: **GitHub Actions** が必要。

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
├── .github/workflows/
│   └── pages.yml              # ドキュメント GitHub Pages デプロイ
├── docs-site/                 # VitePress サイト（site.meta.json + pages/）
├── skills/                    # Agent Skills 正本 (SKILL.md + README.md)
├── scripts/
│   ├── link-cursor-skills.sh  # .cursor/skills/ symlink 生成
│   └── sync-docs.mjs          # skills/ → docs-site/.generated/ 同期
├── slides.md                  # Slidev スライド
├── package.json               # Slidev + docs npm scripts
└── README.md
```

## ライセンス

MIT
