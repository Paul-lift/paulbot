"use client"

import { motion } from "framer-motion"
import { BlackHoleHeader } from "@/components/ui/blackhole-header"
import portfolio from "@/data/portfolio.json"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const letter = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number], duration: 0.6 },
  },
}

function AnimatedName({ name }: { name: string }) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap font-bold text-primary"
      style={{
        fontSize: "clamp(4rem, 13vw, 9rem)",
        lineHeight: 0.92,
        letterSpacing: "-0.03em",
      }}
      aria-label={name}
    >
      {name.split("").map((char, i) => (
        <motion.span key={i} variants={letter} className={char === " " ? "mr-6" : ""}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Hero() {
  const { name, role, tagline, email } = portfolio.personal

  return (
    <BlackHoleHeader>
      <div className="w-full max-w-5xl">
        {/* Role label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-accent opacity-50" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {role}
          </span>
        </motion.div>

        <AnimatedName name={name} />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg"
        >
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-mono text-sm font-semibold text-surface transition-opacity duration-200 hover:opacity-80"
          >
            View Projects
            <span>→</span>
          </a>
          
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 flex items-center gap-2"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-linear-to-b from-muted/50 to-transparent"
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">scroll</span>
        </motion.div>
      </div>
    </BlackHoleHeader>
  )
}
