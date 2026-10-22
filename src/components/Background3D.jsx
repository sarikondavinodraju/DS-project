import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Network({ count }) {
  const group = useRef()
  const { points, lines } = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < p.length; i++) p[i] = (Math.random() - 0.5) * (i % 3 === 2 ? 6 : 14)
    const l = []
    for (let i = 0; i < count; i++) for (let j = i + 1; j < count; j++) {
      const d = Math.hypot(p[i * 3] - p[j * 3], p[i * 3 + 1] - p[j * 3 + 1], p[i * 3 + 2] - p[j * 3 + 2])
      if (d < 2.3) l.push(p[i * 3], p[i * 3 + 1], p[i * 3 + 2], p[j * 3], p[j * 3 + 1], p[j * 3 + 2])
    }
    return { points: p, lines: new Float32Array(l) }
  }, [count])
  useFrame((s, dt) => {
    const g = group.current
    g.rotation.y += dt * 0.03
    g.rotation.x += (s.pointer.y * 0.15 - g.rotation.x) * 0.03
    g.position.x += (s.pointer.x * 0.4 - g.position.x) * 0.03
  })
  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry>
        <pointsMaterial size={0.06} color="#fdba74" transparent opacity={0.8} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.18} />
      </lineSegments>
    </group>
  )
}

export default function Background3D() {
  const small = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (small) return null
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'low-power' }}>
        <Network count={90} />
      </Canvas>
    </div>
  )
}
