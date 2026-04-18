"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { profile } from "@/lib/portfolio-data";

const HeroNetworkCanvas = dynamic(
  () => import("@/components/canvas/hero-network-canvas"),
  {
    ssr: false
  }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !contentRef.current || !telemetryRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });

      timeline
        .fromTo(
          "[data-hero-intro]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }
        )
        .fromTo(
          "[data-hero-panel]",
          { autoAlpha: 0, x: 28, scale: 0.98 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.9 },
          "-=0.45"
        );
    }, sectionRef);

    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      const bounds = section.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (contentRef.current && telemetryRef.current) {
          contentRef.current.style.transform = `translate3d(${offsetX * -18}px, ${offsetY * -12}px, 0)`;
          telemetryRef.current.style.transform = `translate3d(${offsetX * 20}px, ${offsetY * 16}px, 0)`;
        }
      });
    };

    const handleLeave = () => {
      if (contentRef.current && telemetryRef.current) {
        contentRef.current.style.transform = "translate3d(0px, 0px, 0px)";
        telemetryRef.current.style.transform = "translate3d(0px, 0px, 0px)";
      }
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      context.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_36%)]" />
        <div className="absolute inset-0 opacity-90">
          <HeroNetworkCanvas />
        </div>
        <div className="scanline-overlay absolute inset-0" />
      </div>

      <div className="section-shell grid min-h-screen content-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div
          ref={contentRef}
          className="relative transition-transform duration-500 will-change-transform"
        >
          <div className="glass-panel neon-outline panel-noise relative overflow-hidden rounded-[32px] p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent" />

            <p className="section-kicker" data-hero-intro>
              Live DevOps Portfolio Instance
            </p>

            <div className="mt-6 space-y-6">
              <p
                className="font-display text-5xl font-semibold leading-none text-white text-glow sm:text-6xl xl:text-7xl"
                data-hero-intro
              >
                {profile.name}
              </p>
              <h1
                className="max-w-3xl font-display text-2xl leading-tight text-slate-100 sm:text-3xl lg:text-4xl"
                data-hero-intro
              >
                {profile.title}
              </h1>
              <p
                className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
                data-hero-intro
              >
                {profile.tagline}
              </p>
              <p
                className="max-w-2xl text-base leading-8 text-text-soft"
                data-hero-intro
              >
                {profile.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3" data-hero-intro>
              {profile.commandStrip.map((command) => (
                <span key={command} className="command-pill">
                  {command}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row" data-hero-intro>
              <a href="#projects" className="glow-button">
                View Projects
              </a>
              <a href="#contact" className="ghost-button">
                Contact Me
              </a>
              <a
                href="/kunal-devops-resume.txt"
                download
                className="ghost-button"
              >
                Download Resume
              </a>
            </div>

            <div className="accent-divider mt-10" />

            <div
              className="mt-8 grid gap-4 sm:grid-cols-3"
              data-hero-intro
            >
              {profile.focusAreas.map((focus) => (
                <div
                  key={focus}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm leading-6 text-slate-300">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={telemetryRef}
          className="relative flex items-center transition-transform duration-500 will-change-transform"
          data-hero-panel
        >
          <div className="glass-panel neon-outline relative w-full overflow-hidden rounded-[32px] p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-kicker">System Telemetry</p>
                <p className="mt-3 text-sm text-slate-300">
                  Premium engineering identity with cloud-native execution.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-accent">
                <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
                Stable
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {profile.heroSignals.map((signal, index) => (
                <div
                  key={signal.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                      {signal.label}
                    </p>
                    <span className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-base text-slate-100">{signal.value}</p>
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${72 + index * 8}%`,
                          maxWidth: "100%",
                          background:
                            "linear-gradient(90deg, rgba(var(--accent-rgb), 0.5), rgba(var(--accent-secondary-rgb), 0.85))"
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="accent-divider mt-8" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Command Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["AWS", "EKS", "Terraform", "Docker", "Prometheus", "Linux"].map(
                    (item) => (
                      <span key={item} className="command-pill">
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Deployment Flow
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Source</span>
                    <span className="text-accent">Commit</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Build</span>
                    <span className="text-accent">Containerize</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Release</span>
                    <span className="text-accent">Observe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
