'use client'

// HeroText.jsx
// The cinematic title that floats above the 3D scene.
// Uses CSS animations for the entrance — no library needed here.

import { useEffect, useRef } from 'react'

export default function HeroText() {
  const containerRef = useRef()

  useEffect(() => {
    // Fade in after a short delay — feels cinematic
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1'
        containerRef.current.style.transform = 'translateY(0px)'
      }
    }, 300)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -48px)',
        textAlign: 'center',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 1.8s ease, transform 1.8s ease',
        width: '100%',
        padding: '0 20px',
      }}
    >
      {/* Eyebrow label */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(9px, 1.2vw, 12px)',
        letterSpacing: '8px',
        color: 'var(--color-gold)',
        textTransform: 'uppercase',
        marginBottom: '20px',
        opacity: 0.9,
      }}>
        Luxury Moroccan Bakery
      </p>

      {/* Main title */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(64px, 13vw, 200px)',
        fontWeight: '300',
        letterSpacing: '-3px',
        color: 'var(--color-cream)',
        lineHeight: 0.85,
        textShadow: '0 0 80px rgba(201,168,76,0.3)',
      }}>
        PAIN
        <span style={{ color: 'var(--color-gold)' }}>.</span>
        <br />
        <span style={{
          fontSize: 'clamp(32px, 6vw, 96px)',
          letterSpacing: '12px',
          opacity: 0.7,
          fontWeight: '300',
        }}>
          COM
        </span>
      </h1>

      {/* Tagline */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(10px, 1.4vw, 14px)',
        letterSpacing: '5px',
        color: 'var(--color-cream)',
        opacity: 0.4,
        marginTop: '28px',
        textTransform: 'uppercase',
      }}>
        Scroll to explore the universe
      </p>

      {/* Animated scroll indicator */}
      <div style={{
        marginTop: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}
