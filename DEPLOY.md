# Publishing checklist

Everything you need to get this portfolio live, written so you can pick it up cold in a
month and not have to remember anything. Work top to bottom.

*Last updated after the CWT rebrand and management buyout changes.*

---

## 1. Preview it locally first

Open a terminal in this folder (`/home/john/Work/portfolio`) and run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Press `Ctrl+C` in the terminal to stop
the server when you're done.

> **The terminal will look frozen.** It prints one line — `Serving HTTP on 0.0.0.0 port
> 8000 ...` — and then sits there with no prompt back. That is it working correctly. Leave
> that terminal alone and switch to your browser.
>
> If you get `OSError: [Errno 98] Address already in use`, a server is *already* running.
> Either use the one you have, or find and stop it: `pgrep -af http.server` then
> `kill <pid>`.
>
> The URL must be plain `http://` — there is no HTTPS on a local server.

---

## 2. Content decisions

### 2.1 Settled — no action needed

**The rebrand and the buyout are reflected throughout.** Verified against Companies House
and correct as of the last update:

| Fact | On the site as |
|---|---|
| Trading name | CWT Welding Technologies |
| Legal entity | Carr's Welding Technologies Ltd, no. 03921135 |
| Your role | Technical Director & Co-owner |
| Statutory director | Since 1 September 2021 |
| Shareholder | Since November 2018 (3 ordinary shares, 21 Nov 2018) |
| Co-owner (PSC) | Since October 2025 |
| Carr's Welding Products Ltd | Sister company, dissolved 2019 |
| Reference letter | Quote published; scan removed (see 2.2) |
| Email | john@cwt-group.com |

The apostrophe in *Carr's* is deliberate — that is the registered name. Historical mentions
(the 2020 letter, your 2011 thesis, talk titles as delivered) correctly keep the old company
name, since that is what it was called at the time.

**The reference letter is published with its relationship disclosed.** Alistair's letter
carries a footnote explaining he was your manager in 2020 and is now your co-owner. Decided
deliberately — it turns a fact a prospect could discover on Companies House into a point in
your favour.

**Two things were deliberately left off the site.** Flagging them so you know they were a
choice, not an oversight:

- *Why Carr's Welding Products closed.* Publicly attributing a company failure to named
  former management carries real defamation exposure, and would sit a few sections above a
  glowing reference from that same era. The dissolution date alone does the job.
- *Phil Carr relocating to France.* A third party's personal circumstances, and irrelevant
  to your pitch.

If you disagree with either, say so — they are your calls.

### 2.2 Settled — the clutch drum customer is not identifiable

Your 2023 portfolio document says the clutch drum was for *"a luxury armored personal
vehicle to be used by a Russian Cabinet Minister"*, with a photo of the car.

**Decision taken:** the case study says "an armoured executive vehicle". No country, no car
photo, and **the scanned recommendation letter has been removed from the site** — its text
named the Russian Premier. Alistair's quote and the account of the cold-cracking fix remain
in full; only the image is gone.

The image files were deleted, not just unlinked. An unreferenced file still sitting in the
repo would remain publicly reachable at its URL.

Every piece of engineering in the case study is intact: the FEA, the 3 mm weld depth, the
safety factor of 3.0, the weld sequence, the macro of the achieved profile.

**If you ever reverse this,** the letter scan is in the docx at `word/media/image39.png` and
the car photo at `word/media/image10.png`.

### 2.3 Still to decide — references

The site says *"Professional references available on request."* Your 2023 document listed
**Tom Gilbert** and **Alistair Houghton** with their personal mobile numbers. Those were
removed — publishing someone's mobile invites cold calls they never agreed to.

There is now a second reason to leave it that way: **both men are your co-owners.** Companies
House shows all three of you as directors and shareholders. Listing your own business
partners as referees would look odd to anyone who checks.

**Recommended:** leave it as-is, and put some effort into getting a **customer reference** —
an aerospace, medical or F1 name vouching for your work is worth more to a prospect than any
internal one. That is the last real gap on the site.

---

## 3. Publish to GitHub Pages

### Option A — at your root address (recommended)

This puts the site at `https://johnsilvaeng.github.io/` instead of the current
`https://johnsilvaeng.github.io/html-resume/`.

**Step 1.** On GitHub, create a new repository named **exactly** `johnsilvaeng.github.io`.
The name has to match your username exactly — that is what makes it a user site. Leave it
empty (no README, no .gitignore, no licence).

