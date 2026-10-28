import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, GraduationCap, Github, Linkedin, Menu, Moon, Search, Sun, X } from 'lucide-react'
import Background3D from './Background3D'
import SearchBar from './SearchBar'
import student from '../data/student'

const nav = [['/', 'HOME'], ['/modules', 'MODULES'], ['/experiments', 'EXPERIMENTS'], ['/tools', 'TOOLS']]
const linkCls = ({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-white/10 text-orange-300' : 'text-slate-300 hover:text-white hover:bg-white/5'}`
const ext = (u) => (u.startsWith('http') ? u : undefined)

export default function Layout() {
  const [light, setLight] = useState(() => localStorage.getItem('mbu-theme') === 'light')
  const [menu, setMenu] = useState(false)
  const [find, setFind] = useState(false)
  const [bell, setBell] = useState(false)
  useEffect(() => { document.documentElement.classList.toggle('light', light); localStorage.setItem('mbu-theme', light ? 'light' : 'dark') }, [light])
  return (
    <div className="min-h-screen flex flex-col">
      <Background3D />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060a1a]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Mohan Babu University home">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-sky-600 grid place-items-center" aria-hidden="true"><GraduationCap size={22} /></span>
            <span className="leading-tight hidden sm:block"><span className="block text-[11px] tracking-[0.2em] text-slate-400">MOHAN BABU UNIVERSITY</span><span className="block text-sm font-semibold">DATA SCIENCE LEARNING PORTAL</span></span>
          </Link>
          <nav className="hidden md:flex gap-1 ml-auto" aria-label="Main">{nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} className={linkCls}>{l}</NavLink>)}</nav>
          <div className="flex items-center gap-1 ml-auto md:ml-2">
            <button className="btn-ghost !p-2" onClick={() => setFind(true)} aria-label="Search"><Search size={18} /></button>
            <button className="btn-ghost !p-2" onClick={() => setLight(!light)} aria-label="Toggle theme">{light ? <Moon size={18} /> : <Sun size={18} />}</button>
            <div className="relative">
              <button className="btn-ghost !p-2" onClick={() => setBell(!bell)} aria-label="Notifications"><Bell size={18} /></button>
              {bell && <div className="absolute right-0 mt-2 w-56 glass !bg-[#0b1226] p-3 text-sm text-slate-300">No new notifications.</div>}
            </div>
            <Link to="/" className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-orange-400/40" aria-label="Profile">
              <img src="/profile.jpeg" alt="Profile" className="h-full w-full object-cover" />
            </Link>
            <button className="btn-ghost !p-2 md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu" aria-expanded={menu}>{menu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden px-4 pb-3 flex flex-col" aria-label="Mobile">
              {nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenu(false)} className={linkCls}>{l}</NavLink>)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {find && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm p-4 pt-24" onClick={() => setFind(false)} role="dialog" aria-label="Search">
            <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}><SearchBar autoFocus large onDone={() => setFind(false)} /></div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid gap-6 sm:grid-cols-3 text-sm">
          <div><p className="font-semibold tracking-wide">MOHAN BABU UNIVERSITY</p><p className="text-slate-400">Data Science Learning Portal</p></div>
          <div className="flex gap-4 text-slate-300">{nav.map(([to, l]) => <Link key={to} to={to} className="hover:text-orange-300">{l[0] + l.slice(1).toLowerCase()}</Link>)}</div>
          <div className="flex gap-3 sm:justify-end">
            <a href={student.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-ghost !p-2"><Github size={18} /></a>
            <a href={student.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-ghost !p-2"><Linkedin size={18} /></a>
          </div>
          <p className="sm:col-span-3 text-xs text-slate-500">© 2026 Mohan Babu University</p>
        </div>
      </footer>
    </div>
  )
}
