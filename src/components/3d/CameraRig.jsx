'use client'

// CameraRig.jsx
// This makes the camera follow your mouse smoothly.
// When you move the mouse left — the scene tilts right (parallax).
// This creates the feeling of LOOKING INTO a 3D world.
// useFrame runs every render frame (~60fps).

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function CameraRig() {
  // useThree gives us access to the camera and other R3F internals
  const { camera, size } = useThree()

  // We store mouse position here between frames
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  // Listen to mouse movement on the window
  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      // Convert pixel position to -1 → +1 range
      mouse.current.x = (e.clientX / size.width  - 0.5) * 2
      mouse.current.y = (e.clientY / size.height - 0.5) * 2
    }
  }

  useFrame((state, delta) => {
    // Smooth lerp (linear interpolation) toward mouse position
    // 0.05 = very smooth and slow. Higher = snappier.
    target.current.x += (mouse.current.x - target.current.x) * 0.05
    target.current.y += (mouse.current.y - target.current.y) * 0.05

    // Apply to camera position — subtle movement
    camera.position.x = target.current.x * 1.5
    camera.position.y = 2 + target.current.y * -0.8

    // Camera always looks at center of scene
    camera.lookAt(0, 0, 0)
  })

  return null // This component controls the camera — renders nothing
}