**Step 2.** In a terminal, from this folder:

```bash
cd /home/john/Work/portfolio

git init
git add .
git commit -m "New engineering portfolio"
git branch -M main
git remote add origin git@github.com:johnsilvaeng/johnsilvaeng.github.io.git
git push -u origin main
```

> The `.gitignore` already excludes `portfolio 2023.docx`, so the 37 MB Word file will not be
> uploaded. Run `git status` before committing if you want to be sure.

> If `git push` asks for a password and rejects it, you are on HTTPS without a token. Either
> set up an SSH key, or swap the remote for the HTTPS URL and use a
> [personal access token](https://github.com/settings/tokens) as the password:
> `git remote set-url origin https://github.com/johnsilvaeng/johnsilvaeng.github.io.git`

**Step 3.** On GitHub: repository → **Settings** → **Pages** → under *Build and deployment*
set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then Save.

**Step 4.** Wait 1–2 minutes and visit <https://johnsilvaeng.github.io/>. The Actions tab
shows deploy progress if it seems slow.

### Option B — keep it on a subpath

To publish at something like `johnsilvaeng.github.io/portfolio/`, push this folder to a repo
named `portfolio` and enable Pages the same way. Every path in the site is relative, so it
will work unchanged — **with one exception**:

Open `index.html` and update this line near the top, or search engines get pointed at the
wrong address:

```html
<link rel="canonical" href="https://johnsilvaeng.github.io/">
```

### A note on the domain

You now co-own the company and it has a live domain at `cwt-group.com`. Worth considering
whether this should eventually live at something like `john.cwt-group.com`, which would carry
more weight with customers than a github.io address. To do that: add a `CNAME` file
containing just the domain, point the DNS at GitHub, and update the canonical tag. Not
urgent — get it live first.

---

## 4. After it is live

- [ ] **Check the share preview.** Paste the URL into
      [LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/). It shows the
      social card and clears LinkedIn's cache. Do this *before* you post the link, or
      LinkedIn may cache a stale preview for days.
- [ ] **Open it on your phone.** Check the layout, and try the drag-to-compare sliders with
      a finger.
- [ ] **Test the Save as PDF button** in the Contact section — it expands every collapsed
      panel, then opens the print dialogue.
- [ ] **Update LinkedIn** — the new URL (Contact info → Website), the company name (CWT
      Welding Technologies), and your title if it does not yet say co-owner.
- [ ] **Update your email signature and business cards** to john@cwt-group.com if that has
      not already happened.
- [ ] **Decide what to do with the old site.** Either leave `html-resume` up, or redirect it.
      To redirect, replace its `index.html` with:

      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="refresh" content="0; url=https://johnsilvaeng.github.io/">
        <link rel="canonical" href="https://johnsilvaeng.github.io/">
        <title>Redirecting…</title>
      </head>
      <body><p>This portfolio has moved to
        <a href="https://johnsilvaeng.github.io/">johnsilvaeng.github.io</a>.</p></body>
      </html>
      ```

---

## 5. Making changes later

```bash
cd /home/john/Work/portfolio
# ...edit index.html or assets/css/site.css...
git add .
git commit -m "Describe what you changed"
git push
```

Live again within a minute or two.

Editing text: everything is in `index.html`. In `nvim`, use `/some words` to search or
`144gg` to jump to a line. Change only the text **between** the tags — anything inside
`< >` is machinery. `README.md` explains where each section lives and how to add a case
study, a comparison slider or an image.

---

## 6. If something goes wrong

| Symptom | Likely cause |
|---|---|
| Terminal looks frozen after starting the server | That is normal — see section 1 |
| `Address already in use` | A server is already running. `pgrep -af http.server`, then `kill <pid>` |
| Page loads but has no styling | Pages source folder is wrong — must be `/ (root)`, not `/docs` |
| Images missing | Case-sensitivity. GitHub Pages is case-sensitive, your laptop may not be. Check the filename matches the `src` exactly |
| 404 on the whole site | Repo name does not exactly match `johnsilvaeng.github.io`, or the branch is not `main` |
| Old version still showing | Browser cache — hard-refresh with `Ctrl+Shift+R` |
| Expand buttons do nothing | A duplicated `id` in `index.html`. Each `aria-controls` must match exactly one `id` |
| Push rejected | Authentication — see the SSH/token note in section 3 |
