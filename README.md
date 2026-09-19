# John Silva — Engineering Portfolio

A single-page static portfolio site. No build step, no dependencies, no framework —
just HTML, CSS and one file of vanilla JavaScript. Drop it on GitHub Pages and it works.

```
index.html                 the whole page
site.webmanifest           icon / install metadata
_config.yml                GitHub Pages build config — keeps _internal/ and tools/ off the live site
_internal/                 working documents: deploy notes, briefs, audit reports. Not published.
assets/
  css/site.css             design tokens + all components
  js/site.js               theme, nav, reveals, sliders, lightbox
  img/site/                headshot, favicons, social share card
  img/work/                case-study photography, micrographs, charts
  docs/                    the downloadable PDF, built by tools/build-pdf.sh
tools/build-pdf.sh         rebuilds that PDF
```

> **Deployment notes and the content decisions behind the page** are in
> [`_internal/DEPLOY.md`](_internal/DEPLOY.md) — it is a
> step-by-step checklist including three content decisions worth confirming before the site
> goes public. The section below is the short reference version.

---

## Deploying

**Already live** at <https://johnsilvaeng.github.io/>, from the `main` branch of
`JohnSilvaEng/johnsilvaeng.github.io`, folder `/ (root)`. The old
`johnsilvaeng.github.io/html-resume/` redirects here. Publishing a change is just:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

It is live again within a minute or two.

**What does and does not get published.** Everything in the repository is served at a public
URL unless `_config.yml` excludes it. That is why the working documents live in `_internal/`
and why that directory, `tools/` and `.gitignore` are listed under `exclude:`. **Anything you
drop in the root is public the moment you push it** — put notes, briefs and drafts in
`_internal/`, and check a new path with `curl -o /dev/null -w '%{http_code}' <url>` after
deploying if you are unsure.

> Excluding a file from Pages does not make it private. The repository itself is public, so
> anything committed is still readable on github.com and in the git history. Keep genuinely
> confidential material out of the repository altogether — `.gitignore` it.

**Custom domain.** You co-own the company and it has a live domain. If this should eventually
sit at something like `john.cwt-group.com`, add a `CNAME` file containing just the domain,
point the DNS at GitHub, and update the `<link rel="canonical">` tag in `index.html`.

---

## Editing the content

Everything is in `index.html`, in the order it appears on the page. Each section is marked
with a comment banner so you can find it quickly:

| Section | Comment marker | What lives there |
|---|---|---|
| Hero | `<!-- hero -->` | Name, one-line pitch, industry chips |
| Metrics | `<!-- metrics -->` | The three headline proofs |
| Profile | `<!-- about -->` | Narrative + the "At a glance" fact sheet |
| Capabilities | `<!-- capabilities -->` | Six service cards |
| Selected work | `<!-- selected work -->` | The five case studies |
| Testimonial | `<!-- testimonial -->` | Reference quote |
| Research | `<!-- research -->` | Papers, thesis, podcast, talks |
| Experience | `<!-- experience -->` | Career timeline |
| Credentials | `<!-- credentials -->` | Education, standards, competencies, tools |
| Development | `<!-- CPD -->` | CPD log, conferences, milestones |
| Contact | `<!-- contact -->` | Contact cards |

### Things worth knowing

**Write years, not durations.** "Since 2013" stays true forever; "fourteen years" is wrong
within twelve months and nothing on a static site will tell you. GitHub Pages serves files
exactly as committed, so any figure that counts upward has to be re-typed by hand or by a
scheduled job, and both rot silently. The page states no duration anywhere — keep it that
way in anything you add. The footer copyright year is the one exception, and it is written
by JavaScript from the current date rather than stored.

**Adding a case study.** Copy a whole `<article class="case">…</article>` block. Change the
`id`, the `aria-controls` on the toggle button, and the matching `id` on the
`<div class="case__detail">`. They must be unique and they must match, or the expand button
won't work. Add `class="case case--flip"` to put the image on the left instead of the right.

