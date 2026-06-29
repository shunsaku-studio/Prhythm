#!/usr/bin/env bash
#
# ペルソナ・セグメント定義の出力Markdownに、必須セクションが揃っているかを検証する。
# Stage 1（俯瞰）、Stage 2（深掘り）のいずれかに合致するかを判定する。
#
# 使い方:
#   ./validate_output.sh <出力.md>             # 自動判定
#   ./validate_output.sh --stage 1 <出力.md>   # Stage 1 として検証
#   ./validate_output.sh --stage 2 <出力.md>   # Stage 2 として検証
#
# 終了コード:
#   0: いずれかのモードで必須セクションが揃っている（警告なし）
#   1: 必須セクションが不足している、または警告あり
#   2: ファイルが読めない／引数エラー

set -u

STAGE="auto"
FILE=""

usage() {
  sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
  exit 2
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stage)
      STAGE="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      if [[ -z "$FILE" ]]; then
        FILE="$1"
        shift
      else
        echo "不明な引数: $1" >&2
        usage
      fi
      ;;
  esac
done

if [[ -z "$FILE" ]]; then
  echo "ファイルパスが指定されていません" >&2
  usage
fi

if [[ ! -f "$FILE" ]]; then
  echo "ファイルが見つかりません: $FILE" >&2
  exit 2
fi

case "$STAGE" in
  auto|1|2|stage1|stage2) ;;
  *)
    echo "不明な --stage 値: $STAGE（1 / 2 / auto のいずれか）" >&2
    exit 2
    ;;
esac

# 必須セクション（Markdown 見出しの末尾断片で部分一致するかをチェック）
STAGE1_SECTIONS=(
  "User / Stakeholder Candidates"
  "Segmentation Axes"
  "Segment Comparison Table"
  "Persona Comparison Table"
  "Human Decision Gates"
  "Next Action"
)
STAGE2_SECTIONS=(
  "Persona Deep Dive"
  "Validation Plan"
  "Out-of-scope Rationale"
)

# 見出し行（# / ## / ###）を抽出
HEADINGS_FILE="$(mktemp)"
trap 'rm -f "$HEADINGS_FILE"' EXIT
grep -E "^#{1,3} " "$FILE" | sed -E 's/^#{1,3} +//' > "$HEADINGS_FILE"

# 指定セクション群がすべて含まれているかを確認し、見つかった数を返す
count_found() {
  local -a sections=("$@")
  local found=0
  local section
  for section in "${sections[@]}"; do
    if grep -Fqi -- "$section" "$HEADINGS_FILE"; then
      found=$((found + 1))
    fi
  done
  echo "$found"
}

# 不足セクションを列挙
list_missing() {
  local -a sections=("$@")
  local section
  for section in "${sections[@]}"; do
    if grep -Fqi -- "$section" "$HEADINGS_FILE"; then
      printf "  OK   %s\n" "$section"
    else
      printf "  MISS %s\n" "$section"
    fi
  done
}

count_missing() {
  local -a sections=("$@")
  local missing=0
  local section
  for section in "${sections[@]}"; do
    if ! grep -Fqi -- "$section" "$HEADINGS_FILE"; then
      missing=$((missing + 1))
    fi
  done
  echo "$missing"
}

echo "=== 検証対象: $FILE ==="
echo

# モード自動判定
if [[ "$STAGE" == "auto" ]]; then
  found1=$(count_found "${STAGE1_SECTIONS[@]}")
  found2=$(count_found "${STAGE2_SECTIONS[@]}")
  total1=${#STAGE1_SECTIONS[@]}
  total2=${#STAGE2_SECTIONS[@]}
  score1=$((found1 * 100 / total1))
  score2=$((found2 * 100 / total2))
  if [[ $score2 -gt $score1 ]]; then
    STAGE="2"
    echo "【自動判定】最もマッチするモード: stage2 (スコア: ${score2}%)"
  else
    STAGE="1"
    echo "【自動判定】最もマッチするモード: stage1 (スコア: ${score1}%)"
  fi
  echo "  stage1=${score1}%, stage2=${score2}%"
fi

case "$STAGE" in
  1|stage1)
    REQUIRED=("${STAGE1_SECTIONS[@]}")
    MODE_LABEL="stage1"
    ;;
  2|stage2)
    REQUIRED=("${STAGE2_SECTIONS[@]}")
    MODE_LABEL="stage2"
    ;;
esac

echo
echo "【必須セクションの確認 ($MODE_LABEL)】"
list_missing "${REQUIRED[@]}"
MISSING=$(count_missing "${REQUIRED[@]}")

echo
echo "【エビデンスタグの出現数】"
fact_count=$(grep -Fco "[Fact]" "$FILE" || true)
assumption_count=$(grep -Fco "[Assumption]" "$FILE" || true)
unknown_count=$(grep -Fco "[Unknown]" "$FILE" || true)
risk_count=$(grep -Fco "[Risk]" "$FILE" || true)
printf "  [Fact]        %s 件\n" "$fact_count"
printf "  [Assumption]  %s 件\n" "$assumption_count"
printf "  [Unknown]     %s 件\n" "$unknown_count"
printf "  [Risk]        %s 件\n" "$risk_count"

WARNINGS=()

if [[ "$fact_count" -eq 0 && "$assumption_count" -eq 0 ]]; then
  WARNINGS+=("エビデンスタグが1つも見つかりません。各記述に Fact/Assumption/Unknown/Risk を付けてください。")
fi
if [[ "$risk_count" -eq 0 ]]; then
  WARNINGS+=("[Risk] タグがありません。重大な前提を見落としている可能性。")
fi
if [[ "$unknown_count" -eq 0 ]]; then
  WARNINGS+=("[Unknown] タグがありません。「分からないこと」を明示できていない可能性。")
fi

# Primary を「確定」として書いていないかチェック
decided_main=$(grep -Ec "主要(ペルソナ|セグメント)は[^候]" "$FILE" || true)
decided_target=$(grep -c "ターゲットは.*に決定" "$FILE" || true)
# 英語: "primary persona/segment is" の行のうち "candidate" を含まない行のみカウント
total_en=$(grep -ciE "primary (persona|segment) is " "$FILE" || true)
candidate_en=$(grep -iE "primary (persona|segment) is " "$FILE" | grep -ci "candidate" || true)
decided_en=$((total_en - candidate_en))

if [[ "$decided_main" -gt 0 ]]; then
  WARNINGS+=("「主要ペルソナ/セグメントは X」と断定している箇所が ${decided_main} 件")
fi
if [[ "$decided_target" -gt 0 ]]; then
  WARNINGS+=("「ターゲットは X に決定」と断定している箇所が ${decided_target} 件")
fi
if [[ "$decided_en" -gt 0 ]]; then
  WARNINGS+=("\"Primary persona/segment is X\" と断定している箇所が ${decided_en} 件")
fi

# Counter-persona の存在チェック（Stage 1 のみ）
if [[ "$MODE_LABEL" == "stage1" ]]; then
  if ! grep -Fqi "Counter-persona" "$FILE"; then
    WARNINGS+=("Counter-persona が見当たりません。Primary 候補と中核軸で正反対の人物を1つ置くことが推奨されています（references/persona-template.md 参照）。")
  fi
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo
  echo "【警告】"
  for w in "${WARNINGS[@]}"; do
    printf "  - %s\n" "$w"
  done
fi

echo
if [[ "$MISSING" -gt 0 ]]; then
  echo "結果: 必須セクションが ${MISSING} 個不足しています。"
  exit 1
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo "結果: 必須セクションは揃っていますが、警告があります。"
  exit 1
fi

echo "結果: OK"
exit 0
