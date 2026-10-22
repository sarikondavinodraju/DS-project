import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, ExternalLink, Maximize, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import materials from '../data/materials'
import modules from '../data/modules'
import { Breadcrumbs, PageWrap, Spinner } from '../components/ui'
import NotFound from './NotFound'

export default function MaterialViewer() {
  const { materialId } = useParams()
  const m = materials.find((x) => x.id === materialId)
  const [status, setStatus] = useState('loading')
  const [page, setPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const box = useRef()
  const check = useCallback(async () => {
    if (!m) return
    setStatus('loading')
    try { const r = await fetch(m.url); setStatus(r.ok && (r.headers.get('content-type') || '').includes('pdf') ? 'ok' : 'error') } catch { setStatus('error') }
  }, [m])
  useEffect(() => { setPage(1); setZoom(100); check() }, [check])
  if (!m) return <NotFound />
  const mod = modules.find((x) => x.id === m.moduleId)
  return (
    <PageWrap>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Modules', to: '/modules' }, { label: `Module ${mod.number}`, to: `/modules/${mod.id}` }, { label: m.title }]} />
      <h1 className="text-2xl font-bold mb-4">{m.title}</h1>
      <div className="glass p-3 flex flex-wrap items-center gap-2 mb-4" role="toolbar" aria-label="PDF controls">
        <button className="btn-ghost !p-2" aria-label="Previous page" onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft size={16} /></button>
        <input type="number" min="1" value={page} onChange={(e) => setPage(Math.max(1, Number(e.target.value) || 1))} className="input !w-20 text-center" aria-label="Page number" />
        <button className="btn-ghost !p-2" aria-label="Next page" onClick={() => setPage((p) => p + 1)}><ChevronRight size={16} /></button>
        <span className="mx-2 h-6 w-px bg-white/10" />
        <button className="btn-ghost !p-2" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(50, z - 25))}><ZoomOut size={16} /></button>
        <span className="text-sm w-12 text-center">{zoom}%</span>
        <button className="btn-ghost !p-2" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(300, z + 25))}><ZoomIn size={16} /></button>
        <div className="flex gap-2 ml-auto">
          <a className="btn-ghost" href={m.url} download={m.title}><Download size={16} />Download</a>
          <a className="btn-ghost" href={m.url} target="_blank" rel="noreferrer"><ExternalLink size={16} />Open in new tab</a>
          <button className="btn-ghost" onClick={() => box.current?.requestFullscreen?.()}><Maximize size={16} />Full screen</button>
        </div>
      </div>
      {status === 'loading' && <Spinner label="Loading material..." />}
      {status === 'error' && (
        <div className="glass p-10 text-center" role="alert">
          <p className="font-medium">Unable to load material.</p>
          <p className="text-sm text-slate-400 mt-1">Add the file <code className="text-orange-300">public{m.url}</code> and try again.</p>
          <button className="btn-primary mt-4" onClick={check}>Try again</button>
        </div>
      )}
      {status === 'ok' && <div ref={box} className="glass overflow-hidden bg-[#0b1226]"><iframe title={m.title} key={`${page}-${zoom}`} src={`${m.url}#page=${page}&zoom=${zoom}`} className="w-full h-[75vh]" /></div>}
    </PageWrap>
  )
}
