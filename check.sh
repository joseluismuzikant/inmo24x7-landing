#!/usr/bin/env bash
# Pre-publish check for the static site. Run by hand: ./check.sh
set -u
cd "$(dirname "$0")"
pages=(index.html terminos/index.html privacidad/index.html eliminacion-de-datos/index.html 404.html)
fail=0

if grep -n 'TODO_' "${pages[@]}"; then
  echo "FAIL: TODO_ placeholders remain in the HTML (listed above)."; fail=1
fi

if grep -rn --exclude-dir=.git --exclude=check.sh '9793' .; then
  echo "FAIL: the old phone number (…9793) appears (listed above)."; fail=1
fi

block() { sed -n "/<!-- $1/,/<!-- \/$1 -->/p" "$2"; }
for part in site-header site-footer; do
  ref=$(block "$part" "${pages[0]}")
  if [ -z "$ref" ]; then echo "FAIL: $part block not found in ${pages[0]}."; fail=1; continue; fi
  for p in "${pages[@]:1}"; do
    if [ "$(block "$part" "$p")" != "$ref" ]; then
      echo "FAIL: $part in $p differs from ${pages[0]}."; fail=1
    fi
  done
done

if [ "$fail" -eq 0 ]; then echo "OK: no TODO_, no old phone, header and footer identical on ${#pages[@]} pages."; fi
exit "$fail"
