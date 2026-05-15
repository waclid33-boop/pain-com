'use client'

// CustomCursor.jsx
// Replaces the default browser cursor with a luxury gold cursor.
// Two elements:
// - Small dot: snaps to cursor exactly
// - Large ring: follows with smooth lag (cinematic trail)

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    // Ring follows with lag
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      requestAnimationFrame(animate)
    }

    // Hover effects on interactive elements
    const handleMouseEnter = () => {
      ring.style.width   = '60px'
      ring.style.height  = '60px'
      ring.style.opacity = '0.6'
      ring.style.borderColor = 'var(--color-gold)'
    }

    const handleMouseLeave = () => {
      ring.style.width   = '40px'
      ring.style.height  = '40px'
      ring.style.opacity = '0.3'
      ring.style.borderColor = 'var(--color-gold)'
    }

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)
    const animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* Small dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px',
          height: '8px',
          background: 'var(--color-gold)',
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
        }}
      />

      {/* Large ring — follows with lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid var(--color-gold)',
          borderRadius: '50%',
          zIndex: 9998,
          pointerEvents: 'none',
          opacity: 0.3,
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}