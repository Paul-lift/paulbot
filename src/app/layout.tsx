import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import portfolio from "@/data/portfolio.json"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: `${portfolio.personal.name} — ${portfolio.personal.role}`,
  description: portfolio.personal.tagline,
  icons: { icon: "/code.png" },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* ── Fixed background layer ─────────────────────────────────
            Dot grid + blue glow blobs.
            To change the blue: update --color-blue in globals.css.
            To tweak intensity: adjust the opacity values below.
        ─────────────────────────────────────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            /* Dot grid */
            backgroundImage:
              "radial-gradient(circle, rgba(49,59,81,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            /* Blue glow blobs — edit positions / opacity freely */
            background: [
              "radial-gradient(ellipse 55% 45% at 10% 35%,  rgba(49,59,81,0.55) 0%, transparent 100%)",
              "radial-gradient(ellipse 40% 35% at 88% 12%,  rgba(49,59,81,0.40) 0%, transparent 100%)",
              "radial-gradient(ellipse 45% 30% at 75% 88%,  rgba(49,59,81,0.35) 0%, transparent 100%)",
            ].join(","),
          }}
        />
        {children}
      </body>
    </html>
  )
}
