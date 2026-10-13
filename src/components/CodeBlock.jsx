import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const KW = 'import|from|as|def|return|for|in|if|else|elif|print|class|with|True|False|None|SELECT|FROM|GROUP|BY|git'
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export function highlight(code) {
  const re = new RegExp(`(#.*$)|("[^"\\n]*"|'[^'\\n]*')|\\b(${KW})\\b|\\b(\\d+\\.?\\d*)\\b`, 'gm')
  let out = '', last = 0, m
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index))
    const cls = m[1] ? 'text-slate-500 italic' : m[2] ? 'text-emerald-300' : m[3] ? 'text-violet-300' : 'text-amber-300'
    out += `<span class="${cls}">${esc(m[0])}</span>`
    last = m.index + m[0].length
  }
  return out + esc(code.slice(last))
}
export default function CodeBlock({ code, label = 'Python' }) {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(code); setOk(true); setTimeout(() => setOk(false), 1500) } catch { /* clipboard blocked */ } }
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 text-xs text-slate-400">
        <span>{label}</span>
        <button onClick={copy} className="btn-ghost !py-1 !px-2 text-xs" aria-label="Copy code">{ok ? <Check size={14} /> : <Copy size={14} />}{ok ? 'Copied' : 'Copy Code'}</button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed"><code dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>
    </div>
  )
}
export const OutputViewer = ({ text }) => (
  <div className="glass overflow-hidden">
    <div className="px-4 py-2 border-b border-white/10 text-xs text-slate-400">Output</div>
    <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-200 whitespace-pre">{text}</pre>
  </div>
)
