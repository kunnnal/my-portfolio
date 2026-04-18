import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" }
];

export function SystemTopbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl sm:px-5">
        <a
          href="#top"
          className="font-display text-sm uppercase tracking-[0.34em] text-white transition hover:text-accent"
        >
          {profile.name} Ops
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeSwitcher />
      </div>
    </div>
  );
}
