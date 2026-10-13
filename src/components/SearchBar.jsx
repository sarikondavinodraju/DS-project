import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useStore } from '../context/Store'
import { buildIndex, search } from '../utils/search'

export default function SearchBar({ autoFocus, onDone, large }) {
  const { experiments } = useStore()
  const index = useMemo(() => buildIndex(experiments), [experiments])
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const nav = useNavigate()
  const ref = useRef()
  const results = useMemo(() => search(index, q), [index, q])
  const go = (r) => { nav(r.to); setQ(''); onDone?.() }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && results[active]) go(results[active])
    else if (e.key === 'Escape') { setQ(''); onDone?.() }
  }
  return (
    <div className="relative">
      <div className={`glass flex items-center gap-3 px-4 ${large ? 'py-4' : 'py-2.5'} focus-within:border-sky-400`}>
        <Search size={20} className="text-sky-300 shrink-0" aria-hidden="true" />
        <input ref={ref} autoFocus={autoFocus} value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }} onKeyDown={onKey}
          placeholder="Search experiments, modules, tools..." aria-label="Search" role="combobox" aria-expanded={!!q} aria-controls="search-results"
          className="bg-transparent outline-none flex-1 min-w-0 placeholder:text-slate-500" />
        {q && <button onClick={() => { setQ(''); ref.current?.focus() }} aria-label="Clear search" className="text-slate-400 hover:text-white"><X size={18} /></button>}
      </div>
      <AnimatePresence>
        {q && (
          <motion.ul id="search-results" role="listbox" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute z-40 left-0 right-0 mt-2 glass !bg-[#0b1226]/95 max-h-96 overflow-y-auto p-2">
            {results.length === 0 && <li className="p-4 text-sm text-slate-400">No results found. Try another search.</li>}
            {results.map((r, i) => (
              <li key={r.to + r.title + i} role="option" aria-selected={i === active}>
                <button onClick={() => go(r)} onMouseEnter={() => setActive(i)} className={`w-full text-left px-3 py-2 rounded-xl ${i === active ? 'bg-white/10' : ''}`}>
                  <span className="text-[10px] tracking-widest text-sky-300">{r.type}</span>
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-xs text-slate-400">{r.sub}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
