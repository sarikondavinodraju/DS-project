import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, SearchX } from 'lucide-react'

export const PageWrap = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
    {children}
  </motion.div>
)
export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-400 mb-6">
    {items.map((it, i) => (
      <span key={i} className="flex items-center gap-1">
        {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
        {it.to ? <Link to={it.to} className="hover:text-sky-300">{it.label}</Link> : <span className="text-slate-200" aria-current="page">{it.label}</span>}
      </span>
    ))}
  </nav>
)
export const Empty = ({ title = 'No results found.', hint = 'Try another search.', action }) => (
  <div className="glass p-10 text-center text-slate-400" role="status">
    <SearchX className="mx-auto mb-3" />
    <p className="text-slate-200 font-medium">{title}</p><p className="text-sm mt-1">{hint}</p>{action}
  </div>
)
export const Spinner = ({ label = 'Loading...' }) => (
  <div className="glass p-10 text-center text-slate-400" role="status"><div className="mx-auto mb-3 h-6 w-6 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />{label}</div>
)
export const Progress = ({ value }) => (
  <div className="h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className="h-full bg-gradient-to-r from-sky-400 to-violet-500" />
  </div>
)
export const SectionTitle = ({ children }) => <h2 className="h2">{children}</h2>
