#!/usr/bin/env bash
#
# Builds the downloadable portfolio PDF.
#
# The Save-as-PDF button used to ask the reader's browser to print the page.
# That made the result depend on their browser, operating system, paper size,
# margin preset and the "Background graphics" checkbox — which is off by
# default and turned the whole document dark. This script renders the PDF once,
# here, under known conditions, and the site serves that file to everyone.
#
# Re-run it whenever the page content changes, or the download goes stale.
#
#   ./tools/build-pdf.sh
#
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="assets/docs/John-Silva-Engineering-Portfolio.pdf"
PORT=8799
BUILD="__pdfbuild.html"

command -v chromium >/dev/null || { echo "chromium not found"; exit 1; }

cleanup() {
  [[ -n "${SRV:-}" ]] && kill "$SRV" 2>/dev/null || true
  rm -f "$BUILD"
}
trap cleanup EXIT

# The page must be fully open before it is rendered: every case study and
# accordion expanded, and every lazy image forced to load rather than waiting
# for a scroll that never happens in a headless render.
python3 - "$BUILD" <<'PY'
import sys
src = open("index.html").read()
inject = """<script src="assets/js/site.js" defer></script>
<script defer>window.addEventListener("load", function () { setTimeout(function () {
  document.querySelectorAll(".case__toggle[aria-expanded='false'], .acc__btn[aria-expanded='false']").forEach(function (b) { b.click(); });
  document.querySelectorAll("img").forEach(function (im) { if (im.loading === "lazy") im.loading = "eager"; });
}, 200); });</script>"""
open(sys.argv[1], "w").write(
    src.replace('<script src="assets/js/site.js" defer></script>', inject))
PY

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SRV=$!
sleep 2

mkdir -p assets/docs
chromium --headless --disable-gpu --no-sandbox \
  --virtual-time-budget=60000 --no-pdf-header-footer \
  --print-to-pdf="$OUT" "http://127.0.0.1:$PORT/$BUILD" 2>/dev/null

# Refuse to ship a PDF that is missing pages or pictures.
PAGES=$(pdfinfo "$OUT" | awk '/^Pages/{print $2}')
IMAGES=$(pdfimages -list "$OUT" 2>/dev/null | tail -n +3 | wc -l)
SIZE=$(du -h "$OUT" | cut -f1)
echo "  built $OUT"
echo "    pages : $PAGES"
echo "    images: $IMAGES"
echo "    size  : $SIZE"

[[ "$PAGES" -ge 20 ]]  || { echo "  FAILED: expected at least 20 pages"; exit 1; }
[[ "$IMAGES" -ge 30 ]] || { echo "  FAILED: expected at least 30 images — the render raced the downloads"; exit 1; }
echo "  ok"
