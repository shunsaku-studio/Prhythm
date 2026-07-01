#!/usr/bin/env bash
# Agent Skills の symlink を各 AI エージェントの検出ディレクトリに張る。
#
# 正本は skills/<name>/。各エージェントは自分の検出ディレクトリしかスキャンしない
# ため、そこから skills/ への symlink を作る（コピーではない）。編集は skills/ 側
# だけでよく、全エージェントに即反映される。
#
# 検出ディレクトリと対応エージェント:
#   .agents/skills/  … Cursor / Codex / Gemini CLI / GitHub Copilot
#                      （Agent Skills 標準の共通相互運用パス）
#   .claude/skills/  … Claude Code（GitHub Copilot も参照する）
#
# この 2 ディレクトリで Cursor / Claude Code / Codex / Gemini / Copilot を
# すべてカバーする。
#
# 使い方:
#   bash scripts/link-agent-skills.sh
#
# clone 直後や skills/ に新スキルを追加したあとに実行する。
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"

# 検出ディレクトリ一覧（root からの相対パス）。
dests=(
  ".agents/skills"
  ".claude/skills"
)

for dest_rel in "${dests[@]}"; do
  dest="$root/$dest_rel"
  mkdir -p "$dest"

  # symlink から root に戻るための ../ プレフィックス（パス階層数ぶん）。
  depth="$(awk -F/ '{print NF}' <<<"$dest_rel")"
  prefix=""
  for ((i = 0; i < depth; i++)); do prefix+="../"; done

  for skill_dir in "$root"/skills/*/; do
    [[ -f "$skill_dir/SKILL.md" ]] || continue
    name="$(basename "$skill_dir")"
    ln -sfn "${prefix}skills/$name" "$dest/$name"
    echo "linked $dest_rel/$name -> skills/$name"
  done
done
