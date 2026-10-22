import { Link } from 'react-router-dom'
import { PageWrap } from '../components/ui'

export default function NotFound() {
  return (
    <PageWrap>
      <div className="glass p-14 text-center max-w-xl mx-auto">
        <p className="text-7xl font-extrabold bg-gradient-to-r from-orange-400 to-sky-400 bg-clip-text text-transparent">404</p>
        <h1 className="text-2xl font-semibold mt-2">Page Not Found</h1>
        <p className="text-slate-400 mt-2">The page you are looking for does not exist or was moved.</p>
        <Link to="/" className="btn-primary mt-6">Return Home</Link>
      </div>
    </PageWrap>
  )
}
