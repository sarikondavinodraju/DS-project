import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../context/Store'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import { Breadcrumbs, PageWrap, Progress } from '../components/ui'
import NotFound from './NotFound'

export default function ExperimentOverview() {
  const { experimentId } = useParams()
  const { experiments, done } = useStore()
  const e = experiments.find((x) => String(x.id) === experimentId)
  if (!e) return <NotFound />
  const doneCount = e.subExperiments.filter((s) => done.includes(`${e.id}-${s.id}`)).length
  const stats = [['Experiment Number', e.number], ['Module', e.module], ['Difficulty', e.difficulty], ['Sub Experiments', e.subExperiments.length], ['Tools', e.tools.length]]
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Experiments', to: '/experiments' }, { label: `Experiment ${e.number}` }]} />
      <p className="text-xs tracking-widest text-sky-300">EXPERIMENT {e.number} · OVERVIEW</p>
      <h1 className="text-3xl font-bold mb-6">{e.title}</h1>
      <section className="glass p-6 mb-6"><h2 className="font-semibold mb-2">Summary</h2><p className="text-slate-300 max-w-3xl">{e.overview.summary}</p><div className="flex flex-wrap gap-1 mt-4">{e.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div></section>
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8" aria-label="Statistics">
        {stats.map(([k, v]) => <div key={k} className="glass p-4"><div className="text-xs text-slate-400">{k}</div><div className="font-semibold mt-1 break-words">{v}</div></div>)}
      </section>
      <h2 className="h2">Architecture</h2>
      <div className="mb-10"><ArchitectureDiagram steps={e.overview.architecture} info={e.overview.archInfo} /></div>
      <div className="flex items-center justify-between mb-2"><h2 className="h2 !mb-0">Sub Experiments</h2><span className="text-sm text-slate-400">{doneCount} of 6 done</span></div>
      <div className="mb-4"><Progress value={Math.round((doneCount / 6) * 100)} /></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {e.subExperiments.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
            <Link to={`/experiments/${e.id}/${s.id.toLowerCase()}`} className="glass p-5 flex items-center gap-4 hover:border-sky-400/40 transition h-full">
              <span className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500/40 to-violet-500/40 grid place-items-center text-xl font-bold shrink-0">{s.id}</span>
              <span><span className="block font-semibold">{s.title}</span><span className="text-xs text-slate-400">{done.includes(`${e.id}-${s.id}`) ? 'Completed' : 'Open to start'}</span></span>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrap>
  )
}
