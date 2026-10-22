// Builds the GitHub Pages SPA fallback (404.html) with the correct base path.
// GitHub Pages has no server-side rewrite, so unknown paths are served 404.html,
// which then hands the requested route back to the app.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const base = process.env.BASE_PATH || '/'
const file = 'dist/404.html'

if (existsSync(file)) {
  const html = readFileSync(file, 'utf8').replaceAll('__BASE__', base)
  writeFileSync(file, html)
  console.log(`[postbuild] 404.html SPA fallback base set to "${base}"`)
}
