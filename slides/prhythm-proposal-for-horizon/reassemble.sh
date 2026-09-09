#!/usr/bin/env bash
# Rebuild index.html from content/sections/ (run after editing sections)
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
python3 << PYEOF
import json, re
from pathlib import Path

target = Path("$DIR")
content = target / "content"
title = json.loads((content / "meta.json").read_text())["title"]
slides_html = "\n\n".join(
    f.read_text().replace("{{DECK_TITLE}}", title)
    for f in sorted((content / "sections").glob("*.html"))
)
index_path = target / "index.html"
index = index_path.read_text()
index = re.sub(
    r'(<deck-stage[^>]*>)(.*?)(</deck-stage>)',
    lambda m: m.group(1) + "\n" + slides_html + "\n  " + m.group(3),
    index, count=1, flags=re.DOTALL,
)
notes = json.dumps(json.loads((content / "speaker-notes.json").read_text()), ensure_ascii=False)
index = re.sub(
    r'(<script type="application/json" id="speaker-notes">)(.*?)(</script>)',
    r'\1' + notes + r'\3',
    index, count=1, flags=re.DOTALL,
)
index_path.write_text(index)
print(f"Reassembled → {index_path}")
PYEOF
