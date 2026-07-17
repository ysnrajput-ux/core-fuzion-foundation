/**
 * Firebase Storage helpers with progress reporting.
 */
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  type UploadTaskSnapshot,
} from "firebase/storage";

import { getStorageService } from "@/services/firebase/firebase";

function requireStorage() {
  const s = getStorageService();
  if (!s) throw new Error("Firebase Storage is not configured.");
  return s;
}

export interface UploadOptions {
  onProgress?: (percent: number, snapshot: UploadTaskSnapshot) => void;
}

export async function uploadFile(
  path: string,
  file: File | Blob,
  options: UploadOptions = {},
): Promise<{ path: string; url: string }> {
  const storageRef = ref(requireStorage(), path);
  const task = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        options.onProgress?.(percent, snapshot);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ path, url });
      },
    );
  });
}

export async function getFileUrl(path: string): Promise<string> {
  return getDownloadURL(ref(requireStorage(), path));
}

export async function deleteFile(path: string): Promise<void> {
  await deleteObject(ref(requireStorage(), path));
}

export async function listFiles(prefix: string): Promise<string[]> {
  const res = await listAll(ref(requireStorage(), prefix));
  return res.items.map((item) => item.fullPath);
}
