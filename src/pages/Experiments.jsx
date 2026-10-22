import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '../context/Store'
import modules from '../data/modules'
import ExperimentCard from '../components/ExperimentCard'
import EditModal from '../components/EditModal'
import { Breadcrumbs, Empty, PageWrap } from '../components/ui'

const techs = ['All', 'Python', 'NumPy', 'Pandas', 'Matplotlib', 'Statistics', 'Machine Learning', 'Deep Learning']
const rank = { Beginner: 0, Intermediate: 1, Advanced: 2 }

export default function Experiments() {
  const { experiments } = useStore()
  const [q, setQ] = useState('')
  const [mod, setMod] = useState('all')
  const [diff, setDiff] = useState('all')
  const [tech, setTech] = useState('All')
  const [sort, setSort] = useState('number')
  const [editing, setEditing] = useState(null)
  const list = useMemo(() => {
    const s = q.toLowerCase()
    return experiments
      .filter((e) => (!s || `${e.title} ${e.description} ${e.tools.join(' ')}`.toLowerCase().includes(s)) && (mod === 'all' || e.moduleId === Number(mod)) && (diff === 'all' || e.difficulty === diff) && (tech === 'All' || e.tools.includes(tech)))
      .sort((a, b) => (sort === 'title' ? a.title.localeCompare(b.title) : sort === 'difficulty' ? rank[a.difficulty] - rank[b.difficulty] : a.id - b.id))
  }, [experiments, q, mod, diff, tech, sort])
  const clear = () => { setQ(''); setMod('all'); setDiff('all'); setTech('All') }
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Experiments' }]} />
      <h1 className="text-3xl font-bold mb-6">Experiments</h1>
      <div className="glass p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <input className="input lg:col-span-4" placeholder="Search experiments..." aria-label="Search experiments" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" aria-label="Module" value={mod} onChange={(e) => setMod(e.target.value)}><option value="all">All modules</option>{modules.map((m) => <option key={m.id} value={m.id}>{m.number} {m.title}</option>)}</select>
        <select className="input" aria-label="Difficulty" value={diff} onChange={(e) => setDiff(e.target.value)}><option value="all">All difficulties</option>{Object.keys(rank).map((d) => <option key={d}>{d}</option>)}</select>
        <select className="input" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="number">Sort: Number</option><option value="title">Sort: Title</option><option value="difficulty">Sort: Difficulty</option></select>
        <button className="btn-ghost justify-center" onClick={clear}>Clear filters</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Technology filter">
        {techs.map((t) => <button key={t} onClick={() => setTech(t)} aria-pressed={tech === t} className={`chip !px-3 !py-1 cursor-pointer ${tech === t ? '!bg-orange-500/30 !border-orange-400 !text-white' : ''}`}>{t}</button>)}
      </div>
      <p className="text-sm text-slate-400 mb-3">{list.length} experiment{list.length === 1 ? '' : 's'}</p>
      {list.length ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{list.map((e, i) => <ExperimentCard key={e.id} e={e} i={i} onEdit={setEditing} />)}</div>
        : <Empty title="No experiments found." hint="Try another search or clear the filters." action={<button className="btn-ghost mt-4" onClick={clear}>Clear filters</button>} />}
      <AnimatePresence>{editing && <EditModal key={editing.id} experiment={editing} onClose={() => setEditing(null)} />}</AnimatePresence>
    </PageWrap>
  )
}
