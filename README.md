# Lester Roberts &mdash; Personal Site

Static template. Just HTML + CSS, no build step.

## Files

- `index.html` &mdash; landing page
- `hire.html` &mdash; freelance / contact page
- `art.html` &mdash; image gallery (drop images into `art/`)
- `projects.html` &mdash; links to subprojects in `projects/<name>/`
- `style.css` &mdash; shared styles
- `CNAME` &mdash; custom domain for GitHub Pages (replace `your-domain.com`)
- `.nojekyll` &mdash; tells GitHub Pages to serve files as-is

## Local preview

Just open `index.html` in a browser, or run a quick server:

```powershell
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy to GitHub Pages

1. Create a new GitHub repo (public).
2. From this folder:

   ```powershell
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. In the repo: **Settings &rarr; Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch **main**, Folder **/ (root)**. Save.
4. Wait ~1 minute. The site goes live at `https://<your-username>.github.io/<repo>/` (or your custom domain if `CNAME` is set).

## Custom domain via Cloudflare

1. Edit `CNAME` and replace `your-domain.com` with your actual domain (apex or subdomain). Commit and push.
2. In **Cloudflare &rarr; DNS** for your domain, add records:

   **For apex (e.g. `laroberts.net`):** four A records pointing to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   Set proxy status to **DNS only** (grey cloud) initially &mdash; turn the orange cloud back on after HTTPS is issued.

   **For subdomain (e.g. `laroberts.net`):** one CNAME record pointing to `<your-username>.github.io`.

3. In GitHub **Settings &rarr; Pages**, confirm the custom domain is detected and tick **Enforce HTTPS** once it becomes available (can take a few minutes).
4. In Cloudflare **SSL/TLS** settings, set encryption mode to **Full** (not Flexible) to avoid redirect loops.

## Adding content

- **Art:** drop image files into `art/` and update the `<figure>` blocks in `art.html`.
- **Projects:** create `projects/<your-project>/index.html`, then add a `<a class="card">` link in `projects.html`.
