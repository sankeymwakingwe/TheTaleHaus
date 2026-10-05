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

All images are placeholders for now. Drop files into `haus/images/` and set the matching path in `content.js`, e.g. `cover: "images/zanzibar/cover.jpg"`. Anything left empty (or missing) shows a teal placeholder.

Project films take a YouTube/Vimeo **embed** URL or an `.mp4` path.

## Fonts

Montserrat and Nunito match the design. The design's display font, **Austena**, isn't on Google Fonts, so **DM Serif Display** stands in. To use Austena, add its webfont and change `--serif` at the top of `assets/css/haus.css`.

## Run locally

No build step: `python3 -m http.server` from the repo root, then open `/haus/`.
