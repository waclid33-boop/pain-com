'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Stars, Preload, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

import Nebula            from './Nebula'
import ChocolateOcean    from './ChocolateOcean'
import GoldenParticles   from './GoldenParticles'
import AtmosphericFog    from './AtmosphericFog'
import FloatingPastries  from './FloatingPastries'
import ScrollScene       from './ScrollScene'
import Astronaut         from './Astronaut'
import AstronautLights   from './AstronautLights'

function GlobalLights() {
  return (
    <>
      <ambientLight intensity={0.3} color="#C9A84C" />
      <directionalLight
        position={[15, 25, 10]}
        intensity={2}
        color="#FFE8B0"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <pointLight position={[0, -8, 0]}    intensity={4}   color="#3B1A08" distance={60} />
      <pointLight position={[-25, 8, -15]} intensity={2}   color="#1a0533" distance={80} />
      <pointLight position={[20, 5, -10]}  intensity={1.5} color="#0d1f3c" distance={60} />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60, near: 0.1, far: 1000 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
      }}
    >
      <Suspense fallback={null}>
        <ScrollScene />
        <GlobalLights />
        <AstronautLights />

        <Nebula />
        <Stars
          radius={300}
          depth={80}
          count={2000}
          factor={4}
          saturation={0.3}
          fade
          speed={0.3}
        />
        <ChocolateOcean />
        <GoldenParticles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 3000} />
        <AtmosphericFog />
        <FloatingPastries />
        <Astronaut />

        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.95}
            mipmapBlur
          />
        </EffectComposer>

        <Preload all />
      </Suspense>
    </Canvas>
  )
}