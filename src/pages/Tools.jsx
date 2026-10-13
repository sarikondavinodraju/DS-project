import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Boxes, Brain, Code2, Database, GitBranch, LineChart, Table2, ExternalLink } from 'lucide-react'
import tools, { toolCategories } from '../data/tools'
import { Breadcrumbs, PageWrap } from '../components/ui'

export const icons = { Programming: Code2, 'Data Processing': Table2, Visualization: LineChart, 'Machine Learning': Boxes, 'Deep Learning': Brain, Databases: Database, Development: GitBranch }

export default function Tools() {
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Tools' }]} />
      <h1 className="text-3xl font-bold mb-8">Tools</h1>
      {toolCategories.map((c) => {
        const Icon = icons[c]
        return (
          <section key={c} className="mb-10" aria-label={c}>
            <h2 className="h2">{c}</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {tools.filter((t) => t.category === c).map((t, i) => (
                <motion.article key={t.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="glass p-5 flex flex-col gap-3">
                  <span className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-500/30 to-violet-500/30 grid place-items-center" aria-hidden="true"><Icon size={22} /></span>
                  <div><h3 className="text-lg font-semibold">{t.name}</h3><p className="text-xs text-sky-300">{t.category}</p></div>
                  <p className="text-sm text-slate-400 flex-1">{t.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/tools/${t.id}`} className="btn-primary">Documentation <ArrowRight size={14} /></Link>
                    <a href={t.website} target="_blank" rel="noreferrer" className="btn-ghost">Official website <ExternalLink size={14} /></a>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )
      })}
    </PageWrap>
  )
}
