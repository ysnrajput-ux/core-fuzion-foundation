import { FirebaseError } from "firebase/app";

const FIREBASE_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "That email address is not valid.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with those credentials.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/email-already-in-use": "An account already exists with that email.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "permission-denied": "You don't have permission to perform this action.",
  unauthenticated: "Your session has expired. Please sign in again.",
};

export function toErrorMessage(err: unknown, fallback = "Something went wrong."): string {
  if (err instanceof FirebaseError) {
    return FIREBASE_MESSAGES[err.code] ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message || fallback;
  if (typeof err === "string") return err;
  return fallback;
}
