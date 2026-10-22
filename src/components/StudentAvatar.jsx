import { useState } from 'react'
import student from '../data/student'

const initialsOf = (name = '') =>
  name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase()

// Public-folder files have to respect the deployment base path
// (e.g. /DS-project/ on GitHub Pages). Absolute URLs are left untouched.
const resolveSrc = (src) => {
  if (!src) return src
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:')) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`
}

/**
 * Student photo with a graceful fallback: if no photo is set (or the file is
 * missing) the initials are shown on an orange-to-blue gradient instead.
 */
export default function StudentAvatar({ className = '', alt }) {
  const [failed, setFailed] = useState(false)

  if (!student.photo || failed) {
    return (
      <span className={`grid place-items-center bg-gradient-to-br from-orange-400 to-sky-500 font-semibold text-slate-900 ${className}`} aria-hidden="true">
        {initialsOf(student.name)}
      </span>
    )
  }

  return (
    <img
      src={resolveSrc(student.photo)}
      alt={alt ?? `${student.name} photo`}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
