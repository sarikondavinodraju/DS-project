import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function ArchitectureDiagram({ steps, info = [] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="glass p-6 flex flex-col items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center">
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
            onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={active === i}
            className={`px-6 py-2.5 rounded-xl border text-sm font-medium min-w-[220px] transition ${active === i ? 'bg-gradient-to-r from-orange-500/30 to-sky-500/30 border-orange-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
            {s.toUpperCase()}
          </motion.button>
          {i < steps.length - 1 && <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.06 + 0.1 }} className="text-orange-400/70 my-1"><ArrowDown size={18} /></motion.span>}
        </div>
      ))}
      {info[active] && <p className="mt-5 text-sm text-slate-300 text-center" aria-live="polite">{steps[active]}: {info[active]}</p>}
    </div>
  )
}
