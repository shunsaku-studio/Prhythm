# prototype-design-md

## 概要

v0 や Cursor で UI を生成する **前** に、AI が読む **1枚の判断ブリーフ** `DESIGN.md` を一緒に作るスキル。hex や padding の値は CSS トークンに任せ、ここでは **性格・サーフェス・禁止パターン・コンポーネント選び** だけを固定する。

**流れ（承認は調整の「OK」で 1 回）**

1. **参考を探す** — 製品名・用途・空気感を伝えると、[getdesign.md](https://getdesign.md/) ベースの **参考テーマ 5 件**（各 slug に **プレビュー URL** + Match / Borrow / Avoid）と、既存 CSS の検出結果・トークン方針 A/B/C が返る。feel が明確、guardrails だけ、トークン済みなどはスキップ可。
2. **調整する** — slug と方針を選んだあと **Intent Summary**（feel・サーフェス・禁止のプレビュー）がチャットに出る。足りない点はヒアリング。「OK」で確定。
3. **作成する** — プロジェクトルートに `DESIGN.md` を書き lint 通過。以降の v0 / Cursor はこのファイルをコンテキストに読む。

## 利用メリット

- **AI 生成 UI のトーンがブレにくい** — feel・禁止パターン・コンポーネント選びを先に 1 枚に固定できる
- **デザイントークンと判断の更新が独立する** — hex や radius はトークン側、性格やサーフェスは DESIGN.md と役割分担できる
- **generic slop を事前に防げる** — hero 乱立、Inter デフォルト、業務画面なのにマーケ風レイアウトなどを意図的に排除できる
- **着手前にチームで合意できる** — 生成前に意図を要約して確認してから書き起こせる

## 利用シーン

- **v0 や Cursor で UI 生成を始める直前** — 生成 AI が読むトーン契約を先に置きたい
- **「モダンでクリーン」だけでは具体性が足りない** — 空気感と「〜ではない」を言語化したい
- **業務ツールなのにランディングページ風 UI が出やすい** — サーフェスと禁止パターンで方向を絞りたい
- **デザイントークンはあるが判断基準がない** — 値は CSS 変数、feel と layout ルールは DESIGN.md で補いたい

依頼の例: 「社内感謝ツール feedit の DESIGN.md を一緒に書いて。イエローでハッピーだが誠実、Bonusly 寄り」

## 使い方

```
/prototype-design-md 社内感謝ツール feedit。イエローでハッピーだが誠実。Bonusly 寄り
```

```
/prototype-design-md 管理画面の guardrails だけ先に DESIGN.md に書いて
```

```
/prototype-design-md デザイントークン適用済み。DESIGN.md を detect から作って
```

Phase 0 で [getdesign.md](https://getdesign.md/) から参考テーマ **5件** + トークン方針（A/B/C）→ Phase 1 で Intent Summary → 「OK」で Phase 2（`DESIGN.md` 作成 + lint）。承認ゲートは Phase 1 の 1 回。

```bash
bash skills/prototype-design-md/scripts/init-design-md.sh
bash skills/prototype-design-md/scripts/lint-design-md.sh DESIGN.md
node skills/prototype-design-md/scripts/detect-project-tokens.mjs
```

## 構成

```
prototype-design-md/
├── README.md
├── SKILL.md
├── references/
│   ├── theme-discovery.md     # Phase 0: getdesign.md 5件 + token strategy
│   ├── intake.md              # Phase 1 前のヒアリング
│   ├── prototype-brief.md     # 5 pillars とセクション対応
│   ├── workflow.md            # Phase 0–2 とゲート
│   ├── surface-types.md       # operational tool / dashboard 等
│   ├── anti-slop.md           # 禁止パターン
│   ├── prose-guide.md         # Product Feel の書き方
│   ├── quality-checklist.md   # Phase 2 セルフレビュー
│   └── google-spec-summary.md # §1–8 と lint 要件
├── scripts/
│   ├── init-design-md.sh
│   ├── lint-design-md.sh
│   └── detect-project-tokens.mjs
└── templates/
    └── DESIGN.stub.md
```

## 前提条件

- Node.js（`detect-project-tokens.mjs`、`npx @google/design.md lint`、`npx @webdesignhot/design-md`（Phase 0 テーマ探索）用）
- bash
- スキル配置: Prhythm `skills/` または `~/.cursor/skills/`
- 明示呼び出し専用（`disable-model-invocation: true`）

## 注意事項

- **非対応:** トークン hex / YAML token blocks、全コンポーネント詳細 spec、モーション詳細、ガバナンス文書
- **プロトタイプ後の詳細化**はこのスキルの範囲外 — `DESIGN.md` を編集するか spec を別ファイルに分離する
- 「一覧は常に Table」「Desktop 最優先」は鵜呑みにしない — サーフェスと intake（モバイル critical 等）で決める
- Product Feel は「modern and clean」だけにしない — 否定制約（「〜ではない」）が必要

## 関連スキル


| スキル               | 関係     |
| ----------------- | ------ |
| `ooui-architect`  | 実装（下流） |
| `shadcn-explorer` | テーマ探索  |
| `uncertainty-map` | 下流。プロト範囲の解釈源として DESIGN.md を読み、仮説の検証ステータス判定に使う |


