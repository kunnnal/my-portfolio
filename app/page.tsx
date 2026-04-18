import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { SystemTopbar } from "@/components/ui/system-topbar";
import { profile } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SystemTopbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />

      <footer className="section-shell pt-0">
        <div className="glass-panel rounded-[28px] px-6 py-5 text-sm text-slate-300 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {new Date().getFullYear()} {profile.name}. Built as a neon DevOps command
              center with Next.js, GSAP, Tailwind CSS, and a custom canvas telemetry layer.
            </p>
            <a className="text-accent transition hover:text-white" href="#top">
              Return to top
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
