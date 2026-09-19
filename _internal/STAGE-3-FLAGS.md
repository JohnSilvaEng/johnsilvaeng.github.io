# Stage 3 — Case 01 claims: flagged, then resolved

Four claims in Case 01 (ultrasonic-assisted laser welding) were raised during
Stage 3 as unverified. All four were then resolved against the published paper,
*Metals* 2022, 12(6), 1041 — <https://doi.org/10.3390/met12061041>.

Status: **resolved**. Line numbers are as of the resolution commit.

---

## 1. Frequency range — partly kept, partly corrected

**Was:** a KPI tile reading "20–40 kHz · band investigated", and a method bullet
reading "Ultrasonic frequency **swept** across 20–40 kHz to isolate the effective
band."

**Finding:** the 20–40 kHz scope is what the paper uses, but there was no sweep.
The experiments used **discrete 28 kHz and 40 kHz transducers at different power
levels**.

**Resolution:**
- `index.html:411` — KPI tile **unchanged**; "20–40 kHz · band investigated" is
  accurate as a statement of scope.
- `index.html:458` — method bullet now reads: "Discrete 28 kHz and 40 kHz
  transducers run at different power levels, within the 20–40 kHz band under
  investigation."

The word "swept" appears nowhere on the site.

---

## 2. 14–62% aspect-ratio range — kept, scoped

**Was:** presented as a property of the study as a whole ("Across the study…",
"across thicknesses").

**Finding:** the range is supported by **Section 3.2** of the paper, but it is the
range *observed across the reported experimental conditions* — not a universal
improvement, and not a figure that generalises beyond those conditions. (The one
coupon shown on the page, AR 1.38 → 1.19, is a 13.8% improvement, i.e. the bottom
of the range; that is consistent, not contradictory, but it makes the scoping
matter.)

**Resolution:** the number is unchanged; the framing is scoped in all three places.
- `index.html:410` — KPI tile: "14–62% · straighter weld profile, reported conditions".
  The longer caption pushed the third KPI onto a second row, so `.case__kpis span`
  now has a `max-width` and the first tile's label is abbreviated to "avg UTS;
  +25% best trial". The cap also tidies the long KPI captions in Cases 03 and 05,
  which previously each took a full-width row of their own.
- `index.html:512` — Fig. 2 caption: "Across the **reported experimental conditions**
  the improvement ranged from 14% to 62%…"
- `index.html:564` — spec table: "▲ 14–62% **across the reported conditions**"

---

## 3. Microcracking — absolute claim replaced with observed evidence

**Was:** spec table row "Centreline microcracking · present → **eliminated** ·
▲ in every sonicated trial", plus a Fig. 1 caption saying the microcracks
"**disappear completely** when ultrasound is used".

**Finding:** "every" and "completely" are absolutes the published evidence does not
carry. What the paper shows is a comparison of specific samples.

**Resolution:** both statements narrowed to what was actually observed.
- `index.html:565` — spec table row is now "Centreline indication · visible →
  **not observed** · ▲ in the sonicated samples of the published comparison".
- `index.html:494` — Fig. 1 caption is now "The centreline microcracking visible on
  the conventional weld, which acts as a crack initiation zone, is not present on
  the sonicated sample shown here."

The Fig. 1 caption was not on the original flag list, but it made the same absolute
claim in different words directly beneath the comparison image — leaving it would
have contradicted the corrected table row.

---

## 4. Citation count — removed

**Was:** "Cited by **23** subsequent works … Crossref, September 2026".

**Finding:** correct on the day it was read, and stale from the day after. A
maintained number is a maintenance burden with no upside on a static page.

**Resolution:** `index.html:1139` — the number and the Crossref dateline are gone.
The qualitative statement, which does not decay, remains: "Cited by subsequent
work, including follow-on research at the Brunel Innovation Centre extending the
method to dissimilar-metal joints."

The same three corrections were applied to `linkedin-copy.md` (gitignored), which
had carried the "23 citations" figure and the "microcracking eliminated" wording
into the profile text drafted for LinkedIn.

---

## Still open — not a claim

The social share card (`assets/img/site/og-cover-5.jpg`) still shows the older
four-stat set: Tripled · +10% · 2012 · ISO 9001 & ISO 14001. Every stat on it
remains true, but it no longer mirrors the three proofs now on the homepage.
Updating it requires a new filename, because LinkedIn caches share images by URL.
