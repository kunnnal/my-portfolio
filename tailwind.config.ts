import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        border: "var(--border-color)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-strong": "var(--accent-strong)",
        "accent-secondary": "rgb(var(--accent-secondary-rgb) / <alpha-value>)",
        "text-soft": "var(--text-soft)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 28px rgba(var(--accent-rgb), 0.24)",
        "glow-soft": "0 0 18px rgba(var(--accent-rgb), 0.16)",
        panel:
          "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 48px rgba(0, 0, 0, 0.36)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGrid: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.55" }
        },
        shimmer: {
          "0%": { transform: "translateX(-140%)" },
          "100%": { transform: "translateX(140%)" }
        },
        scanline: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(110%)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-grid": "pulseGrid 8s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        scanline: "scanline 8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
