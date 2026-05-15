'use client'

// ScrollScene.jsx
// Connects scroll position to the 3D camera.
// useThree() gives us direct access to the camera inside the Canvas.

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollScene() {
  const { camera } = useThree()
  const scrollY = useRef(0)
  const targetCamera = useRef({ x: 0, y: 2, z: 12 })

  useEffect(() => {
    // Listen to Lenis scroll events via native scroll
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)

    // Define camera journey based on scroll %
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress // 0 to 1

        // Section 1: 0 - 0.2 — zoom in on astronaut
        if (p < 0.2) {
          const t = p / 0.2
          targetCamera.current.x = gsap.utils.interpolate(0, 2, t)
          targetCamera.current.y = gsap.utils.interpolate(2, 1, t)
          targetCamera.current.z = gsap.utils.interpolate(12, 9, t)
        }
        // Section 2: 0.2 - 0.4 — swing around left
        else if (p < 0.4) {
          const t = (p - 0.2) / 0.2
          targetCamera.current.x = gsap.utils.interpolate(2, -4, t)
          targetCamera.current.y = gsap.utils.interpolate(1, 3, t)
          targetCamera.current.z = gsap.utils.interpolate(9, 8, t)
        }
        // Section 3: 0.4 - 0.6 — descend to ocean
        else if (p < 0.6) {
          const t = (p - 0.4) / 0.2
          targetCamera.current.x = gsap.utils.interpolate(-4, 0, t)
          targetCamera.current.y = gsap.utils.interpolate(3, -1, t)
          targetCamera.current.z = gsap.utils.interpolate(8, 7, t)
        }
        // Section 4: 0.6 - 0.8 — rise up wide
        else if (p < 0.8) {
          const t = (p - 0.6) / 0.2
          targetCamera.current.x = gsap.utils.interpolate(0, 3, t)
          targetCamera.current.y = gsap.utils.interpolate(-1, 4, t)
          targetCamera.current.z = gsap.utils.interpolate(7, 10, t)
        }
        // Section 5: 0.8 - 1.0 — final pullback
        else {
          const t = (p - 0.8) / 0.2
          targetCamera.current.x = gsap.utils.interpolate(3, 0, t)
          targetCamera.current.y = gsap.utils.interpolate(4, 6, t)
          targetCamera.current.z = gsap.utils.interpolate(10, 16, t)
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame(() => {
    // Smooth lerp camera toward target — feels cinematic not jarring
    camera.position.x += (targetCamera.current.x - camera.position.x) * 0.04
    camera.position.y += (targetCamera.current.y - camera.position.y) * 0.04
    camera.position.z += (targetCamera.current.z - camera.position.z) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}