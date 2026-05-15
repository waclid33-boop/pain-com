'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import useLenis from '@/hooks/useLenis'
import HeroText from '@/components/ui/HeroText'
import SectionReveal from '@/components/ui/SectionReveal'
import Navbar from '@/components/ui/Navbar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import FilmGrain from '@/components/ui/FilmGrain'
import ProductsSection from '@/components/sections/ProductsSection'

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })

const sectionStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '120px 48px',
}

function Divider() {
  return (
    <div style={{
      width: '1px',
      height: '80px',
      background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)',
      margin: '0 auto',
    }} />
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  useLenis()

  return (
    <>
      {/* Custom gold cursor */}
      <CustomCursor />

      {/* Film grain overlay */}
      <FilmGrain />

      {/* Loading screen — hides once complete */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* 3D Scene */}
      <Scene />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div
        id="scroll-container"
        style={{
          position: 'relative',
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        {/* ── HERO ── */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <HeroText />
        </section>

        <Divider />

        {/* ── STORY ── */}
        <section id="story" style={sectionStyle}>
          <SectionReveal
            eyebrow="Our Universe"
            title={"Where Bread\nMeets Space"}
            subtitle="Born in the heart of Morocco. Elevated to the stars. Every pastry we craft carries the warmth of ancient tradition and the precision of modern artistry."
          />
        </section>

        <Divider />

        {/* ── BREADS ── */}
        <section id="breads" style={sectionStyle}>
          <SectionReveal
            eyebrow="Moroccan Breads"
            title={"Ancient\nRecipes"}
            subtitle="Khobz, Msemen, Harcha — our breads are baked in stone ovens, using techniques passed down through generations of Moroccan master bakers."
          />
        </section>

        <Divider />

        {/* ── PASTRIES ── */}
        <section id="pastries" style={sectionStyle}>
          <SectionReveal
            eyebrow="Viennoiseries & Pastries"
            title={"Crafted\nWith Gold"}
            subtitle="Croissants layered 81 times. Macarons perfected to the gram. Pain au chocolat with single-origin Moroccan cacao. This is pastry as fine art."
          />
        </section>

        <Divider />

        {/* ── CHOCOLATES ── */}
        <section id="chocolates" style={sectionStyle}>
          <SectionReveal
            eyebrow="Chocolate Universe"
            title={"Dark.\nRich.\nEternal."}
            subtitle="Our chocolates are sourced from the finest cacao estates in the world, then reimagined through a Moroccan lens — spiced, perfumed, and elevated."
          />
        </section>

        <Divider />

        {/* ── PRODUCTS GRID ── */}
        <ProductsSection />

        <Divider />

        {/* ── CLOSING ── */}
        <section style={{ ...sectionStyle, flexDirection: 'column', gap: '48px' }}>
          <SectionReveal
            eyebrow="Begin Your Journey"
            title={"Order\nYour World"}
            subtitle="Delivered to your door. Crafted to your moment. Every box is a universe."
          />

          <button
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              letterSpacing: '6px',
              color: 'var(--color-black)',
              background: 'var(--color-gold)',
              border: 'none',
              padding: '20px 56px',
              textTransform: 'uppercase',
              cursor: 'none',
              marginTop: '16px',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--color-cream)'
              e.target.style.letterSpacing = '8px'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'var(--color-gold)'
              e.target.style.letterSpacing = '6px'
            }}
          >
            Explore the Menu
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: 'center',
          padding: '60px 48px',
          borderTop: '1px solid rgba(201,168,76,0.15)',
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            color: 'var(--color-gold)',
            letterSpacing: '4px',
            marginBottom: '16px',
          }}>
            PAIN.COM
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--color-cream)',
            opacity: 0.3,
            textTransform: 'uppercase',
          }}>
            © 2025 Pain.com — Luxury Moroccan Bakery
          </p>
        </footer>
      </div>
    </>
  )
}