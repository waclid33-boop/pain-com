'use client'

// useScrollCamera.js
// Controls the camera position based on scroll progress.
// As user scrolls down — camera flies through the scene.
// We define KEYFRAMES — positions the camera hits at scroll points.

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// These are the camera positions at each scroll section
// [x, y, z] — where the camera travels to
const CAMERA_KEYFRAMES = [
  { x: 0,   y: 2,   z: 12  }, // 0%   — start, looking at astronaut
  { x: 2,   y: 1,   z: 9   }, // 25%  — drift right, closer
  { x: -3,  y: 3,   z: 8   }, // 50%  — swing left, higher
  { x: 0,   y: -1,  z: 7   }, // 75%  — drop low, near ocean
  { x: 0,   y: 6,   z: 14  }, // 100% — pull back, wide view
]

export default function useScrollCamera(cameraRef) {
  useEffect(() => {
    if (!cameraRef?.current) return

    const camera = cameraRef.current

    // Create scroll-driven timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2, // smooth lag between scroll and animation
      }
    })

    // Animate camera through each keyframe
    CAMERA_KEYFRAMES.forEach((kf, i) => {
      tl.to(camera.position, {
        x: kf.x,
        y: kf.y,
        z: kf.z,
        duration: 1,
        ease: 'power2.inOut',
      }, i * 1)
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [cameraRef])
}