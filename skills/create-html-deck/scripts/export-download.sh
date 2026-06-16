#!/usr/bin/env bash
# Bundle deck and copy standalone.html to ~/Downloads with date + title in filename.
# Usage: export-download.sh slides/my-deck
set -euo pipefail

OUT="${1:-}"

if [[ -z "$OUT" ]]; then
  echo "Usage: export-download.sh slides/my-deck" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
DECK_DIR="$(cd "$REPO_ROOT" && mkdir -p "$(dirname "$OUT")" && cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
CONTENT="$DECK_DIR/content"
STANDALONE="$DECK_DIR/dist/standalone.html"

if [[ ! -f "$DECK_DIR/index.html" ]]; then
  echo "Not found: $DECK_DIR/index.html — run assemble.sh first" >&2
  exit 1
fi

if command -v bun >/dev/null 2>&1; then
  bun "$SCRIPT_DIR/bundle-standalone.mjs" "$OUT"
else
  echo "bun required for bundle-standalone.mjs" >&2
  exit 1
fi

if [[ ! -f "$STANDALONE" ]]; then
  echo "Bundle failed: $STANDALONE" >&2
  exit 1
fi

META_PATH="$CONTENT/meta.json"
EXPORT_NAME="$(
  META_PATH="$META_PATH" DECK_DIR="$DECK_DIR" python3 <<'PY'
import json, os, re
from datetime import date
from pathlib import Path

meta_path = Path(os.environ["META_PATH"])
deck_dir = Path(os.environ["DECK_DIR"])

title = deck_dir.name
if meta_path.is_file():
    try:
        meta = json.loads(meta_path.read_text())
        title = meta.get("title") or meta.get("deckName") or title
    except json.JSONDecodeError:
        pass

slug = re.sub(r"[^\w\s-]", "", title, flags=re.UNICODE)
slug = re.sub(r"[-\s]+", "-", slug.strip()).strip("-") or "deck"
print(f"{date.today().isoformat()}_{slug}.html")
PY
)"

DOWNLOADS="${HOME}/Downloads"
mkdir -p "$DOWNLOADS"
DEST="$DOWNLOADS/$EXPORT_NAME"

if [[ -e "$DEST" ]]; then
  BASE="${DEST%.html}"
  N=2
  while [[ -e "${BASE}-${N}.html" ]]; do
    N=$((N + 1))
  done
  DEST="${BASE}-${N}.html"
fi

cp "$STANDALONE" "$DEST"
echo "Exported: $DEST"
echo "Size: $(du -h "$DEST" | cut -f1 | xargs)"

if [[ "$(uname)" == "Darwin" ]]; then
  open -R "$DEST"
fi
