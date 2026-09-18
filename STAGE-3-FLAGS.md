# Stage 3 — claims held for source verification

These four Case 01 claims were **not changed**. Each needs checking against the
*Metals* 2022 paper (10.3390/met12061041) or the underlying trial records before
Stage 5 signs the page off. Line numbers are as of the Stage 3 commit.

## 1. "20–40 kHz band investigated" / "swept across 20–40 kHz"
- `index.html:411` — KPI tile: **20–40 kHz** · "band investigated"
- `index.html:458` — method bullet: "Ultrasonic frequency swept across 20–40 kHz to isolate the effective band."

**Question:** was the frequency genuinely *swept* across a continuous 20–40 kHz
range, or were discrete transducer frequencies tested (the results elsewhere on
the page only ever name 28 kHz and 40 kHz)? "Swept" implies a continuous sweep and
is the stronger claim of the two.

## 2. "14–62%" aspect-ratio / straightness improvement
- `index.html:410` — KPI tile: **14–62%** · "straighter weld profile"
- `index.html:512` — Fig. 2 caption: "Across the study the improvement ranged from 14% to 62%, with 40 kHz best on thin plate and 28 kHz best at 4 mm."
- `index.html:564` — spec table: AR 1.38 → AR 1.19, "▲ 14–62% across thicknesses"

**Question:** the single comparison shown (1.38 → 1.19) is a 13.8% improvement,
which rounds to the bottom of the range. Confirm the 62% figure, the thickness it
came from, and that "improvement" is measured as the reduction in (AR − 1) rather
than in AR itself — the two give very different numbers.

## 3. "Centreline microcracking eliminated in every sonicated trial"
- `index.html:565` — spec table: present → **eliminated**, "▲ in every sonicated trial"

**Question:** "every" is an absolute. Confirm the paper states microcracking was
absent in all sonicated specimens, rather than in the examined cross-sections or
in the reported conditions. If the evidence is surface examination only, the claim
should be narrowed to what was actually inspected.

## 4. Citation count, dated
- `index.html:1139–1142` — "Cited by **23** subsequent works … Crossref, September 2026"

**Question:** 23 was read from the Crossref API in September 2026. The figure is
correct as of that date but goes stale silently. Decide whether to re-check it on a
schedule, drop the number and keep the qualitative statement, or leave the dateline
as the honest caveat it already is.

## Also noted, not a claim

The social share card (`assets/img/site/og-cover-5.jpg`) still shows the old
four-stat set — Tripled · +10% · 2012 · ISO 9001 & ISO 14001. Every stat on it is
still true, but it no longer mirrors the three proofs now on the homepage. Updating
it means a new filename, because LinkedIn caches share images by URL.
