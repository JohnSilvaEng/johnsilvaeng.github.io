# IMPLEMENTATION BRIEF — portfolio fixes

Run in: `<path to the johnsilvaeng.github.io repo>`
Target: the single self-contained portfolio HTML (index.html) and its `<head>` metadata.
Date: 14 September 2026

## DECISIONS

Items 1–6 are resolved by John (14 Sep 2026). Item 7 is OPEN — Code must
stop-and-ask if it is still blank at handover.

1. Company name — RESOLVED. The trading name is "CWT Group" (rebrand, September 2025).
   The legal entity is still Carr's Welding Technologies Ltd (no. 03921135). There is no
   such thing as "CWT Welding Technologies" — it must not appear anywhere. See item 5.
2. BEng award date — RESOLVED: 2007. Milestones "2008 — BEng awarded" becomes 2007.
3. Heat Transfer — RESOLVED: it was an MSc subject, examined November 2011. The Milestones
   entry (2011) is correct. The Education section is wrong: move "Highest grade in the year
   for Heat Transfer" out of the BEng entry and into the MSc entry.
4. AS9100 QMS for Carr's Welding Products Ltd — RESOLVED: compilation began in 2013, the
   company was formed in 2014, the role runs Jun 2014 – Nov 2018. Milestones entry becomes:
   "2013 — Began compiling the AS9100 QMS for Carr's Welding Products Ltd, formed the
   following year". Experience entry 3 is unchanged.
5. Experience entry 1 — RESOLVED: option B. Keep "Technical Director & Co-owner" and add a
   one-line note under it. Exact wording depends on 7:
   "Shareholder since 2016; statutory director since September 2021; co-owner via
   management buyout, <YEAR from 7>."
6. Shareholding year — RESOLVED: 2016 is correct (first shares acquired 2016, more in
   2017). All four existing "2016" references stay as they are. The note in decision 5
   reads "Shareholder since 2016; ...".
7. Management buyout date — RESOLVED from the Companies House filing history
   (checked 14 Sep 2026). The founder ceased as director and PSC on 1 October 2025 and
   John was registered as a PSC the same day; the final buyback of the founder's shares
   was filed February–March 2026. Public wording: "2025" stays everywhere it appears.
   The decision-5 note reads: "Shareholder since 2016; statutory director since
   September 2021; co-owner via management buyout, October 2025 (completed March 2026)."
   Nowhere else on the page gains a 2026 date — the note is the only place the completion
   date appears.

## JOB

Fix the metadata, no-JS rendering and factual inconsistencies listed below. Content-only
changes — no redesign, no restructuring, no new sections.

### 1. Absolute Open Graph image URL
`<meta property="og:image">` is currently `assets/img/site/og-cover.jpg` (relative).
Change to `https://johnsilvaeng.github.io/assets/img/site/og-cover.jpg`. Add
`og:image:width` and `og:image:height` with the file's real pixel dimensions. If a
`twitter:image` tag exists, make it absolute too; if it does not exist, add it.

### 2. Hero stats must carry their real values in the markup
The four hero stats render as `+0%`, `+0%`, `0`, `0` when JavaScript does not run
(fetched HTML, reader mode, crawlers, the Save-as-PDF path if print fires before
animation). Required end state: the real value (`+66%`, `+26%`, the years-since-2012
figure, `3`) is present as text in the element at load, and the count-up animation
starts from that value rather than from 0 — or reads the target from a data attribute
and only replaces the text once the script is running. If the years figure is computed,
compute it server-side-equivalent: hard-code the correct current value as the fallback
text and let the script keep it live.

### 3. Milestones list — ordering and dates
- Move "2009 — Summer placement at Carr's Welding Technologies" into chronological
  position, so the list is strictly ascending.
- Apply decisions 2, 3 and 4 exactly as worded. Move the Heat Transfer line in the
  Education section from the BEng entry to the MSc entry.
