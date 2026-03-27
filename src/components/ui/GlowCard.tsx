"use client"

import { useRef, useState } from "react"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ opacity: 0, x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlow({ opacity: 1, x, y })
  }

  const handleMouseLeave = () => setGlow((g) => ({ ...g, opacity: 0 }))

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-line bg-card transition-colors duration-300 hover:border-accent/30 ${className}`}
    >
      {/* Glow layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(var(--accent-rgb), 0.12) 0%, transparent 65%)`,
        }}
      />
      {children}
    </div>
  )
}
