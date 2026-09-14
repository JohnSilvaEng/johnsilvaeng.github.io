# John Silva — Engineering Portfolio

A single-page static portfolio site. No build step, no dependencies, no framework —
just HTML, CSS and one file of vanilla JavaScript. Drop it on GitHub Pages and it works.

```
index.html                 the whole page
site.webmanifest           icon / install metadata
.nojekyll                  tells GitHub Pages to serve files as-is
assets/
  css/site.css             design tokens + all components
  js/site.js               theme, nav, reveals, sliders, lightbox
  img/site/                headshot, favicons, social share card
  img/work/                case-study photography, micrographs, charts
```

> **Publishing for the first time?** Follow [`DEPLOY.md`](DEPLOY.md) instead — it is a
> step-by-step checklist including three content decisions worth confirming before the site
> goes public. The section below is the short reference version.

---

## Deploying to GitHub Pages

**Option A — replace the current site (recommended).**
Your resume currently lives at `johnsilvaeng.github.io/html-resume/`. To publish this at
your root address instead:

1. Create a repository named exactly `johnsilvaeng.github.io` (if you don't already have one).
2. Copy everything in this folder into it — *except* `portfolio 2023.docx`.
3. Commit and push to `main`.
4. Repo → **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, Folder: `/ (root)`.
5. It goes live at `https://johnsilvaeng.github.io/` within a minute or two.

```bash
git init
git add .
git commit -m "New engineering portfolio"
git branch -M main
git remote add origin git@github.com:johnsilvaeng/johnsilvaeng.github.io.git
git push -u origin main
```

**Option B — keep it under a subpath**, e.g. `johnsilvaeng.github.io/portfolio/`.
Everything uses relative paths, so it will work unchanged — but update the
`<link rel="canonical">` tag in `index.html` to the real address, or search engines will
be pointed at the wrong URL.

**Custom domain.** If you ever buy one (`johnsilva.engineering`, say), add a `CNAME` file
containing just the domain, point the DNS at GitHub, and update the canonical tag.

---

## Editing the content

Everything is in `index.html`, in the order it appears on the page. Each section is marked
with a comment banner so you can find it quickly:

| Section | Comment marker | What lives there |
|---|---|---|
| Hero | `<!-- hero -->` | Name, one-line pitch, industry chips |
| Metrics | `<!-- metrics -->` | The four headline numbers |
| Profile | `<!-- about -->` | Narrative + the "At a glance" fact sheet |
| Capabilities | `<!-- capabilities -->` | Six service cards |
| Selected work | `<!-- selected work -->` | The four case studies |
| Testimonial | `<!-- testimonial -->` | Reference quote |
| Research | `<!-- research -->` | Papers, thesis, podcast, talks |
| Experience | `<!-- experience -->` | Career timeline |
| Credentials | `<!-- credentials -->` | Education, standards, skills, tools |
| Development | `<!-- CPD -->` | CPD log, conferences, milestones |
| Contact | `<!-- contact -->` | Contact cards |

### Things worth knowing

**Nothing on the page states a duration.** The third hero metric shows the *year* 2012, not
a number of years, precisely so it can never go stale. GitHub Pages serves static files, so
anything computed would have to be written into the HTML by hand or by a scheduled job —
both of which rot silently. A fixed year needs neither.

The small caption under it (`data-years-since="2012"`) is written by JavaScript as
"14 years and counting". That is decoration: if the script never runs, the caption reads
"Still counting" and no incorrect figure is ever published. Apply the same rule to anything
you add — put a date in the markup and let the script derive the duration, never the
reverse. The footer copyright year works the same way.

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
(this is what was used for the current set — it took 35 MB down to 3.3 MB):

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

`assets/img/site/og-cover-4.jpg` is what appears when the link is pasted into LinkedIn,
WhatsApp, Slack or an email client.

The source is kept alongside it as `assets/img/site/og-cover.svg` — edit that, then
regenerate:

```bash
rsvg-convert -w 1600 -h 840 assets/img/site/og-cover.svg -o /tmp/og.png
magick /tmp/og.png -strip -quality 88 assets/img/site/og-cover-4.jpg
```

**Give it a new filename every time you change it** — `og-cover-5.jpg`, and so on. LinkedIn
caches share images by URL on a separate cycle from the page, so overwriting the file in
place leaves it serving the old picture indefinitely. Update the two references in
`index.html` (`og:image` and `twitter:image`) to match, and `og:image:width` / `height` if
the size changed.

After changing it, run the live URL through
[LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) to clear their cache —
otherwise they may serve the old preview for days.

---

## Printing

The **Save as PDF** button in the Contact section expands every collapsed panel and then
opens the browser print dialogue. There is a dedicated print stylesheet at the bottom of
`site.css` that switches to a light, ink-friendly palette, hides the navigation and
interactive furniture, and prints link addresses in full.

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
