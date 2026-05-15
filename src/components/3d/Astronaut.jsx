'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Astronaut() {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/astronaut.glb')

  useFrame((state) => {
    const time = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.3
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.15
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.06
  })

  return (
    <group ref={groupRef} position={[0, 1, 0]} scale={2.2}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/astronaut.glb')