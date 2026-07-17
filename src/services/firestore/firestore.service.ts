/**
 * Generic Firestore CRUD helpers. Feature modules build typed repositories
 * on top of these primitives — see `src/features/*/services/*`.
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as fsLimit,
  serverTimestamp,
  onSnapshot,
  type QueryConstraint,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";

import { getDb } from "@/services/firebase/firebase";

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Firestore is not configured. Set VITE_FIREBASE_* env vars.");
  return db;
}

export async function getDocument<T = DocumentData>(
  path: string,
  id: string,
): Promise<(T & { id: string }) | null> {
  const snap = await getDoc(doc(requireDb(), path, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

export async function listDocuments<T = DocumentData>(
  path: string,
  constraints: QueryConstraint[] = [],
): Promise<Array<T & { id: string }>> {
  const q = query(collection(requireDb(), path), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function createDocument<T extends DocumentData>(
  path: string,
  data: T,
): Promise<string> {
  const ref = await addDoc(collection(requireDb(), path), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function setDocument<T extends DocumentData>(
  path: string,
  id: string,
  data: T,
  merge = true,
): Promise<void> {
  await setDoc(
    doc(requireDb(), path, id),
    { ...data, updatedAt: serverTimestamp() },
    { merge },
  );
}

export async function updateDocument<T extends Partial<DocumentData>>(
  path: string,
  id: string,
  data: T,
): Promise<void> {
  await updateDoc(doc(requireDb(), path, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(path: string, id: string): Promise<void> {
  await deleteDoc(doc(requireDb(), path, id));
}

export function subscribeToDocument<T = DocumentData>(
  path: string,
  id: string,
  callback: (data: (T & { id: string }) | null) => void,
): Unsubscribe {
  return onSnapshot(doc(requireDb(), path, id), (snap) => {
    callback(snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null);
  });
}

export function subscribeToCollection<T = DocumentData>(
  path: string,
  constraints: QueryConstraint[],
  callback: (data: Array<T & { id: string }>) => void,
): Unsubscribe {
  const q = query(collection(requireDb(), path), ...constraints);
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) })));
  });
}

export { where, orderBy, fsLimit as limit, serverTimestamp };
