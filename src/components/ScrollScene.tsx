"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform values for different stages
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
  const stage1Y = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  
  const stage2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0])
  const stage2Scale = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0.8, 1, 1.1])
  
  const stage3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0])
  const stage3Rotate = useTransform(scrollYProgress, [0.5, 0.7], [0, 360])
  
  const stage4Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1])
  const stage4Y = useTransform(scrollYProgress, [0.8, 1], [100, 0])

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const midY = useTransform(scrollYProgress, [0, 1], [0, -400])

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background layer */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="grid grid-cols-12 gap-4 opacity-10">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-accent"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stage 1: Code blocks assembling */}
        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-sm text-accent"
            >
              <div className="rounded-lg border border-line bg-background/50 p-6 backdrop-blur-sm">
                <div className="text-subtle">{'<'}</div>
                <div className="ml-4 text-primary">const developer = {'{'}</div>
                <div className="ml-8 text-muted">passion: "coding",</div>
                <div className="ml-8 text-muted">creativity: "unlimited",</div>
                <div className="ml-4 text-primary">{'}'}</div>
                <div className="text-subtle">{'/>'}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stage 2: Geometric shapes morphing */}
        <motion.div
          style={{ opacity: stage2Opacity, scale: stage2Scale, y: midY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-64 w-64">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-accent"
                style={{
                  width: `${120 + i * 40}px`,
                  height: `${120 + i * 40}px`,
                }}
                animate={{
                  rotate: [0, 180, 360],
                  borderRadius: ["20%", "50%", "20%"],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="font-mono text-2xl font-bold text-primary">CREATIVE</p>
              <p className="font-mono text-sm text-accent">SOLUTIONS</p>
            </div>
          </div>
        </motion.div>

        {/* Stage 3: Data particles flowing */}
        <motion.div
          style={{ opacity: stage3Opacity, rotate: stage3Rotate }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-96 w-96">
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2
              const radius = 150
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-accent"
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle) * (radius * 0.5),
                      Math.cos(angle) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle) * (radius * 0.5),
                      Math.sin(angle) * radius,
                    ],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              )
            })}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="text-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="font-mono text-3xl font-bold text-primary">INNOVATIVE</p>
                <p className="font-mono text-sm text-accent">TECHNOLOGY</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stage 4: Final message */}
        <motion.div
          style={{ opacity: stage4Opacity, y: stage4Y }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h2
              className="mb-4 font-mono text-6xl font-bold tracking-tight text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let&apos;s Build
            </motion.h2>
            <motion.p
              className="font-mono text-xl text-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Something Amazing Together
            </motion.p>
            <motion.div
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="#projects"
                className="rounded-lg border border-accent bg-accent px-8 py-3 font-mono text-sm font-medium text-white transition-all hover:bg-accent2"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-line px-8 py-3 font-mono text-sm font-medium text-muted transition-all hover:border-accent hover:text-primary"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            className="h-1 w-32 overflow-hidden rounded-full bg-line"
          >
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-accent"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
