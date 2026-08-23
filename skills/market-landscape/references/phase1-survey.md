# Phase 1 — Service Survey

領域の代表サービスを集め、スキャン可能なカタログにする。深掘りプロファイルは作らない（地図の材料集め）。

## Goal

- 12–20 件の REFERENCES（ユーザーが広げたい場合のみ 30 まで）
- タイプ分け（直接競合 / 隣接 / UX・BM 参考 / 非公式チャネル含む）
- Phase 2 の軸抽出に使える「違いの種」を残す

## Search strategy

最低 5–8 回 Web 検索。日英両方。次を混ぜる:

1. **同課題** — 同じ pain を解くサービス
2. **同カテゴリ隣接** — カテゴリは近いが解き方が違うもの
3. **異ドメイン参考** — 同じ動詞（やる行為）で他業界の上手い解（ドメイン名詞を検索語から外す）
4. **非公式代替** — Slack チャンネル、スプレッドシート、口頭運用など「実質競合」

ディレクトリ系は最低 2 つ: Product Hunt / G2 / Capterra / YC / STARTUP DB / INITIAL など。

## Output

```markdown
## Phase 1: REFERENCES

### Research Frame（再掲）
{Phase 0 表}

### Catalog

#### [{Name}]({url})
- **Type:** Direct | Adjacent | UX/BM Reference | Informal
- **What:** {1 文}
- **Who:** {主な利用者}
- **How it wins:** {選ばれる理由の仮説 1 行}
- **Friction:** {ユーザーが詰まりそうな点 1 行}
- **Scale signal:** {funding / users / 要確認}

{… 12–20 件}

### Cluster notes（軸の種）

サービス間の差として見えた対立を 5–8 個、短いフレーズで列挙する。
例: 「社員が自分で探す vs 人事が配置する」「異動前提 vs 小さく試す」

これは Phase 2 の材料。ここで軸を確定しない。

### Gaps
- {まだ拾えていない領域}
- {次に調べるとよいクエリ}
```

## Anti-patterns

- カタログだけで終わって Cluster notes がない
- 全部 Direct Competitor 扱い（隣接・非公式がゼロ）
- 1 サービスあたり長文プロファイルを書く
- 料金を aggregator 記事だけで確定扱い
