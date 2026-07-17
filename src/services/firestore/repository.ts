/**
 * Typed repository pattern over Firestore primitives.
 * Feature modules consume these instead of raw CRUD helpers.
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
  type Timestamp,
} from "firebase/firestore";

import { getDb } from "@/services/firebase/firebase";
import type { BaseDocument } from "@/types/firestore";

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Firestore is not configured. Set VITE_FIREBASE_* env vars.");
  return db;
}

export type QueryFilter = QueryConstraint;

export class Repository<T extends BaseDocument> {
  constructor(private collectionName: string) {}

  async getById(id: string): Promise<(T & { id: string }) | null> {
    const snap = await getDoc(doc(requireDb(), this.collectionName, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as T) };
  }

  async list(constraints: QueryConstraint[] = []): Promise<Array<T & { id: string }>> {
    const q = query(collection(requireDb(), this.collectionName), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const ref = await addDoc(collection(requireDb(), this.collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  }

  async set(id: string, data: Partial<T>, merge = true): Promise<void> {
    await setDoc(
      doc(requireDb(), this.collectionName, id),
      { ...data, updatedAt: serverTimestamp() },
      { merge },
    );
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await updateDoc(doc(requireDb(), this.collectionName, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(requireDb(), this.collectionName, id));
  }

  subscribe(id: string, cb: (data: (T & { id: string }) | null) => void): Unsubscribe {
    return onSnapshot(doc(requireDb(), this.collectionName, id), (snap) => {
      cb(snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null);
    });
  }

  subscribeToCollection(
    constraints: QueryConstraint[],
    cb: (data: Array<T & { id: string }>) => void,
  onError?: (err: Error) => void,
  ): Unsubscribe {
    const q = query(collection(requireDb(), this.collectionName), ...constraints);
    return onSnapshot(
      q,
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }))),
      (err) => onError?.(err),
    );
  }
}

export function tsToDate(ts: Timestamp | string | undefined): Date | null {
  if (!ts) return null;
  if (typeof ts === "string") return new Date(ts);
  return ts.toDate();
}

export { where, orderBy, fsLimit as limit, serverTimestamp };
