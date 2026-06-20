# feature-backlog-mapper

> ユースケース一覧から **機能一覧（提案版）** または **プロダクトバックログ（スプリント版）** を生成するエージェントスキル。

`usecase-mapper` が出力した `docs/usecase-map.md` の UC ID を起点に、各ユースケースを機能（Feature）に分解し、MoSCoW で優先度を付けた状態で `docs/feature-list.md` に書き出します。同じ Feature ID を引き継ぎ、開発スプリントに割れる **プロダクトバックログ** へ詳細化することもできます（ユーザーストーリー・受入基準・見積・依存・DoD・INVEST）。

---

## 概要

`docs/usecase-map.md` の UC ID をアンカーに、機能（Feature）を MoSCoW で優先度付きで抽出します。**提案フェーズ向けの軽量な機能一覧** と **開発スプリント向けのプロダクトバックログ** の二段モードを持ち、同じ Feature ID で行き来できます。出力は Markdown のため GitHub・VS Code でそのまま閲覧・差分レビューできます。

## 利用メリット

- **機能の根拠が明確になる** — 各機能が UC ID にぶら下がるので、「なぜこれを作るか」が常に追える
- **優先度を一緒に運べる** — Must/Should/Could/Won't が物差し（ビジョン・制約・コスト）と一緒に揃うので、合意の起点になる
- **作り直しがいらない** — 提案版で出した機能 ID が、そのままスプリント版の見出しに引き継がれる
- **見積もりと開発の入口になる** — スプリント版では受入基準と見積が揃った PBI が出るので、そのままスプリントに割り振れる
- **棄却の証跡が残る** — Won't 機能は理由付きで「棄却したアイデアと理由」に蓄積され、後の意思決定で「他案も見た上での結論」を示せる

## 利用シーン

- **ユースケースは出たけど、何を作るか言語化できていないとき** — UC を機能に分解して優先度を付けたい
- **提案資料に「コア機能一覧」を入れたいとき** — MoSCoW と入出力が一目で分かる軽量版が欲しい
- **PoC や本番開発に入る前に、スプリントに割れる形にしたいとき** — User Story・受入基準・見積・依存が揃った PBI が欲しい
- **「全部 Must で並べてしまう」を防ぎたいとき** — 物差しと根拠付きの優先度を半強制したい
- **「思いつきの機能追加」を抑制したいとき** — UC アンカーを必須にして、UC を増やすか機能を諦めるかを選ばせたい

依頼の例:

```
docs/usecase-map.md から機能一覧を作って
このプロジェクトの要件定義書を作って
スプリントに割れるプロダクトバックログを作って
MoSCoW で優先度をつけて
```

## 使い方

Claude Code / Cursor 上で次のように依頼すると起動します。

```
/feature-backlog-mapper docs/usecase-map.md から機能一覧を作って
/feature-backlog-mapper Mode B でプロダクトバックログにして
```

スラッシュ無しでも、機能一覧・要件定義書・プロダクトバックログ・MoSCoW・ユーザーストーリー・受入基準などのキーワードを含む依頼で自動起動します。

入力ソース（usecase-map.md・ビジョン・競合調査ノートなど）が複数ある場合は、依頼時に対象を伝えてください。

## 構成

```
feature-backlog-mapper/
├── SKILL.md                     # エージェントが読む本体（モデル向け、英語）
├── README.md                    # 本ファイル（人間向け、日本語）
└── references/                  # 進行のための詳細
    ├── intake.md
    ├── feature-decomposition.md
    ├── moscow-criteria.md
    ├── proposal-template.md
    ├── backlog-template.md
    ├── user-story-and-ac.md
    ├── estimation-guide.md
    ├── quality-checklist.md
    ├── eval-scenarios.md        # Layer A/B/C 評価シナリオ + プロンプト
    └── eval-rubric.md           # 観測すべき合否項目チェックリスト
```

## 前提条件

- Claude Code または Cursor（プラグイン `prhythm` の一部として配布）
- 主入力 `docs/usecase-map.md`（[usecase-mapper](../usecase-mapper/) で生成）
- 任意入力 `docs/product-vision.md`（[product-vision-and-concept](../product-vision-and-concept/) で生成）

## 注意事項

- **UC アンカー必須** — UC ID に紐付かない機能は追加しません。必要なときは `(UC候補)` ラベルを立て、`usecase-mapper` に戻って UC を増やすことを促します
- **Must の根拠が必須** — Must 機能は 1 行の根拠が無いと Should/Could に降格されます
- **Mode B は Mode A を前提** — プロダクトバックログ単独で起動した場合も、内部でまず Mode A を確認します
- **空欄を捏造しない** — 文書だけでは確定できない API・画面パスなどは `—` で空欄のまま残します
- 既存の `docs/feature-list.md` / `docs/product-backlog.md` がある場合は上書き前に差分を確認します
- 出力は Markdown のみで、JIRA / Linear などの外部 PBI ツールへの直接連携は行いません

## 関連スキル

| スキル | 関係 |
|--------|------|
| [usecase-mapper](../usecase-mapper/) | 必須の上流。UC ID と UC 一覧を提供する |
| [product-vision-and-concept](../product-vision-and-concept/) | 補助の上流。Must/Should の物差しになる一行ステートメントを提供する |
| [competitive-research](../competitive-research/) | 補助の上流。Should/Could 候補の参考機能ソース |
| [prototype-design-md](../prototype-design-md/) | 下流。Mode A の機能一覧を受けてプロトの DESIGN.md を書く |
| [ooui-architect](../ooui-architect/) | 下流。Mode B の PBI を受けて common/model/pages を実装する |
| [ooui-graphql-modeling](../ooui-graphql-modeling/) | 下流。Mode B の PBI を受けて GraphQL SDL を設計する |
| [prhythm-skill-review](../prhythm-skill-review/) | メタ。本スキルの評価ループ（Layer A/B/C）を回す相方 |
