'use client'

// Astronaut.jsx
// A fully coded 3D astronaut built from geometric shapes.
// No external model needed — pure Three.js geometry.
// Structure:
//   - Body (rounded cylinder)
//   - Head/Helmet (sphere)
//   - Visor (gold sphere cutout)
//   - Donut helmet ring (torus)
//   - Arms (capsule-like cylinders)
//   - Legs (cylinders)
//   - Jetpack (box)
//   - Croissant accessories (torus arcs)
//   - Gold details

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Reusable materials ──────────────────────────────────────────
const suitMaterial = new THREE.MeshStandardMaterial({
  color: '#E8E0D0',
  metalness: 0.1,
  roughness: 0.6,
})

const suitDetailMaterial = new THREE.MeshStandardMaterial({
  color: '#C9A84C',
  metalness: 0.8,
  roughness: 0.2,
  emissive: '#8B6914',
  emissiveIntensity: 0.4,
})

const visorMaterial = new THREE.MeshStandardMaterial({
  color: '#C9A84C',
  metalness: 1.0,
  roughness: 0.0,
  emissive: '#C9A84C',
  emissiveIntensity: 0.6,
  transparent: true,
  opacity: 0.85,
})

const darkSuitMaterial = new THREE.MeshStandardMaterial({
  color: '#1a1a2e',
  metalness: 0.3,
  roughness: 0.5,
})

const chocolateMaterial = new THREE.MeshStandardMaterial({
  color: '#3B1A08',
  metalness: 0.2,
  roughness: 0.4,
})

// ── Body parts ──────────────────────────────────────────────────

function Helmet() {
  return (
    <group position={[0, 1.55, 0]}>
      {/* Main helmet sphere */}
      <mesh material={suitMaterial} castShadow>
        <sphereGeometry args={[0.52, 32, 32]} />
      </mesh>

      {/* Gold visor — front face */}
      <mesh position={[0, 0, 0.3]} material={visorMaterial} castShadow>
        <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      </mesh>

      {/* Donut helmet ring — the bakery detail! */}
      <mesh
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={suitDetailMaterial}
        castShadow
      >
        <torusGeometry args={[0.58, 0.07, 16, 64]} />
      </mesh>

      {/* Second smaller ring */}
      <mesh
        position={[0, 0.15, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={darkSuitMaterial}
        castShadow
      >
        <torusGeometry args={[0.54, 0.04, 12, 64]} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0.3, 0.45, 0]} material={suitDetailMaterial} castShadow>
        <cylinderGeometry args={[0.025, 0.015, 0.35, 8]} />
      </mesh>
      {/* Antenna tip ball */}
      <mesh position={[0.3, 0.64, 0]} material={suitDetailMaterial} castShadow>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
    </group>
  )
}

function Body() {
  return (
    <group position={[0, 0.6, 0]}>
      {/* Torso */}
      <mesh material={suitMaterial} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.9, 24]} />
      </mesh>

      {/* Chest panel — dark */}
      <mesh position={[0, 0.1, 0.36]} material={darkSuitMaterial} castShadow>
        <boxGeometry args={[0.4, 0.35, 0.05]} />
      </mesh>

      {/* Chest panel gold button */}
      <mesh position={[0, 0.1, 0.40]} material={suitDetailMaterial} castShadow>
        <sphereGeometry args={[0.05, 12, 12]} />
      </mesh>

      {/* Gold collar ring */}
      <mesh position={[0, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]} material={suitDetailMaterial} castShadow>
        <torusGeometry args={[0.38, 0.05, 12, 48]} />
      </mesh>

      {/* Waist ring */}
      <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]} material={suitDetailMaterial} castShadow>
        <torusGeometry args={[0.42, 0.05, 12, 48]} />
      </mesh>

      {/* Jetpack */}
      <mesh position={[0, 0.05, -0.46]} material={darkSuitMaterial} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.22]} />
      </mesh>

      {/* Jetpack thrusters */}
      <mesh position={[-0.12, -0.25, -0.5]} material={suitDetailMaterial} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.18, 12]} />
      </mesh>
      <mesh position={[0.12, -0.25, -0.5]} material={suitDetailMaterial} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.18, 12]} />
      </mesh>

      {/* Croissant badge on chest — the bakery accessory! */}
      <mesh position={[-0.15, 0.22, 0.40]} rotation={[0, 0, 0.5]} material={chocolateMaterial} castShadow>
        <torusGeometry args={[0.08, 0.03, 8, 20, Math.PI * 1.2]} />
      </mesh>
    </group>
  )
}

function Arms() {
  return (
    <group>
      {/* LEFT ARM */}
      <group position={[-0.58, 0.72, 0]} rotation={[0.2, 0, -0.3]}>
        <mesh material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.14, 0.12, 0.55, 16]} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.32, 0]} material={suitDetailMaterial} castShadow>
          <sphereGeometry args={[0.14, 12, 12]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.08, -0.65, 0.1]} rotation={[0.4, 0, 0.2]} material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.5, 16]} />
        </mesh>
        {/* Glove */}
        <mesh position={[0.14, -0.96, 0.18]} material={darkSuitMaterial} castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
      </group>

      {/* RIGHT ARM */}
      <group position={[0.58, 0.72, 0]} rotation={[-0.1, 0, 0.4]}>
        <mesh material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.14, 0.12, 0.55, 16]} />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.32, 0]} material={suitDetailMaterial} castShadow>
          <sphereGeometry args={[0.14, 12, 12]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.06, -0.65, 0.08]} rotation={[0.3, 0, -0.15]} material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.12, 0.1, 0.5, 16]} />
        </mesh>
        {/* Glove */}
        <mesh position={[-0.1, -0.96, 0.14]} material={darkSuitMaterial} castShadow>
          <sphereGeometry args={[0.13, 16, 16]} />
        </mesh>
      </group>
    </group>
  )
}

function Legs() {
  return (
    <group>
      {/* LEFT LEG */}
      <group position={[-0.2, 0.08, 0]}>
        <mesh material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.6, 16]} />
        </mesh>
        {/* Knee joint */}
        <mesh position={[0, -0.34, 0]} material={suitDetailMaterial} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.68, 0]} material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.14, 0.13, 0.55, 16]} />
        </mesh>
        {/* Boot */}
        <mesh position={[0.04, -1.02, 0.06]} material={darkSuitMaterial} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.34]} />
        </mesh>
      </group>

      {/* RIGHT LEG */}
      <group position={[0.2, 0.08, 0]}>
        <mesh material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.6, 16]} />
        </mesh>
        {/* Knee joint */}
        <mesh position={[0, -0.34, 0]} material={suitDetailMaterial} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.68, 0]} material={suitMaterial} castShadow>
          <cylinderGeometry args={[0.14, 0.13, 0.55, 16]} />
        </mesh>
        {/* Boot */}
        <mesh position={[-0.04, -1.02, 0.06]} material={darkSuitMaterial} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.34]} />
        </mesh>
      </group>
    </group>
  )
}

// ── Main Astronaut component ─────────────────────────────────────
export default function Astronaut() {
  const groupRef = useRef()
  const floatRef = useRef({ y: 0 })

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Full body floating animation
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3

    // Gentle body rotation — like drifting in zero gravity
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.15
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.06
    groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.05
  })

  return (
    <group
      ref={groupRef}
      position={[0, 0.5, 0]}
      scale={1.1}
    >
      <Helmet />
      <Body />
      <Arms />
      <Legs />
    </group>
  )
}
