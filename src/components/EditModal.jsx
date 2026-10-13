import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import modules from '../data/modules'
import { useStore } from '../context/Store'

const Field = ({ label, children }) => <label className="block text-sm"><span className="block mb-1 text-slate-400">{label}</span>{children}</label>

export default function EditModal({ experiment, onClose }) {
  const { saveExperiment, resetExperiment } = useStore()
  const [f, setF] = useState(() => JSON.parse(JSON.stringify(experiment)))
  const [si, setSi] = useState(0)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const setSub = (k, v) => setF({ ...f, subExperiments: f.subExperiments.map((s, i) => (i === si ? { ...s, [k]: v } : s)) })
  const sub = f.subExperiments[si]
  const save = (e) => {
    e.preventDefault()
    const m = modules.find((x) => x.id === Number(f.moduleId))
    saveExperiment({ ...f, moduleId: m.id, module: m.title, tools: typeof f.tools === 'string' ? f.tools.split(',').map((t) => t.trim()).filter(Boolean) : f.tools })
    onClose()
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label="Edit experiment">
      <motion.form initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} onSubmit={save} className="glass !bg-[#0b1226]/95 max-w-3xl mx-auto my-6 p-6 space-y-4">
        <div className="flex justify-between items-center"><h2 className="text-lg font-semibold">EDIT EXPERIMENT</h2><button type="button" onClick={onClose} aria-label="Close" className="btn-ghost !p-2"><X size={16} /></button></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Experiment Number"><input className="input" value={f.number} onChange={set('number')} required /></Field>
          <Field label="Title"><input className="input" value={f.title} onChange={set('title')} required /></Field>
          <Field label="Module"><select className="input" value={f.moduleId} onChange={set('moduleId')}>{modules.map((m) => <option key={m.id} value={m.id}>{m.number} {m.title}</option>)}</select></Field>
          <Field label="Difficulty"><select className="input" value={f.difficulty} onChange={set('difficulty')}>{['Beginner', 'Intermediate', 'Advanced'].map((d) => <option key={d}>{d}</option>)}</select></Field>
        </div>
        <Field label="Description"><textarea className="input" rows={2} value={f.description} onChange={set('description')} /></Field>
        <Field label="Tools (comma separated)"><input className="input" value={Array.isArray(f.tools) ? f.tools.join(', ') : f.tools} onChange={(e) => setF({ ...f, tools: e.target.value })} /></Field>
        <div className="border-t border-white/10 pt-4 space-y-4">
          <Field label="Sub Experiment">
            <select className="input" value={si} onChange={(e) => setSi(Number(e.target.value))}>{f.subExperiments.map((s, i) => <option key={s.id} value={i}>{s.id}: {s.title}</option>)}</select>
          </Field>
          <Field label="Sub Experiment Title"><input className="input" value={sub.title} onChange={(e) => setSub('title', e.target.value)} /></Field>
          <Field label="Aim"><textarea className="input" rows={2} value={sub.aim} onChange={(e) => setSub('aim', e.target.value)} /></Field>
          <Field label="Procedure (one step per line)"><textarea className="input" rows={4} value={sub.procedure.join('\n')} onChange={(e) => setSub('procedure', e.target.value.split('\n'))} /></Field>
          <Field label="Code"><textarea className="input font-mono" rows={6} value={sub.code} onChange={(e) => setSub('code', e.target.value)} /></Field>
          <Field label="Output"><textarea className="input font-mono" rows={4} value={sub.output} onChange={(e) => setSub('output', e.target.value)} /></Field>
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <button type="button" className="btn-ghost" onClick={() => { resetExperiment(experiment.id); onClose() }}>Restore original</button>
          <div className="flex gap-2"><button type="button" className="btn-ghost" onClick={onClose}>Cancel</button><button className="btn-primary">Save Changes</button></div>
        </div>
      </motion.form>
    </motion.div>
  )
}
