# IMPLEMENTATION BRIEF — portfolio additions

Run in: `<same repo as IMPLEMENTATION-BRIEF-portfolio-fixes.md>`
Target: index.html (single self-contained file) and its `<head>` metadata.
Date: 14 September 2026
Depends on: IMPLEMENTATION-BRIEF-portfolio-fixes.md — must be merged first. Stop-and-report
if "CWT Welding Technologies" still appears anywhere in the file; that means brief 1 has not
landed.

## SOURCES

Every fact below was gathered from John's project records and confirmed by him on
14 Sep 2026. Code does not add, round, or "improve" any figure. Where a figure is given as a
multiplier or percentage, the underlying £ values are deliberately not in this brief and must
not appear on the page.

## JOB

Add content to the existing page in the existing design language. No new design tokens, no
layout changes, no new section types — every addition reuses a component that already exists
on the page (stat card, capability card, case study card + expandable body, list row,
milestone row, tag).

### 1. Hero stat — replace the turnover figure
The first stat card currently reads: value `+66%`, caption "Turnover growth after I rebuilt
the company's technical and quality strategy", footnote "2016 → present".
Change to: value `×3.2`, caption "Turnover, FY2016 to FY2026, after I rebuilt the company's
technical and quality strategy", footnote "Management accounts · year to April 2026".
The count-up animation, if it runs on this card, animates to 3.2 with the × prefix static.
The no-JS fallback rule from brief 1 (real value in the markup) applies.

### 2. Sector list — add battery
Add `EV battery · e-mobility` to the hero sector tags, after "Automotive · PPAP / PFMEA".
In the Profile prose, the sector sentence "serving aerospace, automotive, Formula 1, medical,
oil & gas and tool engineering" becomes "serving aerospace, automotive, EV battery, Formula 1,
medical, oil & gas and tool engineering". Same change to the At-a-glance "Role" row if it
lists sectors, and to `meta-description` / `og:description` if they list sectors.

### 3. Research — Innovate UK
In Case 01 "Where it went", after the sentence ending "...high-volume assembly of
automotive battery packs.", add:
"Both Ultramat (2017) and Soni-Laser (2022) were Innovate UK-funded collaborative projects,
the latter with the Brunel Innovation Centre."
In the Research & speaking section, the peer-reviewed journal card gains one line under the
Crossref citation line: "Research funded by Innovate UK (Ultramat, 2017; Soni-Laser, 2022)."

### 4. Standards & assurance — three new rows
Insert after the "ISO 14001" row:
- "**Recertification, December 2025** — ISO 9001:2015 and ISO 14001:2015, two-day external
  audit: zero major, zero minor non-conformances, one opportunity for improvement."
- "**Welding procedure standards** — WPS authored to ISO 15609-4; weld quality levels to
  EN ISO 13919-1 and -2; procedures qualified by customer examination and approval under
  EN ISO 15611; visual inspection to EN ISO 17637."
- "**Records** — quality records retained 10 years for standard customers and 30+ years for
  aerospace; paper originals are the retained record."
No edition years on the welding standards other than those shown.

### 5. Capabilities — Quality card
The "Quality systems & compliance" card description gains one sentence at the end:
"Fourteen years running the system; twice-yearly management reviews signed by all
directors."

### 6. Case 05 — the KPI dashboard
Section heading "Four problems, and what I did about them" becomes "Five problems, and what
I did about them". Add Case 05 after Case 04, using the exact card + expandable structure of
Cases 01–04.

Card:
- Tags: `Case 05` `Software` `ISO 9001 / 14001` `Data`
- Title: "Instrumenting the business, ten years on"
- Lead paragraph: "Case 03 was built in Excel and Power BI in 2016. By 2026 the business was
  three times the size, the auditor's report named the KPI spreadsheets by hand, and every
  number still ran through me. So I replaced them with an application the company could
  run without me: a desktop KPI dashboard that imports directly from the accounts ledger,
  measures the three things that matter, and forecasts the year ahead."
- Three stat chips: `85%` "jobs turned round within five days, against a target that did not
  exist before"; `±1.5%` "forecast accuracy in stable years, rolling-origin backtest";
  `−19%` "energy per £ of sales, year on year (ISO 14001)".
- Closing line: "Built for the December 2026 surveillance audit. Management review now runs
  on it."
- Image: John will supply a screenshot with axis values redacted. Until then, use the
  existing `biz-powerbi.jpg` with caption "Predecessor dashboard, 2016 — replaced by the
  application described here". Do not fabricate a screenshot.

Expandable body, four subsections in the house style:

**What it replaced** — Three Excel pivot dashboards (sales analysis, job completion,
non-conformance analysis), maintained by hand and cited by name in the auditor's December
2025 report. Twenty-six years of invoice history and eleven years of nominal-ledger data,
imported from Sage exports.

