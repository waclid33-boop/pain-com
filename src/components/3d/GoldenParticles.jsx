'use client'

// GoldenParticles.jsx
// Thousands of tiny golden particles floating in space.
// Each particle has a random position and drifts slowly upward.
// This creates the "luxury dust floating in the universe" feeling.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GoldenParticles({ count = 3000 }) {
  const meshRef = useRef()

  // Generate random positions ONCE — useMemo prevents regeneration
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3) // x, y, z for each particle
    const sizes     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Random spread across a large area
      positions[i3 + 0] = (Math.random() - 0.5) * 120  // x
      positions[i3 + 1] = (Math.random() - 0.5) * 60   // y
      positions[i3 + 2] = (Math.random() - 0.5) * 80   // z

      sizes[i] = Math.random() * 2.0 + 0.5
    }

    return { positions, sizes }
  }, [count])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Slowly rotate the entire particle system — feels like drifting in space
    meshRef.current.rotation.y = time * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.05
  })

return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.15}
        color="#C9A84C"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
