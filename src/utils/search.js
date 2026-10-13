import modules from '../data/modules'
import tools from '../data/tools'
import materials from '../data/materials'

export function buildIndex(experiments) {
  const out = []
  experiments.forEach((e) => {
    out.push({ type: 'EXPERIMENT', title: e.title, sub: `Experiment ${e.number}`, to: `/experiments/${e.id}/overview`, text: `${e.description} ${e.tools.join(' ')}` })
    e.subExperiments.forEach((s) => out.push({ type: 'SUB-EXPERIMENT', title: s.title, sub: `${e.title} · ${s.id}`, to: `/experiments/${e.id}/${s.id.toLowerCase()}`, text: s.aim }))
  })
  modules.forEach((m) => out.push({ type: 'MODULE', title: m.title, sub: `Module ${m.number}`, to: `/modules/${m.id}`, text: `${m.description} ${m.topics.join(' ')}` }))
  tools.forEach((t) => out.push({ type: 'TOOL', title: t.name, sub: t.category, to: `/tools/${t.id}`, text: t.description }))
  materials.forEach((m) => out.push({ type: 'MATERIAL', title: m.title, sub: `Module ${m.moduleId}`, to: `/materials/${m.id}`, text: '' }))
  return out
}
export function search(index, q) {
  const s = q.trim().toLowerCase()
  if (!s) return []
  const score = (i) => (i.title.toLowerCase().startsWith(s) ? 0 : i.title.toLowerCase().includes(s) ? 1 : i.text.toLowerCase().includes(s) ? 2 : 9)
  return index.filter((i) => score(i) < 9).sort((a, b) => score(a) - score(b)).slice(0, 12)
}
