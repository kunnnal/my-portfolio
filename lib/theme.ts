export const themeModes = ["blue", "green", "red"] as const;

export type ThemeMode = (typeof themeModes)[number];

export const themePalette: Record<
  ThemeMode,
  {
    label: string;
    primary: string;
    secondary: string;
    muted: string;
  }
> = {
  blue: {
    label: "Blue Neon",
    primary: "#67e8f9",
    secondary: "#2563eb",
    muted: "#93c5fd"
  },
  green: {
    label: "Green Neon",
    primary: "#34d399",
    secondary: "#22c55e",
    muted: "#86efac"
  },
  red: {
    label: "Red Neon",
    primary: "#fb7185",
    secondary: "#ef4444",
    muted: "#fda4af"
  }
};
