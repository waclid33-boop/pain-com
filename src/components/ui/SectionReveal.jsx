'use client'

// SectionReveal.jsx
// Cinematic text reveal triggered by scroll.
// Text slides up + fades in as it enters the viewport.
// Uses Intersection Observer — no library needed.

import { useEffect, useRef } from 'react'

export default function SectionReveal({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate children in sequence
            const children = entry.target.querySelectorAll('.reveal-item')
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity    = '1'
                child.style.transform  = 'translateY(0px)'
              }, i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center'
  const color = light ? 'var(--color-cream)' : 'var(--color-cream)'

  return (
    <div
      ref={ref}
      style={{
        textAlign,
        maxWidth: '800px',
        margin: align === 'center' ? '0 auto' : '0',
        padding: '0 24px',
      }}
    >
      {eyebrow && (
        <p
          className="reveal-item"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            letterSpacing: '8px',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            marginBottom: '20px',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          {eyebrow}
        </p>
      )}

      {title && (
        <h2
          className="reveal-item"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(42px, 7vw, 110px)',
            fontWeight: '300',
            color,
            lineHeight: 0.9,
            letterSpacing: '-1px',
            marginBottom: '28px',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 1.1s ease, transform 1.1s ease',
          }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className="reveal-item"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.6vw, 17px)',
            color,
            opacity: 0,
            lineHeight: 1.8,
            letterSpacing: '1px',
            transform: 'translateY(20px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}