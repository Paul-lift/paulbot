import FadeIn from "@/components/ui/FadeIn"
import portfolio from "@/data/portfolio.json"

export default function About() {
  const { name, bio, location, available } = portfolio.personal
  const { stats } = portfolio

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <FadeIn>
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          About
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Who I Am
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        {/* Text */}
        <FadeIn delay={0.1}>
          <p className="text-base leading-relaxed text-muted">
            {bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-muted">
              <span className="text-muted">📍</span>
              {location}
            </span>
            {available && (
              <span className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
            )}
          </div>
        </FadeIn>

        {/* Avatar placeholder */}
        <FadeIn delay={0.2} direction="left" className="flex justify-center md:justify-start">
          <div className="relative h-72 w-72">
            <div className="h-full w-full rounded-2xl border border-line bg-card flex items-center justify-center overflow-hidden">
              {/* Replace with <Image> once you have a photo */}
              <span
                className="select-none text-7xl font-bold tracking-tighter"
                style={{ color: "rgba(255,255,255,0.06)" }}
              >
                {name.split(" ").map((n) => n[0]).join("")}
              </span>
              {/* Subtle inner gradient */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 30% 40%, rgba(var(--accent-rgb),0.08), transparent 60%)",
                }}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/15 -z-10" />
          </div>
        </FadeIn>
      </div>

      {/* Stats */}
      <FadeIn delay={0.3}>
        <div className="mt-20 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card px-6 py-8 text-center">
              <p className="font-mono text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 font-mono text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
