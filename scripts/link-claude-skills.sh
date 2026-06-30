#!/usr/bin/env bash
# Claude Code 用スキル symlink を張る（プロジェクトスコープ）。
#
# 正本は skills/<name>/。Claude Code はプロジェクト直下の .claude/skills/ を
# スキャンするため、ここから skills/ への symlink を作る（コピーではない）。
#
# IDE のファイルツリーでは両方に同じファイルが見えるが、実体は skills/ のみ。
# 編集は skills/ 側だけでよい。
#
# 使い方:
#   bash scripts/link-claude-skills.sh
#
# clone 直後や skills/ に新スキルを追加したあとに実行する。
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
dest="$root/.claude/skills"

mkdir -p "$dest"

for skill_dir in "$root"/skills/*/; do
  [[ -f "$skill_dir/SKILL.md" ]] || continue
  name="$(basename "$skill_dir")"
  ln -sfn "../../skills/$name" "$dest/$name"
  echo "linked .claude/skills/$name -> skills/$name"
done
