# The Tale Haus — Website

Built from the Figma file "The Tale Haus" (frames: Desktop - 1, Project Index Page ×2, Services).

| Page | File |
| --- | --- |
| Home | `index.html` |
| Project Index (all projects) | `projects.html` |
| Project detail (Client / Year, Film, Shots collage) | `project.html?p=<slug>` |
| Services | `services.html` |

## Editing

Everything lives in **one file**: [`assets/js/content.js`](assets/js/content.js) — logo, hero text, projects, trusted brands, services copy, About text, contact links and the newsletter form endpoint.

## Photos

All images and copy are placeholders for now — rewrite the text in your own words before launch.

Project films take a YouTube/Vimeo **embed** URL or an `.mp4` path.

## Fonts

- **Headings:** Quincy CF, served by Adobe Fonts through the web project "DanieSankey website" (`ann1gwy`). Adobe only serves it on the domains listed in that project, so `thetale.haus` must be added there (fonts.adobe.com → My Fonts → Web Projects). Until then headings fall back to Georgia.
- **Everything else:** Montserrat (Google Fonts). Quincy CF is used for all headings; Georgia is the fallback until the Adobe project allows thetale.haus.

To change a font, edit `--display` (headings) or `--sans` at the top of `assets/css/haus.css`.

## Hosting and forms

The site is moving from GitHub Pages to **Namecheap shared hosting** so it can run PHP.

- `api/subscribe.php` handles the "Get Notified" signup; `api/contact.php` handles enquiries. Each submission is emailed to inquiries@thetale.haus and saved to a CSV in `private/` (blocked from the web by `.htaccess`), with a spam trap and a 5-per-hour limit per visitor.
- `.github/workflows/deploy-namecheap.yml` uploads the site to `public_html/` over FTPS on every push to `main`, once the `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` repository secrets are set.
- Until the move, the site is still served by GitHub Pages, where PHP can't run, so the signup form falls back to opening the visitor's email app.

## Run locally

No build step: `python3 -m http.server` from the repo root, then open http://localhost:8000/.
