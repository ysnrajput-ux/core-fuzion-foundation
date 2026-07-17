/**
 * Firebase initialization.
 *
 * The SDK is initialized lazily and only once. If Firebase env vars are not
 * yet configured, the exported handles are `null` and consumers must handle
 * the unconfigured state gracefully (see `isFirebaseConfigured`).
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getFunctions, type Functions } from "firebase/functions";

import { env, isFirebaseConfigured } from "@/config/env";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;

function ensureApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  if (app) return app;
  app = getApps()[0] ?? initializeApp(env.firebase);
  return app;
}

export function getFirebaseApp(): FirebaseApp | null {
  return ensureApp();
}

export function getFirebaseAuth(): Auth | null {
  if (auth) return auth;
  const a = ensureApp();
  if (!a) return null;
  auth = getAuth(a);
  return auth;
}

export function getDb(): Firestore | null {
  if (db) return db;
  const a = ensureApp();
  if (!a) return null;
  db = getFirestore(a);
  return db;
}

export function getStorageService(): FirebaseStorage | null {
  if (storage) return storage;
  const a = ensureApp();
  if (!a) return null;
  storage = getStorage(a);
  return storage;
}

export function getFunctionsService(): Functions | null {
  if (functions) return functions;
  const a = ensureApp();
  if (!a) return null;
  functions = getFunctions(a);
  return functions;
}

export { isFirebaseConfigured };
