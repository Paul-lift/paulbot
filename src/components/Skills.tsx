import FadeIn from "@/components/ui/FadeIn"
import portfolio from "@/data/portfolio.json"

export default function Skills() {
  const { skills } = portfolio

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          Skills
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-primary md:text-5xl">
          What I Work With
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {Object.entries(skills).map(([category, items], i) => (
          <FadeIn key={category} delay={i * 0.1}>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