**Adding a before/after slider.** Copy a `<figure class="compare">` block. Point the first
`<img>` at the *after* image and the one inside `.compare__top` at the *before* image. Set
`style="--ar: W / H"` on `.compare__stage` to your image's pixel dimensions so nothing gets
cropped. Both images in a pair should be the same size.

**Adding a lightbox image.** Any `<button data-lightbox data-src="…" data-title="…"
data-caption="…">` joins the viewer automatically, in page order.

**Colours.** All of them are CSS custom properties at the very top of `assets/css/site.css`,
in `:root` (dark) and `[data-theme="light"]`. Change `--laser` and `--ember` and the whole
site re-themes, including the favicon gradient and the social card.

---

## Adding or replacing images

Source images out of a phone or a microscope are far too big for the web. Resize them first
(this is what was used for the current set — it took 35 MB down to 2.9 MB):

```bash
magick input.png -auto-orient -strip -resize '1200x1200>' -quality 84 \
  -interlace Plane -sampling-factor 4:2:0 assets/img/work/my-image.jpg
```

Keep anything with hard edges and flat colour — charts, CAD screenshots, diagrams — as PNG
instead, and skip the `-sampling-factor` flag.

**Always write real `alt` text.** Every image on the site has some. It is what a screen
reader announces, what shows if an image fails to load, and what Google indexes.

---

## The social share card

`assets/img/site/og-cover-6.jpg` is what appears when the link is pasted into LinkedIn,
WhatsApp, Slack or an email client.

The source is kept alongside it as `assets/img/site/og-cover.svg` — edit that, then
regenerate:

```bash
rsvg-convert -w 1600 -h 840 assets/img/site/og-cover.svg -o /tmp/og.png
magick /tmp/og.png -strip -quality 88 assets/img/site/og-cover-6.jpg
```

**Give it a new filename every time you change it** — `og-cover-6.jpg`, then `-7`, and so on. LinkedIn
caches share images by URL on a separate cycle from the page, so overwriting the file in
place leaves it serving the old picture indefinitely. Update the two references in
`index.html` (`og:image` and `twitter:image`) to match, and `og:image:width` / `height` if
the size changed.

After changing it, run the live URL through
[LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to clear their cache —
otherwise they may serve the old preview for days.

---

## The downloadable PDF

The **Download PDF** button serves a pre-built file:
`assets/docs/John-Silva-Engineering-Portfolio.pdf`.

It used to ask the reader's browser to print the page, which meant the document they got
depended on their browser, operating system, paper size, margin preset and — worst of all —
Chrome's **"Background graphics"** checkbox, which is off by default and rendered the whole
thing dark. Building it once here and serving that file gives every reader the same
document.

**Rebuild it whenever the page content changes**, or the download goes stale:

```bash
./tools/build-pdf.sh
```

The script opens every case study and accordion, forces the lazy images to load, renders
A4 — currently 25 pages — and then refuses to ship a file with fewer than 20 pages or 30
images. The failure mode it is guarding against is a render that raced the image downloads
and came out with holes in it.

`Ctrl+P` still works for anyone who prefers it: a `beforeprint` hook expands every collapsed
panel first,
and the print stylesheet at the bottom of `site.css` switches to a light, ink-friendly
palette, hides the navigation and interactive furniture, and prints link addresses in full.
The download is the better copy, because printing cannot wait for images to arrive.

---

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly with `file://` mostly
works too, but a local server matches how GitHub Pages will actually serve it.

---

## Browser support and accessibility

Built for current Chrome, Safari, Firefox and Edge. Everything degrades gracefully: with
JavaScript disabled the page is still completely readable — you simply lose the expand
buttons, the sliders and the lightbox.

- Keyboard operable throughout, including the comparison sliders (arrow keys, Home, End)
  and the lightbox (arrows, Escape).
- Skip link, semantic landmarks and ARIA state on every interactive control.
- Honours `prefers-reduced-motion` — all animation stops for users who ask for that.
- Honours `prefers-color-scheme`, with a manual toggle that is remembered in `localStorage`.
