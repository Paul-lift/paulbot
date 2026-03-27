"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface BlackHoleHeaderProps {
  children: React.ReactNode
}

export function BlackHoleHeader({ children }: BlackHoleHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Subtle scroll-based transforms
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Subtle animated orbs - server-safe */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: y1, opacity, scale }}
          className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl"
        />
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute right-[15%] top-[30%] h-[300px] w-[300px] rounded-full bg-accent/10 blur-2xl"
        />
      </div>

      {/* Subtle particle grid */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full opacity-30">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-accent/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6">
        {children}
      </div>
    </section>
  )
}
