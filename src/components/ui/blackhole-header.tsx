"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface BlackHoleHeaderProps {
  children: React.ReactNode;
}

export function BlackHoleHeader({ children }: BlackHoleHeaderProps) {
  const { scrollY } = useScroll();
  const shaderOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Shader background — fades out on scroll */}
      <motion.div
        style={{ opacity: shaderOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <ShaderAnimation tint={[0.1, 0.3, 1.0]} />
      </motion.div>

      {/* Overlay: darkens center for text legibility, keeps edges vibrant */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 35% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom fade — blends into the rest of the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-surface))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6">
        {children}
      </div>
    </section>
  );
}
