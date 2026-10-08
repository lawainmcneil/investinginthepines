#!/bin/sh
# Renders guide/your-money-your-future.html to the PDF served by the site.
# Requires Google Chrome. Run from the repository root: sh guide/build-pdf.sh
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="assets/guide/Your-Money-Your-Future.pdf"
mkdir -p assets/guide
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --print-to-pdf="$PWD/$OUT" "file://$PWD/guide/your-money-your-future.html"
echo "Wrote $OUT"
