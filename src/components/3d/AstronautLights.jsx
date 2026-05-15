'use client'

// AstronautLights.jsx
// Dedicated cinematic lights just for the astronaut.
// This makes the astronaut feel like the HERO of the scene.

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function AstronautLights() {
  const rimRef  = useRef()
  const fillRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    // Subtle light animation — like nebula light shifting
    rimRef.current.intensity  = 3 + Math.sin(time * 0.5) * 0.5
    fillRef.current.intensity = 1.5 + Math.sin(time * 0.3 + 1) * 0.3
  })

  return (
    <>
      {/* Key light — main illumination from top left */}
      <spotLight
        position={[-4, 6, 4]}
        target-position={[0, 0, 0]}
        intensity={8}
        color="#FFE8B0"
        angle={0.4}
        penumbra={0.6}
        castShadow
      />

      {/* Rim light — gold backlight for luxury feel */}
      <pointLight
        ref={rimRef}
        position={[3, 2, -3]}
        intensity={3}
        color="#C9A84C"
        distance={12}
      />

      {/* Blue fill — nebula atmosphere */}
      <pointLight
        ref={fillRef}
        position={[-3, 0, 3]}
        intensity={1.5}
        color="#1a0533"
        distance={10}
      />

      {/* Chocolate uplight — from the ocean below */}
      <pointLight
        position={[0, -4, 1]}
        intensity={2}
        color="#3B1A08"
        distance={10}
      />
    </>
  )
}