**What it measures** — Eleven views: sales against target, turnaround SLA, profit and loss,
non-conformances with effectiveness review, energy intensity, calibration register,
forecast, reports, imports, settings, home. Turnaround now reports the share of jobs closed
within five working days against a formal 85% target; the earlier measure had been an
average of jobs falling between three and five days, with no target. Setting the target
required documenting which orders count — framework and paused orders are excluded, and the
exclusion is recorded.

**Forecasting** — Holt-Winters exponential smoothing with additive seasonality and damped
trend, trained on monthly invoiced sales since 2010. Validated by a three-year rolling-origin
backtest: projected annual totals within ±1.5% of actuals in the two stable years; the
step-change year was under-forecast by 28%, which the method reports rather than hides.

**Engineering** — Python, PyQt6 and SQLite; packaged with PyInstaller and an Inno Setup
installer in two flavours, Writer and read-only Viewer, so colleagues see the same numbers
without being able to change them. Two automated validators run as the release gate. First
installed on a second machine in August 2026.

### 7. Engineering tools block
Add a subsection at the end of Capabilities (after the six cards), heading "Engineering
tools I have built", intro sentence "Software written to the same standard as the quality
system it serves." Three entries in the list-row style used elsewhere:

- **Laser Settings Predictor** — 2013 → present. "An Excel calculation tool I built in
  2013 to derive starting laser parameters and predicted penetration depth from a job's
  material, thickness and target depth. In use at quote and setup stage ever since; now
  being ported to a standalone desktop application so it works without me in the room."
- **WPS Database** — 2026. "Desktop application for authoring and printing Welding
  Procedure Specifications to ISO 15609-4. Offline by design as a customer-confidentiality
  control, verified by a zero-network sweep of every screen. Six Architecture Decision
  Records, SHA-256 build identity, and a 247-check verification harness with mutation
  coverage. A data-entry fix caught a fivefold error in a vacuum-leak acceptance threshold
  on a real procedure before it shipped."
- **KPI Dashboard** — 2026. One line: "See Case 05." with an anchor link to the Case 05 card.

### 8. Milestones — extend to 2026
Heading "Milestones 2003 — 2023" becomes "Milestones 2003 — 2026". Append, in order:
- 2025 — Company rebranded as CWT Group (September)
- 2025 — Management buyout completed with two fellow directors (October)
- 2025 — Recertified to ISO 9001:2015 and ISO 14001:2015 with zero non-conformances
  (December)
- 2026 — KPI dashboard application deployed, replacing the 2016 spreadsheets
- 2026 — WPS Database under version control with Architecture Decision Records
- 2026 — Turnover 3.2× the FY2016 figure (management accounts, year to April)

### 9. Toolset — Programming
Add to the Programming list, after Python: `SQL / SQLite`, `PyQt6`, `React`, `JavaScript`.
Remove nothing.

### 10. Off the clock
At-a-glance "Off the clock" row becomes:
"Triathlon — Portuguese National Champion, 2003. Since 2024, bladesmithing: heat-treating
tool steel in a PID-controlled furnace at home, and a book for beginners in draft."

## WHY

The site froze in 2023 and the numbers on it are from 2016–2019. The business has tripled,
been recertified with zero findings, and now runs on software John wrote. None of that is on
the page, and it is the part a customer or partner doing due diligence in 2026 will look for.

## GUARDRAILS

- Content additions only, in existing components. Stop-and-ask if any item cannot be built
  from a component already on the page.
- No £ figures anywhere. No customer names. No machine model names. No auditor's name. No
  non-conformance counts. No file paths, hashes, server names or version numbers beyond
  those written above.
- Stop-and-report if brief 1 has not been merged (see Depends on).
- Do not touch the LinkedIn copy file; it is gitignored and John edits it by hand.

Preserve-list (byte-identical after the change):
- Cases 01–04 body text, figures and captions, except the Case 01 "Where it went" sentence
  added in item 3
- The Alistair Houghton testimonial and its attribution
- Talks list, CPD list, conferences list
- Contact section
- All existing image `src` and `alt` attributes
- All milestone rows 2003–2022 as left by brief 1

## DONE

- [ ] Hero stat renders `×3.2` with the new caption and footnote; no-JS fallback shows the
      same; quote the markup
- [ ] `grep -c "EV battery"` ≥ 2 (hero tags + Profile prose); list every occurrence
- [ ] Innovate UK appears in Case 01 and in the journal card; quote both lines
- [ ] Standards & assurance shows the three new rows in the order given; quote them
- [ ] Case 05 card and expandable render with the same structure as Case 04 (same classes,
      same open/close behaviour); screenshot of the card closed and open
- [ ] Section heading reads "Five problems…"
- [ ] Tools block renders with three entries; the KPI entry's anchor scrolls to Case 05
- [ ] Milestones heading reads "2003 — 2026" and the six new rows are last, in order
- [ ] Programming list contains the four additions and nothing removed; quote the list
- [ ] `grep -in "£\|GBP\|trudisk\|alt300\|mclaren\|bradbury"` returns nothing
- [ ] Byte-diff of the preserve-list regions is empty; name the interpreter and skip count
- [ ] Single commit; brief file committed alongside it
