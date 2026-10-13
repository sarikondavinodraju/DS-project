import { Link, useParams } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import tools from '../data/tools'
import { useStore } from '../context/Store'
import CodeBlock from '../components/CodeBlock'
import { Breadcrumbs, PageWrap } from '../components/ui'
import NotFound from './NotFound'

export default function ToolDetails() {
  const { toolId } = useParams()
  const { experiments } = useStore()
  const t = tools.find((x) => x.id === toolId)
  if (!t) return <NotFound />
  const exps = experiments.filter((e) => e.tools.includes(t.name))
  const Sec = ({ title, children }) => <section><h2 className="h2">{title}</h2>{children}</section>
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Tools', to: '/tools' }, { label: t.name }]} />
      <h1 className="text-3xl font-bold">{t.name.toUpperCase()}</h1>
      <p className="text-sky-300 mb-8">{t.category}</p>
      <div className="space-y-8 max-w-4xl">
        <Sec title="Overview"><p className="glass p-5 text-slate-300">{t.description}</p></Sec>
        <Sec title="Features"><ul className="glass p-5 list-disc pl-9 text-slate-300 space-y-1">{t.features.map((f) => <li key={f}>{f}</li>)}</ul></Sec>
        <Sec title="Installation"><CodeBlock code={t.install} label="Terminal" /></Sec>
        <Sec title="Basic Usage"><CodeBlock code={t.usage} /></Sec>
        <Sec title="Examples"><CodeBlock code={t.usage + '\n\n# Try changing the values and running it in the Sandbox.'} /></Sec>
        <Sec title="Experiments Using This Tool">
          {exps.length ? <div className="grid sm:grid-cols-2 gap-3">{exps.map((e) => <Link key={e.id} to={`/experiments/${e.id}/overview`} className="glass p-4 hover:border-sky-400/40 transition"><span className="text-xs text-sky-300">EXPERIMENT {e.number}</span><span className="block font-medium">{e.title}</span></Link>)}</div> : <p className="glass p-5 text-slate-400">No experiments use this tool yet.</p>}
        </Sec>
        <Sec title="Documentation & Official Website">
          <div className="flex flex-wrap gap-3"><a className="btn-primary" href={t.docs} target="_blank" rel="noreferrer">Documentation <ExternalLink size={14} /></a><a className="btn-ghost" href={t.website} target="_blank" rel="noreferrer">Official Website <ExternalLink size={14} /></a></div>
        </Sec>
      </div>
    </PageWrap>
  )
}
