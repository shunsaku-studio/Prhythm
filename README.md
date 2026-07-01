# Prhythm

提案のリズムを生み出すエージェントスキル集。[Agent Skills](https://agentskills.io) オープンスタンダード準拠で、**Cursor / Claude Code / Codex / Gemini CLI / GitHub Copilot** で共通して利用できる。

## インストール

```bash
gh skill install shunsaku-studio/Prhythm
```

Claude Code からプラグインとしてインストール:

```bash
/plugin marketplace add shunsaku-studio/Prhythm
/plugin install prhythm@shunsaku-studio/Prhythm
```

### このリポジトリで開発する場合（マルチエージェント対応）

スキルの正本は `skills/`。各 AI エージェントは自分の検出ディレクトリしかスキャンしないため、そこから `skills/` への **symlink でつなぐ**（コピーしない）。1 コマンドで Cursor / Claude Code / Codex / Gemini CLI / GitHub Copilot すべてに配布される。

```bash
bash scripts/link-agent-skills.sh
# または npm run skills:link
```

| パス | 役割 | 対応エージェント |
|------|------|------------------|
| `skills/<name>/` | **正本**。編集・validate・PR はここ | — |
| `.agents/skills/<name>/` | 検出用 symlink → `skills/<name>/` | Cursor / Codex / Gemini CLI / GitHub Copilot |
| `.claude/skills/<name>/` | 検出用 symlink → `skills/<name>/` | Claude Code（Copilot も参照） |

`.agents/skills/` は [Agent Skills](https://agentskills.io) 標準の共通相互運用パスで、多くのエージェントが横断的に読む。Claude Code のみ `.claude/skills/` を使うため、この 2 ディレクトリで全ツールをカバーする。

ファイルツリー上は複数箇所に同じ内容が見えるが、実体は `skills/` のみ。新スキル追加後や clone 直後は上記コマンドを再実行すること。`/prhythm-skill-review` などメタスキルは `disable-model-invocation: true` のため、スラッシュで明示呼び出しする。

## スキル一覧

| スキル | 説明 |
|--------|------|
| [prhythm-skill-review](skills/prhythm-skill-review/) | スキルの README 整備と品質レビュー |
| [competitive-research](skills/competitive-research/) | 新規プロダクト・機能向けに競合・参考サービスを調査し、設計判断に使えるインサイトを出す |
| [product-vision-and-concept](skills/product-vision-and-concept/) | 対話でプロダクトのビジョン・コンセプト（一行ステートメント + Why/Who/What/差別化）を言語化する |
| [defining-personas-and-segments](skills/defining-personas-and-segments/) | インタビューメモ等からターゲットユーザー・ペルソナ・セグメントを比較表で整理。Primary は人間が決める設計。Counter-persona で「最適化で失う人」も可視化 |
| [create-journey-map](skills/create-journey-map/) | ヒアリング情報から台本形式のジャーニーマップを生成。As-Is（課題→インサイト→HMW）と To-Be（対比サマリー→コアシーン候補）の2モード |
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
├── .agents/skills/            # symlink → skills/*（Cursor / Codex / Gemini / Copilot）
├── .claude/skills/            # symlink → skills/*（Claude Code）
├── .github/workflows/
│   └── pages.yml              # ドキュメント GitHub Pages デプロイ
├── docs-site/                 # VitePress サイト（site.meta.json + pages/）
├── skills/                    # Agent Skills 正本 (SKILL.md + README.md)
├── scripts/
│   ├── link-agent-skills.sh   # 各エージェント検出 dir へ symlink 生成
│   └── sync-docs.mjs          # skills/ → docs-site/.generated/ 同期
├── slides.md                  # Slidev スライド
├── package.json               # Slidev + docs npm scripts
└── README.md
```

## ライセンス

MIT
