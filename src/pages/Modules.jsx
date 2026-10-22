import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import modules from '../data/modules'
import materials from '../data/materials'
import { useStore } from '../context/Store'
import { Breadcrumbs, PageWrap, Progress } from '../components/ui'

export const moduleProgress = (m, experiments, done) => {
  const ex = experiments.filter((e) => e.moduleId === m.id)
  const total = ex.length * 6
  return total ? Math.round((done.filter((k) => ex.some((e) => k.startsWith(`${e.id}-`))).length / total) * 100) : 0
}
export default function Modules() {
  const { experiments, done } = useStore()
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Modules' }]} />
      <h1 className="text-3xl font-bold mb-6">Modules</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {modules.map((m, i) => (
          <motion.article key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} className="glass p-6 flex flex-col gap-3">
            <span className="text-xs tracking-widest text-orange-300">MODULE {m.number}</span>
            <h2 className="text-xl font-semibold">{m.title}</h2>
            <p className="text-sm text-slate-400">{m.description}</p>
            <div className="flex flex-wrap gap-1">{m.topics.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <p className="text-xs text-slate-400">{materials.filter((x) => x.moduleId === m.id).length} materials · {experiments.filter((e) => e.moduleId === m.id).length} experiments</p>
            <Progress value={moduleProgress(m, experiments, done)} />
            <Link to={`/modules/${m.id}`} className="btn-primary self-start mt-1">Open Module <ArrowRight size={14} /></Link>
          </motion.article>
        ))}
      </div>
    </PageWrap>
  )
}
