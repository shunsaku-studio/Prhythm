# インストール

Prhythm は [Agent Plugins](https://agent-plugins.org) 1.0.0 のプラグインとしてバンドル全体を入れられる。個別スキルだけ欲しいときは [GitHub CLI](https://cli.github.com/) の `gh skill` を使う。

## Agent Plugins（Cursor / Copilot / VS Code / Kiro）

ルートの `plugin.json` と `skills/` がポータブルパッケージ。Cursor でリポジトリをローカル確認する:

```bash
ln -s /path/to/Prhythm ~/.cursor/plugins/local/prhythm
```

ウィンドウを再読み込みしたあと、Customize で `prhythm` のスキルが出ることを確認する。Copilot CLI では次を使う:

```bash
copilot plugin install /path/to/Prhythm
```

## Claude Code

```text
/plugin marketplace add shunsaku-studio/Prhythm
/plugin install prhythm@prhythm
```

## スキル単位（gh skill）

```bash
gh skill install shunsaku-studio/Prhythm --all
```

各スキルページ上部のタブから、エージェント別コマンドをコピーできる。

```bash
gh skill install shunsaku-studio/Prhythm <skill-name>
gh skill install shunsaku-studio/Prhythm <skill-name> --agent cursor --scope user
```
