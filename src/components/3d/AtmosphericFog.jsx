'use client'

// AtmosphericFog.jsx
// Adds layered fog rings above the chocolate ocean.
// Creates that cinematic volumetric light effect.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FogRing({ position, radius, opacity, speed, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.rotation.z = time * speed
    meshRef.current.rotation.x = Math.sin(time * speed * 0.3) * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, radius * 0.3, 3, 80]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function AtmosphericFog() {
  return (
    <group>
      {/* Multiple fog rings at different heights and sizes */}
      <FogRing position={[0, -4, 0]}  radius={18} opacity={0.04} speed={0.03}  color="#3B1A08" />
      <FogRing position={[0, -5, 0]}  radius={25} opacity={0.03} speed={-0.02} color="#1a0533" />
      <FogRing position={[0, -3, 0]}  radius={12} opacity={0.05} speed={0.05}  color="#C9A84C" />
      <FogRing position={[0, -4.5, 0]} radius={35} opacity={0.02} speed={0.01} color="#0d1f3c" />
    </group>
  )
}