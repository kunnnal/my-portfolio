"use client";

import { useRef } from "react";

type ProjectCardProps = {
  index: number;
  project: {
    title: string;
    description: string;
    stack: string[];
    impact: string;
    github: string;
  };
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 12;
    const rotateX = ((0.5 - y / bounds.height)) * 10;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) {
      return;
    }

    cardRef.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="glass-panel panel-noise group relative overflow-hidden rounded-[28px] p-6 transition duration-500 will-change-transform hover:border-accent/30 sm:p-7"
      style={{
        transform:
          "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb), 0.18), transparent 55%)"
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-accent">
            0{index + 1}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
            Project
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl text-white">{project.title}</h3>
        <p className="mt-4 leading-7 text-text-soft">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="command-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="accent-divider mt-8" />

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Impact</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{project.impact}</p>
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-accent transition hover:text-white"
          >
            View repository
          </a>
        </div>
      </div>
    </article>
  );
}
