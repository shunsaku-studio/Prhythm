#!/usr/bin/env bash
# Scaffold model + pages for a new OOUI entity.
# Usage: init-entity.sh <model-singular> [route-plural] [label]
set -euo pipefail

ENTITY="${1:-}"
ROUTE="${2:-}"
LABEL="${3:-}"

if [[ -z "$ENTITY" ]]; then
  echo "Usage: init-entity.sh <model-singular> [route-plural] [label]" >&2
  echo "Example: init-entity.sh article articles 記事" >&2
  exit 1
fi

if [[ -z "$ROUTE" ]]; then
  ROUTE="${ENTITY}s"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
TEMPLATES="$SKILL_DIR/templates"

read -r ENTITY_PASCAL LABEL_RESOLVED < <(
  python3 - "$ENTITY" "$LABEL" <<'PY'
import sys

entity = sys.argv[1]
label = sys.argv[2] or ""
parts = [p for p in entity.split("-") if p]
pascal = "".join(p[:1].upper() + p[1:] for p in parts)
resolved = label or " ".join(p.capitalize() for p in parts)
print(pascal, resolved)
PY
)

MODEL_DIR="$REPO_ROOT/src/model/$ENTITY"
MODELS_FILE="$REPO_ROOT/src/model/common/const/MODELS.ts"
CREATED=()

copy_tree() {
  local src="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  if [[ -d "$src" ]]; then
    mkdir -p "$dest"
    cp -R "$src/." "$dest/"
  else
    cp "$src" "$dest"
  fi
  CREATED+=("$dest")
}

apply_placeholders() {
  local target="$1"
  python3 - "$target" "$ENTITY_PASCAL" "$ENTITY" "$ROUTE" "$LABEL_RESOLVED" <<'PY'
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
entity_pascal, entity, route, label = sys.argv[2:6]
replacements = {
    "__ENTITY__": entity_pascal,
    "__entity__": entity,
    "__route__": route,
    "__label__": label,
}
paths = [root] if root.is_file() else root.rglob("*")
for path in paths:
    if not path.is_file() or path.suffix not in {".ts", ".tsx"}:
        continue
    text = path.read_text()
    for old, new in replacements.items():
        text = text.replace(old, new)
    path.write_text(text)
PY
}

if [[ -d "$MODEL_DIR" ]]; then
  echo "Already exists: $MODEL_DIR" >&2
  exit 1
fi

copy_tree "$TEMPLATES/model/xxx" "$MODEL_DIR"
apply_placeholders "$MODEL_DIR"

mkdir -p "$(dirname "$MODELS_FILE")"
if [[ ! -f "$MODELS_FILE" ]]; then
  cp "$TEMPLATES/model/common/const/MODELS.ts" "$MODELS_FILE"
  apply_placeholders "$MODELS_FILE"
  CREATED+=("$MODELS_FILE")
else
  python3 - "$MODELS_FILE" "$ENTITY_PASCAL" "$LABEL_RESOLVED" <<'PY'
import pathlib
import re
import sys

path = pathlib.Path(sys.argv[1])
entity = sys.argv[2]
label = sys.argv[3]
text = path.read_text()
if re.search(rf"^\s*{re.escape(entity)}\s*:", text, re.M):
    print(f"MODELS already contains {entity}")
    raise SystemExit(0)
entry = f"  {entity}: {{ label: '{label}' }},\n"
text = text.replace("} as const;", entry + "} as const;")
path.write_text(text)
print(f"Updated MODELS: {entity}")
PY
  CREATED+=("$MODELS_FILE (updated)")
fi

if [[ -d "$REPO_ROOT/src/pages" ]]; then
  PAGES_ROUTE="$REPO_ROOT/src/pages/$ROUTE"
  mkdir -p "$PAGES_ROUTE"
  cp "$TEMPLATES/pages/list-page.tsx" "$PAGES_ROUTE/index.tsx"
  cp "$TEMPLATES/pages/detail-page.tsx" "$PAGES_ROUTE/[id].tsx"
  apply_placeholders "$PAGES_ROUTE"
  CREATED+=("$PAGES_ROUTE/index.tsx" "$PAGES_ROUTE/[id].tsx")
elif [[ -d "$REPO_ROOT/src/app" ]]; then
  APP_ROUTE="$REPO_ROOT/src/app/$ROUTE"
  mkdir -p "$APP_ROUTE/[id]"
  cp "$TEMPLATES/app/list-page.tsx" "$APP_ROUTE/page.tsx"
  cp "$TEMPLATES/app/detail-page.tsx" "$APP_ROUTE/[id]/page.tsx"
  cp "$TEMPLATES/app/detail-layout.tsx" "$APP_ROUTE/[id]/layout.tsx"
  apply_placeholders "$APP_ROUTE"
  CREATED+=("$APP_ROUTE/page.tsx" "$APP_ROUTE/[id]/page.tsx" "$APP_ROUTE/[id]/layout.tsx")
else
  echo "Neither src/pages nor src/app found. Continue scaffold: model/ from templates + page files in the project's routing dir (see docs/scaffold.md, reference.md)." >&2
  exit 1
fi

echo "Scaffolded OOUI entity: $ENTITY (route: /$ROUTE)"
echo "Model:  src/model/$ENTITY/"
echo "Entity: $ENTITY_PASCAL | Label: $LABEL_RESOLVED"
echo ""
echo "Created / updated:"
for f in "${CREATED[@]}"; do
  echo "  - $f"
done
echo ""
echo "Then: Phase 2 — wire nav, providers. Phase 3 — implement fetch/query in server.tsx"
