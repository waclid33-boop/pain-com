'use client'

// ProductCard.jsx
// A luxury 3D product card with:
// - Tilt effect on mouse hover
// - Gold shimmer overlay
// - Cinematic entrance animation
// - Premium typography

import { useRef, useEffect } from 'react'

export default function ProductCard({ name, description, price, emoji, index }) {
  const cardRef = useRef()

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      // Mouse position relative to card center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2

      // Tilt the card based on mouse position
      card.style.transform = `
        perspective(1000px)
        rotateX(${y * -8}deg)
        rotateY(${x * 8}deg)
        translateZ(10px)
      `

      // Move shimmer highlight
      const shimmer = card.querySelector('.shimmer')
      if (shimmer) {
        shimmer.style.background = `radial-gradient(
          circle at ${(x + 1) * 50}% ${(y + 1) * 50}%,
          rgba(201,168,76,0.15) 0%,
          transparent 60%
        )`
      }
    }

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0px)
      `
      const shimmer = card.querySelector('.shimmer')
      if (shimmer) shimmer.style.background = 'transparent'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Staggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0px) perspective(1000px)'
            }, index * 120)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(201,168,76,0.2)',
        padding: '48px 36px',
        cursor: 'pointer',
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 0.9s ease, transform 0.6s ease',
        backdropFilter: 'blur(10px)',
        willChange: 'transform',
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          transition: 'background 0.1s ease',
        }}
      />

      {/* Gold corner accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '40px', height: '40px',
        borderTop: '1px solid var(--color-gold)',
        borderLeft: '1px solid var(--color-gold)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: '40px', height: '40px',
        borderBottom: '1px solid var(--color-gold)',
        borderRight: '1px solid var(--color-gold)',
      }} />

      {/* Emoji icon */}
      <div style={{
        fontSize: '52px',
        marginBottom: '28px',
        filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))',
      }}>
        {emoji}
      </div>

      {/* Product number */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        letterSpacing: '6px',
        color: 'var(--color-gold)',
        opacity: 0.6,
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>
        {String(index + 1).padStart(2, '0')}
      </p>

      {/* Product name */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(28px, 3vw, 42px)',
        fontWeight: '300',
        color: 'var(--color-cream)',
        lineHeight: 1,
        marginBottom: '16px',
        letterSpacing: '-0.5px',
      }}>
        {name}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'var(--color-cream)',
        opacity: 0.5,
        lineHeight: 1.8,
        marginBottom: '32px',
        letterSpacing: '0.3px',
      }}>
        {description}
      </p>

      {/* Divider */}
      <div style={{
        width: '40px',
        height: '1px',
        background: 'var(--color-gold)',
        marginBottom: '24px',
        opacity: 0.5,
      }} />

      {/* Price + CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '24px',
          color: 'var(--color-gold)',
          fontWeight: '400',
        }}>
          {price}
        </span>

        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '9px',
          letterSpacing: '4px',
          color: 'var(--color-cream)',
          opacity: 0.4,
          textTransform: 'uppercase',
        }}>
          Order →
        </span>
      </div>
    </div>
  )
}