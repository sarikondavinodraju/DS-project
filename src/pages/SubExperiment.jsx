import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../context/Store'
import CodeBlock, { OutputViewer } from '../components/CodeBlock'
import Sandbox from '../components/Sandbox'
import { Breadcrumbs, PageWrap } from '../components/ui'
import NotFound from './NotFound'

export default function SubExperiment() {
  const { experimentId, subExperimentId } = useParams()
  const { experiments, done, toggleDone } = useStore()
  const e = experiments.find((x) => String(x.id) === experimentId)
  const idx = e ? e.subExperiments.findIndex((s) => s.id.toLowerCase() === subExperimentId.toLowerCase()) : -1
  if (idx < 0) return <NotFound />
  const s = e.subExperiments[idx]
  const key = `${e.id}-${s.id}`
  const prev = e.subExperiments[idx - 1], next = e.subExperiments[idx + 1]
  const isDone = done.includes(key)
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Experiments', to: '/experiments' }, { label: `Experiment ${e.number}`, to: `/experiments/${e.id}/overview` }, { label: s.title }]} />
      <div className="flex flex-wrap items-start justify-between gap-3 mb-8">
        <div><p className="text-xs tracking-widest text-sky-300">EXPERIMENT {e.number} · PART {s.id}</p><h1 className="text-3xl font-bold">{s.title}</h1></div>
        <button className={isDone ? 'btn-primary' : 'btn-ghost'} onClick={() => toggleDone(key)} aria-pressed={isDone}>{isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}{isDone ? 'Completed' : 'Mark as complete'}</button>
      </div>
      <div className="space-y-8">
        <section><h2 className="h2">Aim</h2><p className="glass p-5 text-slate-300">{s.aim}</p></section>
        <section><h2 className="h2">Procedure</h2><ol className="glass p-5 list-decimal pl-9 space-y-2 text-slate-300">{s.procedure.filter(Boolean).map((p, i) => <li key={i}>{p}</li>)}</ol></section>
        <section><h2 className="h2">Code</h2><CodeBlock code={s.code} /></section>
        <section><h2 className="h2">Output</h2><OutputViewer text={s.output} /></section>
        <section><h2 className="h2">Sandbox</h2><Sandbox initialCode={s.code} expected={s.output} /></section>
      </div>
      <div className="flex justify-between mt-10">
        {prev ? <Link className="btn-ghost" to={`/experiments/${e.id}/${prev.id.toLowerCase()}`}><ChevronLeft size={16} />{prev.id}: {prev.title}</Link> : <span />}
        {next ? <Link className="btn-primary" to={`/experiments/${e.id}/${next.id.toLowerCase()}`}>{next.id}: {next.title}<ChevronRight size={16} /></Link> : <Link className="btn-primary" to={`/experiments/${e.id}/overview`}>Back to overview</Link>}
      </div>
    </PageWrap>
  )
}
