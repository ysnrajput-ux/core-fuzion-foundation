/**
 * Firebase Auth service. UI code should prefer the `useAuth()` hook.
 */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";

import { getFirebaseAuth } from "./firebase";

function requireAuth() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured.");
  return auth;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(requireAuth(), email, password);
  return cred.user;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
): Promise<User> {
  const cred = await createUserWithEmailAndPassword(requireAuth(), email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  return cred.user;
}

export async function signOut(): Promise<void> {
  await fbSignOut(requireAuth());
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(requireAuth(), email);
}

export function subscribeToAuth(cb: (user: User | null) => void): Unsubscribe {
  const auth = getFirebaseAuth();
  if (!auth) {
    // No-op subscription when not configured.
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}
