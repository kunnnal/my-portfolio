"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { aboutHighlights } from "@/lib/portfolio-data";
import { useRevealAnimation } from "@/lib/use-reveal-animation";

export function AboutSection() {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="About"
          title="Engineering systems that stay calm under pressure"
          description="I treat DevOps as a systems discipline: cloud architecture, runtime consistency, and automation that removes fragile manual steps."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className="glass-panel neon-outline rounded-[30px] p-7 sm:p-9"
            data-reveal
          >
            <p className="text-lg leading-8 text-slate-200">
              I focus on hands-on infrastructure work across AWS, Terraform, Linux,
              containers, and delivery pipelines. The goal is not just to provision
              resources, but to create a platform that is easier to operate, safer to
              change, and easier for teams to trust.
            </p>
            <p className="mt-6 text-base leading-8 text-text-soft">
              My strongest interest sits where automation, scalability, and
              reliability meet. That means infrastructure as code, repeatable
              deployments, clear observability, and environments that behave
              predictably from day one.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["AWS", "Terraform", "Containers", "Reliability", "Automation"].map(
                (item) => (
                  <span key={item} className="command-pill">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid gap-5">
            {aboutHighlights.map((item) => (
              <article
                key={item.title}
                className="glass-panel rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/20"
                data-reveal
              >
                <p className="font-display text-xl text-white">{item.title}</p>
                <p className="mt-3 leading-7 text-text-soft">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
