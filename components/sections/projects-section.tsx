"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/lib/portfolio-data";
import { useRevealAnimation } from "@/lib/use-reveal-animation";

export function ProjectsSection() {
  const sectionRef = useRevealAnimation<HTMLElement>({ stagger: 0.05 });

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div className="section-shell">
        <SectionHeading
          kicker="Projects"
          title="Infrastructure projects with real deployment intent"
          description="Each project is framed around operational outcomes: reusable foundations, safer releases, container readiness, and clearer runtime behavior."
        />

        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project.title} data-reveal>
              <ProjectCard index={index} project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
