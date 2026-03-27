"use client"

import { useEffect, useState } from "react"
import portfolio from "@/data/portfolio.json"

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-semibold tracking-tight text-primary transition-colors hover:text-accent"
        >
          <span className="font-mono">{portfolio.personal.name.split(" ")[0].toLowerCase()}</span>
          <span className="font-mono text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile: show email CTA */}
        <a
          href="#contact"
          className="rounded-lg border border-line px-4 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-primary md:hidden"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}
