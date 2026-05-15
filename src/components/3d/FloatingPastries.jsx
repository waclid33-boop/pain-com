'use client'

// FloatingPastries.jsx
// These are geometric representations of pastries floating in space.
// We use real geometry shapes that LOOK like food:
// - Torus = donut
// - Torus with thick tube = bagel/bread ring  
// - Sphere = chocolate truffle
// - Cylinder = macaron
// - Custom = croissant-like shape
// Later in Phase 6 we replace these with real Blender models.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Each pastry is a separate component with its own floating animation
function FloatingDonut({ position, scale, speed, rotationAxis, color }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    // Bob up and down
    meshRef.current.position.y = initialY + Math.sin(time * speed) * 0.4
    // Slow rotation
    meshRef.current.rotation.x += 0.003 * speed
    meshRef.current.rotation.z += 0.002 * speed
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      {/* Torus = donut shape. Args: [radius, tube, radialSegs, tubularSegs] */}
      <torusGeometry args={[1, 0.38, 24, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.3}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function FloatingTruffle({ position, scale, speed, color }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialY + Math.sin(time * speed + 1.2) * 0.35
    meshRef.current.rotation.y += 0.004 * speed
    meshRef.current.rotation.x += 0.002 * speed
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.15}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function FloatingMacaron({ position, scale, speed, color }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialY + Math.sin(time * speed + 2.4) * 0.3
    meshRef.current.rotation.y += 0.005 * speed
  })

  return (
    // Macaron = two cylinders + sphere filling
    <group ref={meshRef} position={position} scale={scale}>
      {/* Top shell */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.65, 0.28, 32]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.4} />
      </mesh>
      {/* Bottom shell */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.65, 0.7, 0.28, 32]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.4} />
      </mesh>
      {/* Cream filling */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.68, 0.68, 0.12, 32]} />
        <meshStandardMaterial color="#F5ECD7" metalness={0} roughness={0.6} />
      </mesh>
    </group>
  )
}

function FloatingBread({ position, scale, speed }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialY + Math.sin(time * speed + 0.8) * 0.45
    meshRef.current.rotation.y += 0.003 * speed
    meshRef.current.rotation.z += 0.001 * speed
  })

  return (
    // Bread = distorted sphere (organic shape)
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#C8934A"
        metalness={0.05}
        roughness={0.85}
        // Slight color variation for crust feel
      />
    </mesh>
  )
}

function FloatingCroissant({ position, scale, speed }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialY + Math.sin(time * speed + 3.0) * 0.38
    meshRef.current.rotation.y += 0.004 * speed
    meshRef.current.rotation.x += 0.001 * speed
  })

  return (
    // Croissant = curved torus segment
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <torusGeometry args={[0.8, 0.32, 16, 32, Math.PI * 1.3]} />
      <meshStandardMaterial
        color="#D4943A"
        metalness={0.08}
        roughness={0.7}
      />
    </mesh>
  )
}

// Gold chocolate drip sphere
function FloatingChocolateBall({ position, scale, speed }) {
  const meshRef = useRef()
  const initialY = position[1]

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.position.y = initialY + Math.sin(time * speed + 1.8) * 0.5
    meshRef.current.rotation.y += 0.006 * speed
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#C9A84C"
        metalness={0.9}
        roughness={0.1}
        emissive="#8B6914"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// ── Main export — arranges all pastries in the scene ──
export default function FloatingPastries() {
  return (
    <group>
      {/* ── DONUTS ── */}
      <FloatingDonut position={[-6, 2, -4]}   scale={0.8}  speed={0.6} color="#3B1A08" />
      <FloatingDonut position={[7, 3, -6]}    scale={0.6}  speed={0.8} color="#C9A84C" />
      <FloatingDonut position={[-9, -1, -8]}  scale={1.0}  speed={0.5} color="#1a0800" />
      <FloatingDonut position={[4, 5, -3]}    scale={0.5}  speed={0.9} color="#8B6914" />

      {/* ── TRUFFLES ── */}
      <FloatingTruffle position={[5, 1, -2]}    scale={0.5}  speed={0.7} color="#1a0800" />
      <FloatingTruffle position={[-4, 4, -5]}   scale={0.7}  speed={0.5} color="#3B1A08" />
      <FloatingTruffle position={[9, -2, -7]}   scale={0.4}  speed={1.0} color="#C9A84C" />

      {/* ── MACARONS ── */}
      <FloatingMacaron position={[-7, 3, -3]}  scale={0.6}  speed={0.65} color="#E8C97A" />
      <FloatingMacaron position={[6, -1, -5]}  scale={0.8}  speed={0.55} color="#C9A84C" />
      <FloatingMacaron position={[2, 5, -6]}   scale={0.5}  speed={0.75} color="#F5ECD7" />

      {/* ── BREADS ── */}
      <FloatingBread position={[-5, -2, -6]}  scale={[1.4, 0.9, 1.1]} speed={0.4} />
      <FloatingBread position={[8, 2, -8]}    scale={[1.1, 0.8, 0.9]} speed={0.55} />

      {/* ── CROISSANTS ── */}
      <FloatingCroissant position={[-3, 1, -3]}  scale={1.0}  speed={0.6} />
      <FloatingCroissant position={[3, -2, -4]}  scale={0.8}  speed={0.7} />
      <FloatingCroissant position={[-8, 4, -7]}  scale={1.2}  speed={0.45} />

      {/* ── GOLD BALLS ── */}
      <FloatingChocolateBall position={[1, 3, -2]}    scale={0.3}  speed={1.1} />
      <FloatingChocolateBall position={[-2, -3, -3]}  scale={0.25} speed={0.9} />
      <FloatingChocolateBall position={[10, 1, -9]}   scale={0.4}  speed={0.8} />
      <FloatingChocolateBall position={[-10, 2, -10]} scale={0.35} speed={0.7} />
    </group>
  )
}
