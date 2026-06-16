#!/usr/bin/env bash
# Merge OOUI layer-ordered organizeImports into biome.json
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../.." && pwd)"
BIOME_JSON="$REPO_ROOT/biome.json"
GROUPS_JSON="$SKILL_DIR/templates/biome-import-groups.json"

if [[ ! -f "$BIOME_JSON" ]]; then
  echo "biome.json not found: $BIOME_JSON" >&2
  exit 1
fi

python3 - <<'PY' "$REPO_ROOT" "$BIOME_JSON" "$GROUPS_JSON"
import json
import pathlib
import sys

repo = pathlib.Path(sys.argv[1])
biome_path = pathlib.Path(sys.argv[2])
groups_path = pathlib.Path(sys.argv[3])

catalog = json.loads(groups_path.read_text())
variant = "pages" if (repo / "src/pages").is_dir() else "app" if (repo / "src/app").is_dir() else None
if variant is None:
    raise SystemExit("Neither src/pages nor src/app found. Agent: continue per docs/scaffold.md Phase 1.")

raw_groups = catalog[variant]["groups"]

OPTIONAL_LAYERS = {"env", "gql"}

def layer_exists(entry):
    if not isinstance(entry, list):
        return True
    alias = entry[0]
    rel = alias.removeprefix("@/").split("/")[0]
    if rel in OPTIONAL_LAYERS:
        return (repo / "src" / rel).exists()
    return True

filtered = []
for i, g in enumerate(raw_groups):
    if isinstance(g, list) and not layer_exists(g):
        continue
    if g == ":BLANK_LINE:" and filtered and filtered[-1] == ":BLANK_LINE:":
        continue
    if g == ":BLANK_LINE:" and (not filtered or filtered[-1] == ":BLANK_LINE:"):
        continue
    filtered.append(g)

while filtered and filtered[-1] == ":BLANK_LINE:":
    filtered.pop()

biome = json.loads(biome_path.read_text())
assist = biome.setdefault("assist", {})
actions = assist.setdefault("actions", {})
source = actions.setdefault("source", {})
source["organizeImports"] = {
    "level": "on",
    "options": {"groups": filtered},
}

biome_path.write_text(json.dumps(biome, indent=2) + "\n")
print(f"Applied {variant} routing import groups to {biome_path}")
print(f"Groups: {len(filtered)} entries")
PY
