import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import student from '../data/student'
import modules from '../data/modules'
import tools from '../data/tools'
import { useStore } from '../context/Store'
import SearchBar from '../components/SearchBar'
import ExperimentCard from '../components/ExperimentCard'
import StudentAvatar from '../components/StudentAvatar'
import { PageWrap, Progress, Spinner } from '../components/ui'

function Counter({ to }) {
  const [n, setN] = useState(0)
  useEffect(() => { let i = 0; const t = setInterval(() => { i += Math.ceil(to / 20); setN(Math.min(i, to)); if (i >= to) clearInterval(t) }, 30); return () => clearInterval(t) }, [to])
  return n
}
const Row = ({ k, v }) => <div><dt className="text-xs text-slate-400">{k}</dt><dd className="font-medium break-words">{v}</dd></div>

export default function Home() {
  const { experiments, done } = useStore()
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 250); return () => clearTimeout(t) }, [])
  const total = experiments.length * 6
  const pct = Math.round((done.length / total) * 100)
  const subs = experiments.reduce((n, e) => n + e.subExperiments.length, 0)
  const stats = [[experiments.length, 'Total Experiments'], [modules.length, 'Data Science Modules'], [subs, 'Sub Experiments'], [tools.length, 'Tools']]
  return (
    <PageWrap>
      <section className="mb-10 text-center md:text-left">
        <p className="text-sm tracking-[0.3em] text-orange-300">MOHAN BABU UNIVERSITY</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight bg-gradient-to-r from-white via-orange-200 to-sky-300 bg-clip-text text-transparent">DATA SCIENCE LEARNING PORTAL</h1>
        <p className="mt-3 text-lg text-slate-300">Learn • Experiment • Analyze • Build</p>
        <p className="mt-2 max-w-2xl text-slate-400 mx-auto md:mx-0">An interactive learning environment for Data Science students to explore modules, experiments, tools, documentation and practical code.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
          <Link to="/experiments" className="btn-primary">Explore Experiments</Link>
          <Link to="/modules" className="btn-ghost">Explore Modules</Link>
        </div>
      </section>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="lg:col-start-1 lg:row-start-1"><SearchBar large /></div>
        <aside className="glass p-6 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:sticky lg:top-24" aria-label="Student profile">
          <div className="flex items-center gap-4 mb-4">
            <StudentAvatar className="h-20 w-20 rounded-2xl ring-2 ring-orange-400/50 shadow-lg shrink-0" />
            <div className="min-w-0">
              <h2 className="text-xs tracking-[0.25em] text-orange-300">STUDENT PROFILE</h2>
              <p className="text-xs text-slate-400 mt-1 leading-snug">Mohan Babu University</p>
              <span className="inline-block mt-2 text-[10px] tracking-widest text-orange-300 border border-orange-400/40 bg-orange-500/10 rounded-full px-2.5 py-0.5">ID CARD</span>
            </div>
          </div>
          <div className="border-t border-white/10 my-5" />
          <dl className="space-y-3">
            <Row k="Student ID" v={student.studentId} /><Row k="Student Name" v={student.name} /><Row k="Roll Number" v={student.rollNumber} />
            <Row k="Branch" v={student.branch} /><Row k="Section" v={student.section} />
          </dl>
          <div className="border-t border-white/10 my-5" />
          <h3 className="text-xs tracking-[0.25em] text-orange-300 mb-3">FACULTY</h3>
          <dl className="space-y-3"><Row k="Name" v={student.faculty.name} /><Row k="Designation" v={student.faculty.designation} /></dl>
          <div className="flex gap-3 mt-5">
            <a href={student.github} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} />GitHub</a>
            <a href={student.linkedin} target="_blank" rel="noreferrer" className="btn-ghost"><Linkedin size={16} />LinkedIn</a>
          </div>
        </aside>
        <section className="lg:col-start-1 grid grid-cols-2 xl:grid-cols-4 gap-4" aria-label="Statistics">
          {stats.map(([n, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass p-5">
              <div className="text-3xl font-bold"><Counter to={n} /></div><div className="text-xs text-slate-400 mt-1">{l.toUpperCase()}</div>
            </motion.div>
          ))}
        </section>
        <section className="lg:col-start-1 space-y-6">
          <div className="glass p-5"><div className="flex justify-between text-sm mb-2"><span>Learning progress</span><span className="text-slate-400">{done.length} of {total} sub-experiments done</span></div><Progress value={pct} /></div>
          <div>
            <h2 className="h2">Experiments</h2>
            {!ready ? <Spinner label="Loading experiments..." /> : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{experiments.map((e, i) => <ExperimentCard key={e.id} e={e} i={i} />)}</div>}
          </div>
        </section>
      </div>
    </PageWrap>
  )
}
