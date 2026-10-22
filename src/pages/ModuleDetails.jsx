import { Link, useParams } from 'react-router-dom'
import { FileText } from 'lucide-react'
import modules from '../data/modules'
import materials from '../data/materials'
import tools from '../data/tools'
import { useStore } from '../context/Store'
import ExperimentCard from '../components/ExperimentCard'
import { Breadcrumbs, Empty, PageWrap } from '../components/ui'
import NotFound from './NotFound'

export default function ModuleDetails() {
  const { moduleId } = useParams()
  const { experiments } = useStore()
  const m = modules.find((x) => String(x.id) === moduleId)
  if (!m) return <NotFound />
  const exps = experiments.filter((e) => e.moduleId === m.id)
  const names = [...new Set(exps.flatMap((e) => e.tools))]
  const used = tools.filter((t) => names.includes(t.name))
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Modules', to: '/modules' }, { label: `Module ${m.number}` }]} />
      <p className="text-xs tracking-widest text-orange-300">MODULE {m.number}</p>
      <h1 className="text-3xl font-bold mb-8">{m.title}</h1>
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <section className="glass p-5"><h2 className="font-semibold mb-2">Overview</h2><p className="text-sm text-slate-400">{m.description}</p></section>
        <section className="glass p-5"><h2 className="font-semibold mb-2">Learning Objectives</h2><ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">{m.objectives.map((o) => <li key={o}>{o}</li>)}</ul></section>
        <section className="glass p-5"><h2 className="font-semibold mb-2">Topics</h2><div className="flex flex-wrap gap-1">{m.topics.map((t) => <span key={t} className="chip">{t}</span>)}</div></section>
      </div>
      <h2 className="h2">Experiments</h2>
      {exps.length ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">{exps.map((e, i) => <ExperimentCard key={e.id} e={e} i={i} />)}</div> : <Empty title="No experiments in this module yet." hint="Add one from the Experiments page." />}
      <h2 className="h2">Study Materials</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {materials.filter((x) => x.moduleId === m.id).map((x) => (
          <Link key={x.id} to={`/materials/${x.id}`} className="glass p-4 flex items-center gap-3 hover:border-orange-400/40 transition"><FileText className="text-orange-300 shrink-0" />{x.title}</Link>
        ))}
      </div>
      <h2 className="h2">Tools</h2>
      <div className="flex flex-wrap gap-2">{used.map((t) => <Link key={t.id} to={`/tools/${t.id}`} className="btn-ghost">{t.name}</Link>)}</div>
    </PageWrap>
  )
}
