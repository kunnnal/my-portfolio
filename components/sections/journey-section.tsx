"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/lib/portfolio-data";
import { useRevealAnimation } from "@/lib/use-reveal-animation";

export function JourneySection() {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section id="journey" ref={sectionRef} className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Journey"
          title="A progression from systems fundamentals to delivery automation"
          description="The path has been practical: Linux basics, AWS labs, infrastructure as code, container orchestration, then CI/CD and observability."
        />

        <div className="relative mt-14 pl-6 sm:pl-10">
          <div className="absolute bottom-0 left-1 top-0 w-px bg-gradient-to-b from-accent/80 via-accent/30 to-transparent sm:left-3" />

          <div className="space-y-8">
            {journey.map((entry) => (
              <article
                key={entry.title}
                className="relative"
                data-reveal
              >
                <div className="absolute left-[-1.1rem] top-7 h-4 w-4 rounded-full border border-accent/70 bg-black shadow-glow sm:left-[-1.65rem]" />
                <div className="glass-panel rounded-[28px] p-6 sm:p-7">
                  <p className="font-display text-xs uppercase tracking-[0.34em] text-accent">
                    {entry.period}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-white">
                    {entry.title}
                  </h3>
                  <p className="mt-4 leading-7 text-text-soft">{entry.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.markers.map((marker) => (
                      <span key={marker} className="command-pill">
                        {marker}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
