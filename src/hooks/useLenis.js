'use client'

// useLenis.js
// This hook sets up Lenis — the smoothest scroll library available.
// It makes ALL scrolling on the site feel buttery and cinematic.

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenis() {
  useEffect(() => {
    // Create a new Lenis instance with cinematic settings
    const lenis = new Lenis({
      duration: 1.4,           // how long the scroll animation takes (seconds)
      easing: (t) =>           // custom easing curve — feels like luxury
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // This is the animation loop — runs every frame
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup when component unmounts
    return () => {
      lenis.destroy()
    }
  }, [])
}