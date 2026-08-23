# delivery-team-plan

## 概要

パイロットのスコープと、顧客側の決裁者・実行者を渡すと、受注後だれが決裁しだれが手を動かすかを体制（Owner / 実行レーン / Support）と RACI に落とし、`docs/delivery-team-plan.md` に書く。時期、KPI、矢羽は `delivery-phase-plan` で扱う。

## 利用メリット

- 決裁者が 1 枚で見えるので、提案のあと「で、誰が動くの」が消えやすい。
- サインする人と手を動かす人が分かれるので、同じ人が全部やる表にならない。
- 瞬作（高速プロトタイピング）チームの入り方が提案に残るので、作って終わりになりにくい。

## 利用シーン

- プロトとデモはあるが、受注後の動きが空のとき
- 決裁と現場作業が同じ欄に入ってしまうとき
- 作って終わりになりそうなとき

依頼の例: 「パイロットを回す体制と、誰が何を決めるかを書いて」

## 使い方

**いつ使うか:** プロトとデモはあるが、受注後「誰が決裁し、誰が手を動かすか」が空のときに入る。`proto-storyboard` で見せ方を固めたあと、または `uncertainty-map` で検証項目が見えたあとに使うことが多い。矢羽、KPI、期間は `delivery-phase-plan` へ。

1. ユーザーがパイロットのスコープと、顧客側の決裁者・実行者を渡す。瞬作の入り方が無ければスキルが仮（改修・計測・分析）で進む。
2. スキルが Owner / 実行レーン / Support の草案を出す。ユーザーが層を見てから RACI に落とす。
3. スキルが決裁事項 4〜6 行を誰が R/A/C/I かにし、`docs/delivery-team-plan.md` にまとめる。時期と判定は `delivery-phase-plan` へ。

## 具体例

依頼: 「社内公募アプリのパイロットを回す体制と、誰が何を決めるかを書いて。」

::: info 出力される `docs/delivery-team-plan.md` の抜粋:

| Layer | Who | Holds |
|---|---|---|
| Owner | 人事企画 · 鈴木さん | スコープ・予算・Go / No-Go |
| Exec | 現場チャンピオン（2部署 × 各1名） | ミッション登録・呼びかけ・現場の声 |
| ... | ... | ... |

| 意思決定事項 | 人事 | IT | 現場 | 瞬作 |
|---|---|---|---|---|
| 対象部署・スコープ | A | C | C | I |
| Go / No-Go 判断 | A | C | C | R |
| ... | ... | ... | ... | ... |

:::

全文は [references/example-uchinaka.md](references/example-uchinaka.md) を参照。

## 構成

```
delivery-team-plan/
├── README.md
├── SKILL.md
├── references/
│   ├── intake.md
│   ├── raci.md               # RACI の書き方と成果物の型
│   └── example-uchinaka.md   # 体制の見本
└── templates/
    └── docs/
        ├── index.md
        └── sections.html
```

## 前提条件

- 案件のスコープ（パイロットが何のためか）。
- 顧客側のキーパーソンまたは組織（名前が無ければ役割名）。

## 注意事項

- スクラムの役割表（PO / SM / Dev）にはしない。
- Owner を部署名だけにしない。人名か役割名を書く。名前が無い人物は作らず、役割名に `※推測` を付ける。

## 関連スキル

| スキル | 関係 |
|--------|------|
| [delivery-phase-plan](../delivery-phase-plan/README.md) | 役割をレーンにした矢羽と Go/No-Go を書きたいときに使う |
| [uncertainty-map](../uncertainty-map/README.md) | 何を検証するかはあちら。こちらは誰が決めるか |
| [proto-storyboard](../proto-storyboard/README.md) | 提案パックのデモ台本を書きたいときに使う |
| [prhythm-docs](../prhythm-docs/README.md) | 出力を打ち合わせ用の Markdown と HTML にまとめたいときに使う |
