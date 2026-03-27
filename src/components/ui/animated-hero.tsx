"use client"

import React, { useEffect, useRef, useState, ReactNode } from "react"

interface ParticleHeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: { text: string; onClick: () => void }
  secondaryButton?: { text: string; onClick: () => void }
  interactiveHint?: string
  className?: string
  particleCount?: number
  children?: ReactNode
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "FLUX",
  subtitle = "Digital Inferno",
  description = "Experience the mesmerizing dance of light and motion.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Move to Create",
  className = "",
  particleCount = 15,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 })
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [isStaticAnimation, setIsStaticAnimation] = useState(false)
  const startTimeRef = useRef(Date.now())
  const lastMouseMoveRef = useRef(Date.now())

  const rows = particleCount
  const totalParticles = rows * rows

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    container.innerHTML = ""
    particlesRef.current = []

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement("div")
      particle.className = "particle absolute rounded-full will-change-transform"

      const row = Math.floor(i / rows)
      const col = i % rows
      const centerRow = Math.floor(rows / 2)
      const centerCol = Math.floor(rows / 2)
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      )
      const scale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12)
      const opacity = Math.max(0.05, 1 - distanceFromCenter * 0.1)
      const lightness = Math.max(15, 75 - distanceFromCenter * 6)
      const glowSize = Math.max(0.5, 6 - distanceFromCenter * 0.5)

      particle.style.cssText = `
        width: 0.4rem;
        height: 0.4rem;
        left: ${col * 1.8}rem;
        top: ${row * 1.8}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: hsl(4, 85%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.2}rem 0 hsl(4, 85%, 60%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distanceFromCenter * 5)};
        transition: transform 0.05s linear;
      `
      container.appendChild(particle)
      particlesRef.current.push(particle)
    }
  }, [rows, totalParticles])

  useEffect(() => {
    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001

      if (isAutoMode) {
        const x = Math.sin(currentTime * 0.3) * 200 + Math.sin(currentTime * 0.17) * 100
        const y = Math.cos(currentTime * 0.2) * 150 + Math.cos(currentTime * 0.23) * 80
        setCursor({ x, y })
      } else if (isStaticAnimation) {
        const timeSinceLastMove = Date.now() - lastMouseMoveRef.current
        if (timeSinceLastMove > 200) {
          const animationStrength = Math.min((timeSinceLastMove - 200) / 1000, 1)
          const subtleX = Math.sin(currentTime * 1.5) * 20 * animationStrength
          const subtleY = Math.cos(currentTime * 1.2) * 16 * animationStrength
          setCursor({ x: staticCursor.x + subtleX, y: staticCursor.y + subtleY })
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isAutoMode, isStaticAnimation, staticCursor])

  useEffect(() => {
    particlesRef.current.forEach((particle, i) => {
      const row = Math.floor(i / rows)
      const col = i % rows
      const centerRow = Math.floor(rows / 2)
      const centerCol = Math.floor(rows / 2)
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      )
      const delay = distanceFromCenter * 8
      const originalScale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12)
      const dampening = Math.max(0.3, 1 - distanceFromCenter * 0.08)

      setTimeout(() => {
        const moveX = cursor.x * dampening
        const moveY = cursor.y * dampening
        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`
        particle.style.transition = `transform ${120 + distanceFromCenter * 20}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      }, delay)
    })
  }, [cursor, rows])

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = "touches" in e ? e.touches[0] : e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const newCursor = {
      x: (event.clientX - centerX) * 0.8,
      y: (event.clientY - centerY) * 0.8,
    }

    setCursor(newCursor)
    setStaticCursor(newCursor)
    setIsAutoMode(false)
    setIsStaticAnimation(false)
    lastMouseMoveRef.current = Date.now()

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsStaticAnimation(true)
    }, 500)

    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 4000) {
        setIsAutoMode(true)
        setIsStaticAnimation(false)
        startTimeRef.current = Date.now()
      }
    }, 4000)
  }

  return (
    <section
      className={`relative w-full min-h-screen bg-black overflow-hidden ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Particle animation background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{ width: `${rows * 1.8}rem`, height: `${rows * 1.8}rem` }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {children ? (
          children
        ) : (
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8">
              <span className="bg-linear-to-b from-red-300 via-red-500 to-red-800 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-thin text-red-200/90 tracking-[0.2em] uppercase mb-4">
              {subtitle}
            </h2>
            <div className="w-24 h-px bg-linear-to-r from-transparent via-red-400 to-transparent mx-auto mb-12" />
            {description && (
              <p className="text-lg text-red-100/60 font-light max-w-3xl mx-auto leading-relaxed mb-16">
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {primaryButton && (
                <button
                  onClick={primaryButton.onClick}
                  className="group relative px-12 py-6 bg-transparent border border-red-500/30 hover:border-red-400 text-red-200 hover:text-white font-medium text-lg tracking-wider uppercase transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10">{primaryButton.text}</span>
                  <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-500/20 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              )}
              {secondaryButton && (
                <button
                  onClick={secondaryButton.onClick}
                  className="px-8 py-4 border-2 border-white/20 hover:border-red-400 text-white hover:text-red-400 font-semibold rounded-full transition-all duration-300"
                >
                  {secondaryButton.text}
                </button>
              )}
            </div>
            {interactiveHint && (
              <div className="flex items-center justify-center gap-6 text-red-400/40 text-sm uppercase tracking-[0.3em] mt-8">
                <div className="w-12 h-px bg-linear-to-r from-transparent to-red-500/30" />
                <span className="animate-pulse">{interactiveHint}</span>
                <div className="w-12 h-px bg-linear-to-l from-transparent to-red-500/30" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  )
}
