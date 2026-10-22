import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Pencil } from 'lucide-react'

export default function ExperimentCard({ e, i = 0, onEdit }) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.3) }} whileHover={{ y: -4 }} className="glass p-5 flex flex-col gap-3 hover:border-orange-400/40 transition-colors">
      <div className="flex justify-between items-center text-xs"><span className="tracking-widest text-orange-300">EXPERIMENT {e.number}</span><span className="chip">{e.difficulty}</span></div>
      <h3 className="text-lg font-semibold leading-snug">{e.title}</h3>
      <p className="text-sm text-slate-400 flex-1">{e.description}</p>
      <p className="text-xs text-sky-300">{e.module}</p>
      <div className="flex flex-wrap gap-1">{e.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>
      <div className="flex flex-wrap gap-2 pt-1">
        <Link to={`/experiments/${e.id}/overview`} className="btn-primary">Overview <ArrowRight size={14} /></Link>
        {onEdit && <button className="btn-ghost" onClick={() => onEdit(e)}><Pencil size={14} />Edit Experiment</button>}
      </div>
    </motion.article>
  )
}
