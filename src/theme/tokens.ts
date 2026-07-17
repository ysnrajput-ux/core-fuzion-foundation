/**
 * Design tokens. The actual CSS variables live in `src/styles.css`.
 * Import from here when you need a token in TypeScript (e.g. Chart.js colors).
 */
export const tokens = {
  radius: { sm: 4, md: 6, lg: 10, xl: 14 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  chart: {
    palette: ["#0a0a0a", "#525252", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"],
  },
} as const;
