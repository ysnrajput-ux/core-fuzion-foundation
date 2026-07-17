/**
 * Type-safe environment variable accessor.
 * All variables must be prefixed with VITE_ to be exposed to the client.
 *
 * Configure these in `.env.local` (see `.env.example`).
 */

type EnvKey =
  | "VITE_FIREBASE_API_KEY"
  | "VITE_FIREBASE_AUTH_DOMAIN"
  | "VITE_FIREBASE_PROJECT_ID"
  | "VITE_FIREBASE_STORAGE_BUCKET"
  | "VITE_FIREBASE_MESSAGING_SENDER_ID"
  | "VITE_FIREBASE_APP_ID"
  | "VITE_FIREBASE_MEASUREMENT_ID"
  | "VITE_APP_ENV"
  | "VITE_APP_NAME";

function read(key: EnvKey, fallback = ""): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export const env = {
  appName: read("VITE_APP_NAME", "Fuzion Coaching Institute"),
  appEnv: read("VITE_APP_ENV", "development") as "development" | "staging" | "production",
  firebase: {
    apiKey: read("VITE_FIREBASE_API_KEY"),
    authDomain: read("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: read("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: read("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: read("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: read("VITE_FIREBASE_APP_ID"),
    measurementId: read("VITE_FIREBASE_MEASUREMENT_ID"),
  },
} as const;

export const isFirebaseConfigured = Boolean(
  env.firebase.apiKey && env.firebase.projectId && env.firebase.appId,
);
