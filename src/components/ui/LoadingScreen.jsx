'use client'

// LoadingScreen.jsx
// Cinematic intro that plays before the 3D scene is ready.
// Shows a gold animated logo, then fades out revealing the scene.

import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef()
  const progressRef  = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18
      if (current >= 100) {
        current = 100
        clearInterval(interval)

        // Wait then fade out
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.opacity  = '0'
            containerRef.current.style.transform = 'scale(1.05)'
          }
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 1000)
        }, 600)
      }
      setProgress(Math.min(Math.floor(current), 100))
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      {/* Animated gold ring */}
      <div style={{
        width: '120px',
        height: '120px',
        border: '1px solid rgba(201,168,76,0.2)',
        borderTop: '1px solid var(--color-gold)',
        borderRadius: '50%',
        animation: 'spinRing 1.5s linear infinite',
        marginBottom: '48px',
        position: 'relative',
      }}>
        {/* Inner ring */}
        <div style={{
          position: 'absolute',
          inset: '12px',
          border: '1px solid rgba(201,168,76,0.1)',
          borderBottom: '1px solid var(--color-gold)',
          borderRadius: '50%',
          animation: 'spinRing 2s linear infinite reverse',
        }} />
      </div>

      {/* Logo */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(48px, 8vw, 80px)',
        fontWeight: '300',
        color: 'var(--color-cream)',
        letterSpacing: '-1px',
        marginBottom: '8px',
      }}>
        PAIN<span style={{ color: 'var(--color-gold)' }}>.</span>COM
      </h1>

      {/* Tagline */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '6px',
        color: 'var(--color-gold)',
        opacity: 0.6,
        textTransform: 'uppercase',
        marginBottom: '64px',
      }}>
        Luxury Moroccan Bakery
      </p>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'rgba(201,168,76,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0,
          height: '100%',
          width: progress + '%',
          background: 'var(--color-gold)',
          transition: 'width 0.15s ease',
          boxShadow: '0 0 10px var(--color-gold)',
        }} />
      </div>

      {/* Progress number */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '4px',
        color: 'var(--color-cream)',
        opacity: 0.3,
        marginTop: '16px',
      }}>
        {progress}%
      </p>
    </div>
  )
}