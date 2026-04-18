"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/lib/portfolio-data";
import { useRevealAnimation } from "@/lib/use-reveal-animation";

export function SkillsSection() {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section id="skills" ref={sectionRef} className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Skills"
          title="Cloud, automation, observability"
          description="A stack shaped around modern infrastructure delivery: repeatability, containerized runtime, safe releases, and operational visibility."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.category}
              className="glass-panel group rounded-[28px] p-6 transition duration-300 hover:-translate-y-2 hover:shadow-glow"
              data-reveal
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl text-white">{group.category}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-accent">
                  Active
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-soft">{group.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="command-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div
          className="glass-panel neon-outline mt-10 overflow-hidden rounded-[28px] p-5 sm:p-6"
          data-reveal
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-sm uppercase tracking-[0.34em] text-accent">
              Terminal Snapshot
            </p>
            <p className="text-sm text-slate-400">
              Delivery pipeline mindset, represented as an execution trail.
            </p>
          </div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 px-4 py-4 font-mono text-sm text-slate-200">
            $ terraform plan && docker build . && gh workflow run deploy &&
            kubectl rollout status
          </div>
        </div>
      </div>
    </section>
  );
}
