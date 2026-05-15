'use client'

// Nebula.jsx
// Creates the deep space nebula atmosphere behind everything.
// We use a large sphere turned INSIDE OUT so we see it from the inside.
// ShaderMaterial lets us write custom GPU code for the nebula colors.

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Nebula() {
  const meshRef = useRef()

  // useMemo means this only runs ONCE — not every frame
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#0d0020') }, // deep purple
    uColor2: { value: new THREE.Color('#0d1f3c') }, // deep blue
    uColor3: { value: new THREE.Color('#1a0800') }, // deep chocolate
    uColor4: { value: new THREE.Color('#000000') }, // pure black
  }), [])

  // This runs every single frame — we animate time
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime * 0.05
  })

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      {/* Giant sphere — negative scale flips it inside out */}
      <sphereGeometry args={[400, 64, 64]} />

      <shaderMaterial
        side={THREE.BackSide}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform vec3 uColor4;

          varying vec2 vUv;
          varying vec3 vPosition;

          // Noise function — generates organic cloud-like shapes
          float noise(vec3 p) {
            return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
          }

          float smoothNoise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f); // smoothstep

            return mix(
              mix(
                mix(noise(i), noise(i + vec3(1,0,0)), f.x),
                mix(noise(i + vec3(0,1,0)), noise(i + vec3(1,1,0)), f.x),
                f.y
              ),
              mix(
                mix(noise(i + vec3(0,0,1)), noise(i + vec3(1,0,1)), f.x),
                mix(noise(i + vec3(0,1,1)), noise(i + vec3(1,1,1)), f.x),
                f.y
              ),
              f.z
            );
          }

          // Fractal noise — layers of noise for complex clouds
          float fbm(vec3 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for(int i = 0; i < 5; i++) {
              value += amplitude * smoothNoise(p);
              p *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            vec3 pos = normalize(vPosition) * 2.0 + uTime;

            float n1 = fbm(pos * 0.8);
            float n2 = fbm(pos * 1.4 + vec3(5.2, 1.3, 2.8));
            float n3 = fbm(pos * 0.5 + vec3(n1, n2, 0.0));

            // Mix the four nebula colors based on noise
            vec3 color = mix(uColor4, uColor1, n1);
            color = mix(color, uColor2, n2 * 0.6);
            color = mix(color, uColor3, n3 * 0.4);

            // Vertical fade — darker at top, chocolate glow at bottom
            float verticalFade = smoothstep(0.3, -0.5, normalize(vPosition).y);
            color = mix(color, uColor3, verticalFade * 0.5);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}