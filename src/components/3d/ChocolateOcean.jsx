'use client'

// ChocolateOcean.jsx
// A vast animated liquid chocolate surface.
// We use a plane with many vertices and move them up/down
// using sine waves in a custom shader — this creates realistic waves.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ChocolateOcean() {
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uTime:         { value: 0 },
    uColorDeep:    { value: new THREE.Color('#1a0800') }, // dark chocolate
    uColorShallow: { value: new THREE.Color('#3B1A08') }, // milk chocolate
    uColorFoam:    { value: new THREE.Color('#C9A84C') }, // gold foam peaks
    uWaveHeight:   { value: 0.6 },
    uWaveSpeed:    { value: 0.4 },
  }), [])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]} // rotate flat (plane is vertical by default)
      position={[0, -6, 0]}           // push it below the scene
      receiveShadow
    >
      {/* 
        PlaneGeometry args: [width, height, widthSegments, heightSegments]
        More segments = more vertices = smoother waves
        200 x 200 units — a vast ocean
      */}
      <planeGeometry args={[200, 200, 128, 128]} />

      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uWaveHeight;
          uniform float uWaveSpeed;

          varying float vElevation;
          varying vec2 vUv;

          void main() {
            vUv = uv;

            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            // Layer multiple sine waves for organic ocean feel
            float wave1 = sin(modelPosition.x * 0.3 + uTime * uWaveSpeed) * uWaveHeight;
            float wave2 = sin(modelPosition.y * 0.4 + uTime * uWaveSpeed * 0.8) * uWaveHeight * 0.6;
            float wave3 = sin((modelPosition.x + modelPosition.y) * 0.2 + uTime * uWaveSpeed * 1.2) * uWaveHeight * 0.4;
            float wave4 = cos(modelPosition.x * 0.15 - uTime * uWaveSpeed * 0.6) * uWaveHeight * 0.5;

            // Distance-based fade — waves calm near horizon
            float dist = length(modelPosition.xy) / 100.0;
            float fadeEdge = 1.0 - smoothstep(0.3, 1.0, dist);

            float elevation = (wave1 + wave2 + wave3 + wave4) * fadeEdge;
            modelPosition.z += elevation;

            vElevation = elevation;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorDeep;
          uniform vec3 uColorShallow;
          uniform vec3 uColorFoam;

          varying float vElevation;
          varying vec2 vUv;

          void main() {
            // Higher waves = lighter chocolate, wave tips = gold
            float mixStrength = (vElevation + 0.8) / 1.6;
            vec3 color = mix(uColorDeep, uColorShallow, mixStrength);

            // Gold foam at wave peaks
            float foamStrength = smoothstep(0.4, 0.8, vElevation);
            color = mix(color, uColorFoam, foamStrength * 0.4);

            // Edge glow near horizon
            float edgeFade = smoothstep(0.8, 1.0, length(vUv - 0.5) * 2.0);
            color = mix(color, uColorDeep, edgeFade);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}
