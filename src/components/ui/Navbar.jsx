'use client'

import { useEffect, useRef } from 'react'

const navLinks = ['Breads', 'Pastries', 'Chocolates', 'Story']

export default function Navbar() {
  const navRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      if (navRef.current) {
        navRef.current.style.opacity = '1'
        navRef.current.style.transform = 'translateY(0px)'
      }
    }, 1000)

    let lastY = 0
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastY && currentY > 100) {
        navRef.current.style.transform = 'translateY(-100%)'
      } else {
        navRef.current.style.transform = 'translateY(0px)'
      }
      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        opacity: 0,
        transform: 'translateY(-20px)',
        transition: 'opacity 1s ease, transform 0.6s ease',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '22px',
        fontWeight: '400',
        color: 'var(--color-cream)',
        letterSpacing: '2px',
      }}>
        PAIN<span style={{ color: 'var(--color-gold)' }}>.</span>COM
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <a href="#breads"     style={linkStyle}>Breads</a>
        <a href="#pastries"   style={linkStyle}>Pastries</a>
        <a href="#chocolates" style={linkStyle}>Chocolates</a>
        <a href="#story"      style={linkStyle}>Story</a>
      </div>

      <button
        style={btnStyle}
        onMouseEnter={e => e.target.style.background = 'var(--color-gold-light)'}
        onMouseLeave={e => e.target.style.background = 'var(--color-gold)'}
      >
        Order Now
      </button>
    </nav>
  )
}

const linkStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '4px',
  color: 'var(--color-cream)',
  textTransform: 'uppercase',
  opacity: 0.6,
  textDecoration: 'none',
}

const btnStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  letterSpacing: '4px',
  color: 'var(--color-black)',
  background: 'var(--color-gold)',
  border: 'none',
  padding: '12px 28px',
  textTransform: 'uppercase',
  cursor: 'pointer',
}