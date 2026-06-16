#!/usr/bin/env bash
# Apply a theme to slides/{deck}/content/tokens.css
# Usage: apply-theme.sh slides/my-deck <theme-id>
set -euo pipefail

OUT="${1:-}"
THEME="${2:-}"

if [[ -z "$OUT" || -z "$THEME" ]]; then
  echo "Usage: apply-theme.sh slides/my-deck <theme-id>" >&2
  echo "Ids: default, violet-bloom, project, omelette, minimal-mono, warm-neutral, dark-editorial" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
THEMES="$SKILL_DIR/templates/themes"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
CONTENT="$(cd "$REPO_ROOT" && mkdir -p "$(dirname "$OUT")" && cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")/content"

if [[ ! -d "$CONTENT" ]]; then
  echo "Content dir not found: $CONTENT — run init-deck.sh first" >&2
  exit 1
fi

case "$THEME" in
  default|violet-bloom|omelette|minimal-mono|warm-neutral|dark-editorial)
    SRC="$THEMES/$THEME.css"
    ;;
  project)
    if command -v bun >/dev/null 2>&1; then
      bun "$SCRIPT_DIR/detect-project-theme.mjs" "$OUT"
    else
      echo "bun required for project theme detection" >&2
      exit 1
    fi
    SRC="$CONTENT/theme-detected.css"
    ;;
  *)
    echo "Unknown theme: $THEME" >&2
    exit 1
    ;;
esac

if [[ ! -f "$SRC" ]]; then
  echo "Theme file not found: $SRC" >&2
  exit 1
fi

cp "$SRC" "$CONTENT/tokens.css"

LABEL="$THEME"
if [[ -f "$THEMES/catalog.json" ]]; then
  LABEL="$(THEME_ID="$THEME" THEMES_PATH="$THEMES/catalog.json" python3 -c "
import json, os
cat = json.load(open(os.environ['THEMES_PATH']))
m = next((t for t in cat if t['id'] == os.environ['THEME_ID']), None)
print(m['label'] if m else os.environ['THEME_ID'])
")"
fi

THEME_ID="$THEME" THEME_LABEL="$LABEL" META_PATH="$CONTENT/meta.json" python3 -c "
import json, os
with open(os.environ['META_PATH']) as f:
    meta = json.load(f)
meta['theme'] = os.environ['THEME_ID']
meta['themeLabel'] = os.environ['THEME_LABEL']
with open(os.environ['META_PATH'], 'w') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)
"

echo "Applied theme: $THEME ($LABEL)"
echo "  → $CONTENT/tokens.css"
