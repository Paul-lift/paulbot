"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const NUM_STARS = 380
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const stars: Star[] = []

    const initStar = (star: Star, spread = false) => {
      star.x = (Math.random() - 0.5) * width * 3.5
      star.y = (Math.random() - 0.5) * height * 3.5
      star.z = spread ? Math.random() * width : width
      star.prevZ = star.z
    }

    for (let i = 0; i < NUM_STARS; i++) {
      const star: Star = { x: 0, y: 0, z: 0, prevZ: 0 }
      initStar(star, true)
      stars.push(star)
    }

    let rafId: number

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    const animate = () => {
      const scrollY = window.scrollY
      const speed = 0.5 + scrollY * 0.005

      // Deep space background
      ctx.fillStyle = "#050510"
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Cyan nebula bloom — upper center
      const nebula = ctx.createRadialGradient(cx, cy * 0.6, 0, cx, cy * 0.6, Math.min(width, height) * 0.5)
      nebula.addColorStop(0, "rgba(0, 140, 220, 0.05)")
      nebula.addColorStop(0.4, "rgba(0, 80, 180, 0.02)")
      nebula.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = nebula
      ctx.fillRect(0, 0, width, height)

      // Purple secondary bloom — lower left
      const nebula2 = ctx.createRadialGradient(cx * 0.4, cy * 1.5, 0, cx * 0.4, cy * 1.5, Math.min(width, height) * 0.38)
      nebula2.addColorStop(0, "rgba(100, 20, 200, 0.04)")
      nebula2.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = nebula2
      ctx.fillRect(0, 0, width, height)

      // Stars
      for (const star of stars) {
        star.prevZ = star.z
        star.z -= speed

        if (star.z <= 0) {
          initStar(star)
          continue
        }

        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * height + cy
        const px = (star.x / star.prevZ) * width + cx
        const py = (star.y / star.prevZ) * height + cy

        // Cull off-screen
        if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) {
          initStar(star)
          continue
        }

        const t = 1 - star.z / width          // 0 = far, 1 = close
        const brightness = Math.pow(t, 1.4)
        const size = Math.max(0.15, t * 2.2)

        // Streak when moving fast enough
        const streakLen = Math.hypot(sx - px, sy - py)
        if (streakLen > 2.5) {
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(sx, sy)
          // Slight cyan tint on streaks
          ctx.strokeStyle = `rgba(180, 230, 255, ${brightness * 0.4})`
          ctx.lineWidth = size * 0.35
          ctx.stroke()
        }

        // Star dot — cold blue-white
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 230, 255, ${brightness})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
}