- Apply decisions 6 and 7 to every occurrence listed under them, so the shareholding year
  and the MBO year each say the same thing everywhere on the page.

### 4. Experience entry 1 — ownership note
Add the one-line note from decision 5 directly under the "Technical Director & Co-owner"
heading, with the MBO year filled in from decision 7. Update the At-a-glance "Board"
line to match: "Statutory director since 2021; shareholder since 2016; co-owner via
management buyout, <7>".

### 5. Company name — replace "CWT Welding Technologies" with "CWT Group"
Every present-tense reference to the current company becomes "CWT Group": hero
subtitle, Profile prose, At-a-glance "Role", Experience entry 1 heading, `<title>`,
`meta-description`, `og:description`, `og:title`, footer link label, and the contact
section. The line under Experience entry 1 becomes:
"Trading name of Carr's Welding Technologies Ltd (no. 03921135) since the September
2025 rebrand." — the legal entity is named there once and nowhere else in present tense.
Do not touch historical references: role titles and employer lines dated before
September 2025 ("Carr's Welding Technologies Ltd", "Carr's Welding Products Ltd", the
Experience entry 2 note "now trading as CWT"), the testimonial attribution, the MSc thesis
line, the talks list, and the CPD/conference entries all keep the name the company had
at the time. Experience entry 2's "now trading as CWT" becomes "now trading as CWT Group".

### 6. Copy fixes
- Testimonial (Alistair Houghton): the opening has two quote marks (a typographic “ and
  a straight "). Remove the straight one so the quote opens once.
- Profile paragraph: "having first arrived there in 2009 as a placement student" — "there"
  reads as Lisbon. Change to "having first arrived at Carr's in 2009 as a placement
  student" — "Carr's" is correct here because that was the name in 2009.

## WHY

The portfolio URL is about to go onto John's LinkedIn profile. Item 1 decides whether the
shared link shows a preview image; item 2 decides whether a scraper or a printed copy
shows real numbers or zeros; items 3–5 are date contradictions a customer or auditor doing
due diligence would notice; item 6 is polish.

## GUARDRAILS

- Content and metadata only. No changes to layout, CSS, animation timing, section order,
  images, or the case-study copy beyond the lines named above.
- Stop-and-ask if any decision in the top section is blank.
- Stop-and-report if the file structure differs from what this brief assumes (e.g. the
  stats are already in the markup, or there is no `og:image` tag).
- Do not update the "23 citations" figure — it was verified against Crossref on
  14 Sep 2026 and is correct.

Preserve-list (must be byte-identical after the change):
- All case-study body text and figure captions (Cases 01–04)
- The Research & speaking section, including the talks list
- The CPD, conferences and toolset lists
- The Alistair Houghton testimonial body and its attribution paragraph (other than the
  duplicated quote mark)
- All image `src` and `alt` attributes
- Contact details, LinkedIn URL, DOI link

## DONE

- [ ] `og:image` (and `twitter:image`) is an absolute `https://johnsilvaeng.github.io/...` URL; show the rendered `<head>` block as proof
- [ ] `curl -s https://johnsilvaeng.github.io/ | grep -A2 'stat'` (or equivalent on the local file) shows `+66%`, `+26%`, the years figure and `3` as text, not `0`
- [ ] Milestones list is strictly ascending by year; show the list
- [ ] For each of decisions 2–7, quote the before and after line for every occurrence changed
- [ ] `grep -c "CWT Welding Technologies"` returns 0 after the change
- [ ] `grep -n "Carr's Welding\|CWT Group\|CWT"` listed after the change, each occurrence tagged as present-tense (must be "CWT Group"), legal-entity (the one permitted line), or historical (dated before Sep 2025)
- [ ] Testimonial opens with exactly one quote mark; quote the line
- [ ] Byte-diff of the preserve-list regions is empty — name the interpreter used and the skip count
- [ ] Single commit; brief file committed alongside it
