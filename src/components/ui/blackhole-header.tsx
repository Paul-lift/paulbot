"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface BlackHoleHeaderProps {
  children: React.ReactNode
}

export function BlackHoleHeader({ children }: BlackHoleHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Scroll-based transforms
  const rotation = useTransform(scrollY, [0, 1000], [0, 360])
  const scale = useTransform(scrollY, [0, 500], [1, 1.3])
  const opacity = useTransform(scrollY, [0, 400], [0.9, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Black Hole */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[10%]">
        <motion.div
          style={{ rotate: rotation, scale, opacity }}
          className="relative h-[500px] w-[500px]"
        >
          {/* Accretion disk rings */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `${200 + i * 60}px`,
                height: `${200 + i * 60}px`,
                borderColor: `rgba(220, 38, 38, ${0.3 - i * 0.05})`,
                borderWidth: `${3 - i * 0.4}px`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: {
                  duration: 20 - i * 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Event horizon - dark center */}
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-2xl" />
          
          {/* Red glow core */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/30 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Outer red glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Particles being sucked in */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            const radius = 180
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-red-400/60"
                style={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                }}
                animate={{
                  x: [Math.cos(angle) * radius, 0],
                  y: [Math.sin(angle) * radius, 0],
                  opacity: [0.8, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: i * 0.2,
                }}
              />
            )
          })}
        </motion.div>
      </div>

      {/* Starfield background */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6">
        {children}
      </div>
    </section>
  )
}
