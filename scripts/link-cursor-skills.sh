#!/usr/bin/env bash
# Cursor 用スキル symlink を張る。
#
# 正本は skills/<name>/。Cursor は .cursor/skills/ しかスキャンしないため、
# ここから skills/ への symlink を作る（コピーではない）。
#
# IDE のファイルツリーでは両方に同じファイルが見えるが、実体は skills/ のみ。
# 編集は skills/ 側だけでよい。
#
# 使い方:
#   bash scripts/link-cursor-skills.sh
#
# clone 直後や skills/ に新スキルを追加したあとに実行する。
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
dest="$root/.cursor/skills"

mkdir -p "$dest"

for skill_dir in "$root"/skills/*/; do
  [[ -f "$skill_dir/SKILL.md" ]] || continue
  name="$(basename "$skill_dir")"
  ln -sfn "../../skills/$name" "$dest/$name"
  echo "linked .cursor/skills/$name -> skills/$name"
done
