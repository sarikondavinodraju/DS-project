import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import base from '../data/experiments'

const Ctx = createContext(null)
const load = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f } catch { return f } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage unavailable */ } }

export function StoreProvider({ children }) {
  const [edits, setEdits] = useState(() => load('mbu-edits', {}))
  const [done, setDone] = useState(() => load('mbu-done', []))
  useEffect(() => save('mbu-edits', edits), [edits])
  useEffect(() => save('mbu-done', done), [done])
  const experiments = useMemo(() => base.map((e) => edits[e.id] || e), [edits])
  const value = {
    experiments, done,
    saveExperiment: (e) => setEdits((p) => ({ ...p, [e.id]: e })),
    resetExperiment: (id) => setEdits((p) => { const n = { ...p }; delete n[id]; return n }),
    toggleDone: (key) => setDone((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]))
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useStore = () => useContext(Ctx)
