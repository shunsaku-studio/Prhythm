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
# Speaker notes are authored in Notion, not here; ship an empty array if absent.
notes_path = content / "speaker-notes.json"
notes = json.dumps(
    json.loads(notes_path.read_text()) if notes_path.exists() else [],
    ensure_ascii=False,
)
index = re.sub(
    r'(<script type="application/json" id="speaker-notes">)(.*?)(</script>)',
    r'\1' + notes + r'\3',
    index, count=1, flags=re.DOTALL,
)
index_path.write_text(index)
print(f"Reassembled → {index_path}")
PYEOF
