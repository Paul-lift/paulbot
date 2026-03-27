"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import portfolio from "@/data/portfolio.json"

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      ref.current.style.background = `radial-gradient(700px at ${e.clientX}px ${e.clientY}px, rgba(var(--accent-rgb), 0.06), transparent 80%)`
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-20" />
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const letter = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number], duration: 0.5 } },
}

function AnimatedName({ name }: { name: string }) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap text-6xl font-bold tracking-tight text-primary md:text-8xl"
      aria-label={name}
    >
      {name.split("").map((char, i) => (
        <motion.span key={i} variants={letter} className={char === " " ? "mr-4" : ""}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  const { name, role, tagline, email } = portfolio.personal

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24">
      <Spotlight />

      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          Hello, I&apos;m
        </motion.p>

        <AnimatedName name={name} />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-xl text-muted md:text-2xl"
        >
          {role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-6 max-w-xl text-base text-subtle leading-relaxed"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent2"
          >
            View Projects
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href={`mailto:${email}`}
            id="contact"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-medium text-muted transition-all duration-300 hover:border-accent hover:text-primary"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-subtle">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-4 w-px bg-subtle"
          />
        </div>
      </motion.div>
    </section>
  )
}
