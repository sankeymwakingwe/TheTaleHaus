# Personal Website

A full-screen photography portfolio: every section is a full-bleed photo with a title and a "View Work →" link, plus a minimal nav and a floating Call / Email / Location bar.

## Make it yours

Edit **one file**: [`assets/js/content.js`](assets/js/content.js). It holds:

- your name (shown as the spaced-out logo), phone, email, location, WhatsApp, and social links
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
