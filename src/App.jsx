import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import { Spinner } from './components/ui'

const Home = lazy(() => import('./pages/Home'))
const Modules = lazy(() => import('./pages/Modules'))
const ModuleDetails = lazy(() => import('./pages/ModuleDetails'))
const Experiments = lazy(() => import('./pages/Experiments'))
const ExperimentOverview = lazy(() => import('./pages/ExperimentOverview'))
const SubExperiment = lazy(() => import('./pages/SubExperiment'))
const Tools = lazy(() => import('./pages/Tools'))
const ToolDetails = lazy(() => import('./pages/ToolDetails'))
const MaterialViewer = lazy(() => import('./pages/MaterialViewer'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ToOverview = () => <Navigate to={`/experiments/${useParams().experimentId}/overview`} replace />

export default function App() {
  return (
    <Suspense fallback={<div className="p-10"><Spinner label="Loading..." /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId" element={<ModuleDetails />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/:experimentId" element={<ToOverview />} />
          <Route path="/experiments/:experimentId/overview" element={<ExperimentOverview />} />
          <Route path="/experiments/:experimentId/:subExperimentId" element={<SubExperiment />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolId" element={<ToolDetails />} />
          <Route path="/materials/:materialId" element={<MaterialViewer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
