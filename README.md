# MBU Data Science Learning Portal

    npm install
    npm run dev

- Student details: `src/data/student.js` (replace the placeholders)
  - `photo` points at a file in `public/` (default `public/student-photo.svg`). Drop in your own
    photo and set `photo: '/your-photo.jpg'` - the ID card and the header avatar update
    automatically, and it falls back to initials if the file is missing.
- Experiments / modules / tools / materials: `src/data/*.js`
- PDFs: drop files into `public/pdfs/` named like `m1-1.pdf` (see `src/data/materials.js`)
- Python backend: set `VITE_PY_API=http://localhost:8000/run` (POST `{code}` -> `{stdout, error}`) in a `.env` file. Without it the sandbox runs in demo mode and says so.
- Edits to experiments are saved in the browser's LocalStorage.

## Live site (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes it
to GitHub Pages:

    https://<github-user>.github.io/<repo-name>/

For this repo that is **https://sarikondavinodraju.github.io/DS-project/**

Setup (one time): **Settings -> Pages -> Build and deployment -> Source: _GitHub Actions_**.
The workflow also tries to enable Pages automatically (`enablement: true`).

Notes:
- `BASE_PATH` is set by the workflow to `/<repo-name>/` so assets resolve under the sub-path.
  `vite.config.js` uses `process.env.BASE_PATH` and falls back to `/` for local builds.
- `public/404.html` is the SPA fallback: GitHub Pages has no server-side rewrites, so unknown
  paths are answered with `404.html`, which hands the requested route back to the app.
- `BrowserRouter` uses `basename={import.meta.env.BASE_URL}`, so deep links such as
  `/DS-project/experiments` work.

## Other hosts

- **Vercel / Netlify**: import the repo, keep the build command `npm run build` and the output
  directory `dist`. Netlify needs `/* /index.html 200` in `_redirects` for deep links.
- **Local network**: `npm run dev -- --host` exposes the dev server to other devices on the
  same Wi-Fi (use the "Network" URL printed by Vite).
