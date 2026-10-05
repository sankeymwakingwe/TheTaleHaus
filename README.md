# Personal Website

A cinematic, full-screen photography portfolio: every section is a full-bleed photo with a title and a "View Work →" link, plus a floating text nav at the top of the screen.

Cinematic touches: an opening title card (once per visit), letterbox bars that open on each page and close between pages, film grain, a vignette and colour grade, serif title cards that resolve letter by letter, a viewfinder scene counter and timecode, and wipe-in reveals on the Work and Gallery pages. Visitors who've turned on "reduce motion" get a calm, static version.

## Make it yours

Edit **one file**: [`assets/js/content.js`](assets/js/content.js). It holds:

- your name (shown as the spaced-out logo), phone, email, location, and social links
- the About text
- the photo categories (Lifestyle, Portraits, …). Each one is a full-screen section on the home page and gets its own gallery page. Add, remove, rename, or reorder them freely.

## Adding photos

Drop your images into `images/` at the paths listed in `content.js`, for example:

```
images/about.jpg
images/lifestyle/cover.jpg     ← full-screen home section
images/lifestyle/01.jpg … 06.jpg  ← gallery
```

Until a photo exists, that spot shows a dark gradient, so the site never looks broken.
Tip: export covers at around 2400px wide (JPG, quality ~80) so they stay sharp on big screens and load quickly.

## Pages

| Page | File |
| --- | --- |
| Home (full-screen sections) | `index.html` |
| Work (all categories) | `work.html` |
| Category gallery + lightbox | `gallery.html?c=<slug>` |
| About | `about.html` |
| Contact (opens the visitor's email app) | `contact.html` |

## Run locally

No build step. Open `index.html`, or run `npx serve .`

## Hosting

It's a static site, so you can host it free on GitHub Pages (Settings → Pages → deploy from this branch), Netlify, or Vercel.
