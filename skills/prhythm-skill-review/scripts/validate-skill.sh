#!/usr/bin/env bash
# validate-skill.sh — mechanical checks for Prhythm Agent Skills (Layer A)
# Usage: validate-skill.sh [path/to/skill-dir]
# Exit: 0 pass, 1 warn, 2 fail

set -uo pipefail

SKILL_DIR="${1:-.}"
SKILL_DIR="$(cd "$SKILL_DIR" && pwd)"
SKILL_MD="$SKILL_DIR/SKILL.md"
README_MD="$SKILL_DIR/README.md"
DIR_NAME="$(basename "$SKILL_DIR")"

FAIL_COUNT=0
WARN_COUNT=0

fail() {
  echo "FAIL: $*"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

warn() {
  echo "WARN: $*"
  WARN_COUNT=$((WARN_COUNT + 1))
}

pass() {
  echo "PASS: $*"
}

# --- SKILL.md exists ---
if [[ ! -f "$SKILL_MD" ]]; then
  fail "SKILL.md not found in $SKILL_DIR"
  echo ""
  echo "Summary: $FAIL_COUNT fail, $WARN_COUNT warn"
  exit 2
fi

# --- Frontmatter ---
if ! head -n 1 "$SKILL_MD" | grep -q '^---$'; then
  fail "SKILL.md missing YAML frontmatter opening ---"
else
  pass "Frontmatter opening present"
fi

FRONTMATTER=$(awk '/^---$/{n++; if(n==1) next; if(n==2) exit} n==1' "$SKILL_MD")

NAME=$(echo "$FRONTMATTER" | grep -E '^name:' | head -1 | sed 's/^name:[[:space:]]*//' | tr -d '\r')
DESCRIPTION=$(echo "$FRONTMATTER" | awk '/^description:/ {sub(/^description:[[:space:]]*/, ""); desc=$0; getline; while ($0 !~ /^[a-zA-Z_]/ && NF) {desc=desc " " $0; getline}; print desc; exit}' | tr -d '\r')

# Fallback simple description extract
if [[ -z "$DESCRIPTION" ]]; then
  DESCRIPTION=$(echo "$FRONTMATTER" | grep -E '^description:' | head -1 | sed 's/^description:[[:space:]]*//' | tr -d '\r')
fi

if [[ -z "$NAME" ]]; then
  fail "Frontmatter missing 'name'"
else
  pass "Frontmatter has name: $NAME"
fi

if [[ -z "$DESCRIPTION" ]]; then
  fail "Frontmatter missing 'description'"
else
  pass "Frontmatter has description"
fi

DISABLE_INVOCATION=$(echo "$FRONTMATTER" | grep -E '^disable-model-invocation:' | head -1 | sed 's/^disable-model-invocation:[[:space:]]*//' | tr -d '\r')
if [[ -z "$DISABLE_INVOCATION" ]]; then
  warn "Frontmatter missing 'disable-model-invocation' (set explicitly per Prhythm convention)"
else
  pass "Frontmatter has disable-model-invocation: $DISABLE_INVOCATION"
fi

# --- name matches directory ---
if [[ -n "$NAME" && "$NAME" != "$DIR_NAME" ]]; then
  fail "name '$NAME' does not match directory '$DIR_NAME'"
else
  pass "name matches directory"
fi

# --- description length ---
if [[ -n "$DESCRIPTION" ]]; then
  DESC_LEN=${#DESCRIPTION}
  if [[ "$DESC_LEN" -gt 1024 ]]; then
    fail "description length $DESC_LEN exceeds 1024"
  elif [[ "$DESC_LEN" -lt 20 ]]; then
    warn "description very short ($DESC_LEN chars)"
  else
    pass "description length OK ($DESC_LEN chars)"
  fi
fi

# --- line count ---
LINE_COUNT=$(wc -l < "$SKILL_MD" | tr -d ' ')
if [[ "$LINE_COUNT" -gt 500 ]]; then
  fail "SKILL.md has $LINE_COUNT lines (max 500)"
elif [[ "$LINE_COUNT" -gt 300 ]]; then
  warn "SKILL.md has $LINE_COUNT lines (prefer under 300)"
else
  pass "SKILL.md line count OK ($LINE_COUNT)"
fi

# --- hedging patterns (body only, after frontmatter; sync with review-rubric.md) ---
BODY=$(awk '/^---$/{n++; next} n>=2' "$SKILL_MD")
HEDGING_FOUND=0
for pattern in 'should consider' 'try to' 'you may want' 'it can be helpful'; do
  if echo "$BODY" | grep -qi "$pattern"; then
    warn "Hedging pattern found: '$pattern'"
    HEDGING_FOUND=1
  fi
done
for word in might consider; do
  if echo "$BODY" | grep -qiw "$word"; then
    warn "Hedging pattern found: '$word'"
    HEDGING_FOUND=1
  fi
done
if [[ "$HEDGING_FOUND" -eq 0 ]]; then
  pass "No common hedging patterns"
fi

# --- Windows paths ---
if echo "$BODY" | grep -qE '\\\\'; then
  fail "Windows-style backslash paths detected"
else
  pass "No Windows-style paths"
fi

# --- README required headings ---
REQUIRED_HEADINGS=(
  "概要"
  "利用メリット"
  "利用シーン"
  "使い方"
  "構成"
  "前提条件"
  "注意事項"
  "関連スキル"
)

if [[ ! -f "$README_MD" ]]; then
  warn "README.md not found"
else
  pass "README.md exists"
  MISSING=0
  for heading in "${REQUIRED_HEADINGS[@]}"; do
    if ! grep -qE "^## ${heading}" "$README_MD"; then
      warn "README missing heading: ## ${heading}"
      MISSING=1
    fi
  done
  if [[ "$MISSING" -eq 0 ]]; then
    pass "README has all 8 required headings"
  fi
fi

# --- relative markdown links in SKILL.md ---
LINK_PATHS=$(echo "$BODY" | grep -oE '\[[^]]+\]\(([^)]+)\)' | sed -n 's/.*(\([^)]*\)).*/\1/p' | grep -v '^https\?://' | grep -v '^#' || true)
if [[ -n "$LINK_PATHS" ]]; then
  while IFS= read -r link; do
    [[ -z "$link" ]] && continue
    # strip anchor
    link="${link%%#*}"
    TARGET="$SKILL_DIR/$link"
    if [[ ! -e "$TARGET" ]]; then
      warn "Broken link in SKILL.md: $link"
    fi
  done <<< "$LINK_PATHS"
  pass "Link check completed"
fi

# --- summary ---
echo ""
echo "Summary: $FAIL_COUNT fail, $WARN_COUNT warn"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  exit 2
elif [[ "$WARN_COUNT" -gt 0 ]]; then
  exit 1
fi
exit 0
