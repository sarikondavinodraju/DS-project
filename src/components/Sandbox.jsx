import { useEffect, useState } from 'react'
import { Play, RotateCcw, Copy, Check, AlertTriangle } from 'lucide-react'
import { runCode } from '../utils/sandbox'

export default function Sandbox({ initialCode, expected }) {
  const [code, setCode] = useState(initialCode)
  const [state, setState] = useState({ status: 'idle' })
  const [copied, setCopied] = useState(false)
  useEffect(() => { setCode(initialCode); setState({ status: 'idle' }) }, [initialCode])
  const run = async () => { setState({ status: 'running' }); const r = await runCode(code, expected); setState(r.error ? { status: 'error', error: r.error } : { status: 'ok', ...r }) }
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ } }
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="glass p-4 flex flex-col gap-3">
        <div className="text-xs text-slate-400">Code</div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Python code editor" className="input font-mono min-h-[240px] resize-y leading-relaxed" />
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={run} disabled={state.status === 'running'}><Play size={14} />Run</button>
          <button className="btn-ghost" onClick={() => { setCode(initialCode); setState({ status: 'idle' }) }}><RotateCcw size={14} />Reset</button>
          <button className="btn-ghost" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}Copy</button>
        </div>
      </div>
      <div className="glass p-4 min-h-[240px]" aria-live="polite">
        <div className="text-xs text-slate-400 mb-3">Output</div>
        {state.status === 'idle' && <p className="text-sm text-slate-500">Press Run to see the output here.</p>}
        {state.status === 'running' && <p className="text-sm text-orange-300">Running...</p>}
        {state.status === 'error' && <p className="text-sm text-rose-300 flex gap-2"><AlertTriangle size={16} className="shrink-0" />{state.error}</p>}
        {state.status === 'ok' && (<>
          {state.demo && <p className="text-xs text-amber-300 mb-2">Demo mode: no Python backend is connected, so this is the expected output, not a real run.</p>}
          <pre className="text-sm font-mono text-emerald-200 overflow-x-auto whitespace-pre">{state.stdout}</pre>
          {state.chart && (
            <svg viewBox="0 0 200 90" className="mt-3 w-full max-w-sm" role="img" aria-label="Demo chart">
              {[30, 55, 80, 62, 40, 22].map((h, i) => <rect key={i} x={10 + i * 30} y={80 - h} width="22" height={h} rx="3" fill="url(#g)" />)}
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fb923c" /><stop offset="1" stopColor="#38bdf8" /></linearGradient></defs>
            </svg>)}
        </>)}
      </div>
    </div>
  )
}
