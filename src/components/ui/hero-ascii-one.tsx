"use client"

import { useEffect } from "react"

export default function AnimationPage() {
  useEffect(() => {
    const embedScript = document.createElement("script")
    embedScript.type = "text/javascript"
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    document.head.appendChild(embedScript)

    const style = document.createElement("style")
    style.textContent = `
      [data-us-project] { position: relative !important; overflow: hidden !important; }
      [data-us-project] canvas { clip-path: inset(0 0 10% 0) !important; }
      [data-us-project] * { pointer-events: none !important; }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(embedScript)
      document.head.removeChild(style)
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: "100%", height: "100%", minHeight: "100vh" }}
        />
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12">
              UIMIX
            </div>
            <div className="h-3 lg:h-4 w-px bg-white/40" />
            <span className="text-white/60 text-[8px] lg:text-[10px] font-mono">EST. 2025</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono text-white/60">
            <span>LAT: 37.7749°</span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>LONG: 122.4194°</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20" />
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20" />
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: "5vh" }} />
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: "5vh" }} />

      {/* CTA Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0" style={{ marginTop: "5vh" }}>
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative lg:ml-auto">
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white" />
              <span className="text-white text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white" />
            </div>
            <h1
              className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider whitespace-nowrap lg:-ml-[5%]"
              style={{ letterSpacing: "0.1em" }}
            >
              ENDLESS PURSUIT
            </h1>
            <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
              Like Sisyphus, we push forward — not despite the struggle, but because of it. Every
              iteration, every pixel, every line of code is our boulder.
            </p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200">
                BEGIN THE CLIMB
              </button>
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200">
                EMBRACE THE JOURNEY
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white" />
              <span className="text-white text-[9px] font-mono">SISYPHUS.PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm"
        style={{ bottom: "5vh" }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span>SYSTEM.ACTIVE</span>
            <span>V1.0.0</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
      </div>
    </main>
  )
}
