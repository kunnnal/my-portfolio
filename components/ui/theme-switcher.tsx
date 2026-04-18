"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { themeModes, themePalette } from "@/lib/theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1.5 backdrop-blur-xl">
      {themeModes.map((mode) => {
        const active = theme === mode;

        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] transition ${
              active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            }`}
            aria-label={`Switch to ${themePalette[mode].label}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: themePalette[mode].primary }}
            />
            <span className="hidden lg:inline">{mode}</span>
          </button>
        );
      })}
    </div>
  );
}
