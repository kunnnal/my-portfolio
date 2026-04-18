"use client";

import { ContactForm } from "@/components/ui/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactChannels } from "@/lib/portfolio-data";
import { useRevealAnimation } from "@/lib/use-reveal-animation";

export function ContactSection() {
  const sectionRef = useRevealAnimation<HTMLElement>();

  return (
    <section id="contact" ref={sectionRef} className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Contact"
          title="Bring cloud, platform, or automation work into focus"
          description="For infrastructure builds, delivery pipelines, or platform-oriented collaboration, use the links below or send a message directly."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="glass-panel neon-outline rounded-[30px] p-7 sm:p-8" data-reveal>
            <p className="font-display text-sm uppercase tracking-[0.34em] text-accent">
              Direct Channels
            </p>
            <div className="mt-8 space-y-4">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 transition hover:border-accent/30 hover:bg-white/[0.08]"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      {channel.label}
                    </p>
                    <p className="mt-2 text-sm text-slate-100">{channel.value}</p>
                  </div>
                  <span className="text-sm text-accent">Open</span>
                </a>
              ))}
            </div>

            <div className="accent-divider mt-8" />

            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Response Mode
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Best fit for project discussions around AWS, container platforms,
                Terraform foundations, deployment automation, and monitoring strategy.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-[30px] p-7 sm:p-8" data-reveal>
            <div className="mb-8">
              <p className="font-display text-sm uppercase tracking-[0.34em] text-accent">
                Start a conversation
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Keep it brief and concrete. Problem statement, stack, and current
                friction points are enough to start.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
