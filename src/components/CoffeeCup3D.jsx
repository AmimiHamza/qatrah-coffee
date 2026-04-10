import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Steam particle ── */
function SteamParticle({ delay = 0 }) {
  const ref = useRef()
  const speed = 0.3 + Math.random() * 0.4
  const xOff = (Math.random() - 0.5) * 0.3

  useFrame((state) => {
    if (!ref.current) return
    const t = ((state.clock.elapsedTime * speed + delay) % 2) / 2
    ref.current.position.y = 1.4 + t * 1.2
    ref.current.position.x = xOff * Math.sin(t * Math.PI * 2) * 0.4
    ref.current.material.opacity = t < 0.5 ? t * 1.4 : (1 - t) * 1.4
    ref.current.scale.setScalar(0.02 + t * 0.08)
  })

  return (
    <mesh ref={ref} position={[xOff, 1.4, 0]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#FEF4D5"
        transparent
        opacity={0.6}
        roughness={0}
        metalness={0}
      />
    </mesh>
  )
}

/* ── Coffee surface ripple ── */
function CoffeeSurface() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.58, 64]} />
      <MeshDistortMaterial
        color="#1a0d08"
        distort={0.08}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  )
}

/* ── Latte art ── */
function LatteArt() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.material.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })
  return (
    <mesh ref={ref} position={[0, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.1, 0.3, 32]} />
      <meshStandardMaterial
        color="#c8965a"
        transparent
        opacity={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

/* ── Main Cup ── */
function CoffeeCup({ mousePos }) {
  const groupRef = useRef()
  const cupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const targetX = mousePos.current.y * 0.3
    const targetY = mousePos.current.x * 0.4 + state.clock.elapsedTime * 0.12
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
  })

  const cupMat = new THREE.MeshStandardMaterial({
    color: '#FEF4D5',
    roughness: 0.15,
    metalness: 0.05,
  })

  const goldMat = new THREE.MeshStandardMaterial({
    color: '#F1E49A',
    roughness: 0.2,
    metalness: 0.6,
  })

  return (
    <group ref={groupRef}>
      {/* Saucer */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[1.05, 0.9, 0.08, 64]} />
        <meshStandardMaterial color="#FEF4D5" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* Saucer rim detail */}
      <mesh position={[0, -0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.04, 16, 64]} />
        <meshStandardMaterial color="#F1E49A" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Cup body — tapered cylinder */}
      <mesh ref={cupRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.45, 1.55, 64, 1, true]} />
        <meshStandardMaterial
          color="#FEF4D5"
          roughness={0.12}
          metalness={0.04}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Cup inner */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.42, 1.55, 64, 1, true]} />
        <meshStandardMaterial
          color="#e8d5b0"
          roughness={0.3}
          metalness={0}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Cup bottom */}
      <mesh position={[0, -0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 64]} />
        <meshStandardMaterial color="#FEF4D5" roughness={0.1} metalness={0.02} />
      </mesh>
      {/* Cup rim */}
      <mesh position={[0, 0.77, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.04, 16, 64]} />
        <meshStandardMaterial color="#F1E49A" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* Gold band decoration */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.025, 8, 64]} />
        <meshStandardMaterial color="#F1E49A" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Arabic letter ق engraved */}
      {/* Represented as a subtle disc on the cup front */}
      <mesh position={[0, 0.15, 0.59]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#F1E49A" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh position={[-0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.065, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#FEF4D5" roughness={0.12} metalness={0.04} />
      </mesh>
      {/* Handle inner rim gold */}
      <mesh position={[-0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.02, 8, 48, Math.PI]} />
        <meshStandardMaterial color="#F1E49A" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Coffee surface */}
      <CoffeeSurface />
      <LatteArt />

      {/* Steam particles */}
      {[0, 0.6, 1.2, 1.8, 2.4].map((d, i) => (
        <SteamParticle key={i} delay={d} />
      ))}
    </group>
  )
}

/* ── Scene ── */
function Scene({ mousePos }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 3]} intensity={2} color="#FEF4D5" castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#F1E49A" />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#FEF4D5" distance={8} />
      <spotLight
        position={[0, 5, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#FEF4D5"
        castShadow
      />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
        <CoffeeCup mousePos={mousePos} />
      </Float>
    </>
  )
}

/* ── Canvas Export ── */
export default function CoffeeCup3D() {
  const mousePos = useRef({ x: 0, y: 0 })
  const containerRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full canvas-wrapper">
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
