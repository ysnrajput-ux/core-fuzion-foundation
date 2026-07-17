/**
 * Central route registry. Import from here instead of hardcoding paths so
 * refactors touch a single file.
 */
export const ROUTES = {
  root: "/",
  marketing: {
    about: "/about",
    courses: "/courses",
    faculty: "/faculty",
    achievements: "/achievements",
    demo: "/demo",
    contact: "/contact",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    settings: "/app/settings",
  },
  errors: {
    notFound: "/404",
    unauthorized: "/403",
    sessionExpired: "/session-expired",
  },
} as const;
