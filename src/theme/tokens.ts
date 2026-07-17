/**
 * Design tokens. The actual CSS variables live in `src/styles.css`.
 * Import from here when you need a token in TypeScript (e.g. Chart.js colors).
 */
export const tokens = {
  radius: { sm: 4, md: 6, lg: 10, xl: 14 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  chart: {
    palette: [
      "#3b82f6", // primary blue
      "#10b981", // success green
      "#f59e0b", // warning amber
      "#ef4444", // destructive red
      "#8b5cf6", // accent violet
      "#06b6d4", // info cyan
    ],
    primary: "#3b82f6",
    primarySoft: "rgba(59, 130, 246, 0.15)",
  },
} as const;
