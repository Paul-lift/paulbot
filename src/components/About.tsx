import Image from "next/image";
import { Dumbbell, Guitar, Music, type LucideIcon } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import portfolio from "@/data/portfolio.json";

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  Guitar,
  Music,
};

export default function About() {
  const { name, bio, location, available } = portfolio.personal;
  const { stats, interests, philosophy, quote } = portfolio;

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
        {/* Bio + badges */}
        <FadeIn delay={0.1}>
          <p className="text-base leading-relaxed text-muted">{bio}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-muted">
              <span>📍</span>
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
        <FadeIn
          delay={0.2}
          direction="left"
          className="flex justify-center md:justify-start"
        >
          <div className="relative h-72 w-72">
            <div className="h-full w-full rounded-2xl border border-line bg-card overflow-hidden">
              <Image
                src="/portait.png"
                alt={name}
                fill
                priority
                className="object-cover object-[center_15%] rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/15 -z-10" />
          </div>
        </FadeIn>
      </div>

      {/* Beyond the code — interests + philosophy */}
      <FadeIn delay={0.25}>
        <div className="mt-16 rounded-2xl border border-line bg-card p-8">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Beyond the code
          </span>

          {/* Interest tags */}
          {interests && interests.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {interests.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-line bg-elevated px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-primary"
                >
                  {iconMap[item.icon] &&
                    (() => {
                      const Icon = iconMap[item.icon];
                      return <Icon size={15} />;
                    })()}
                  {item.label}
                </span>
              ))}
            </div>
          )}

          {/* Philosophy / life motto */}
          {philosophy && (
            <blockquote className="mt-6 border-l-2 border-accent/40 pl-5">
              <p className="text-base italic leading-relaxed text-muted">
                {philosophy}
              </p>
            </blockquote>
          )}

          {/* Personal quote */}
          {quote && (
            <p className="mt-5 text-sm leading-relaxed text-subtle">
              {quote}
            </p>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
