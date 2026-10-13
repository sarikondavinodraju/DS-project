// Sandbox runner. Set VITE_PY_API to a backend that accepts POST {code} and returns {stdout, error}.
// Without it, this runs in DEMO mode: nothing is executed, the expected output is shown instead.
export async function runCode(code, expected) {
  const api = import.meta.env.VITE_PY_API
  if (api) {
    try {
      const r = await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
      const d = await r.json()
      return d.error ? { error: d.error } : { stdout: d.stdout, demo: false }
    } catch (e) { return { error: `Could not reach the Python backend at ${api}.` } }
  }
  await new Promise((r) => setTimeout(r, 500))
  if (!code.trim()) return { error: 'Nothing to run. Add some code to the editor.' }
  return { stdout: expected, demo: true, chart: /plt\.|hist|plot/.test(code) }
}
