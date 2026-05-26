# lesterbobs.github.io

Personal website for Lester Alaric Roberts — economist, data analyst, and hobbyist artist.

The site lives at **[laroberts.net](https://laroberts.net)** (also reachable via [lesterbobs.github.io](https://lesterbobs.github.io)).

## What's on the site

- **Home** — Brief intro
- **Art** — Digital paintings, pencil sketches, and 3D renders
- **Projects** — Small web apps, including an LLM-powered strategy game
- **Book Recs** — Favorite reads
- **Hire Me** — Background and contact info

## Build & deploy

Built with [Vite](https://vitejs.dev/) + React. Pushes to `main` are built and deployed to GitHub Pages automatically by [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

```
npm install     # one-time
npm run dev     # local dev server
npm run build   # produces dist/
npm run preview # serve the built dist/ locally
```

### Repo layout

- `index.html`, `style.css`, `components.js`, `lightbox.js` — the main site
- `projects/<name>/` — sub-apps, each with its own `index.html`. Non-HTML files at the top of each project dir (e.g. `bundle.js`, `cedict_ts.u8`) are copied verbatim into `dist/` by the `copyProjectStaticAssets` plugin in [vite.config.js](vite.config.js).
- `public/` — files copied as-is to the site root (`CNAME`, Google site verification).
- `artwork/`, `images/` — image assets referenced from HTML; Vite hashes these at build time.
