/**
 * Typed wrapper around Firebase Callable Cloud Functions.
 *
 * Usage:
 *   const submitCbt = callable<{ examId: string }, { score: number }>("submitCbt");
 *   const result = await submitCbt({ examId: "abc" });
 */
import { httpsCallable, type HttpsCallableOptions } from "firebase/functions";

import { getFunctionsService } from "@/services/firebase/firebase";

function requireFunctions() {
  const f = getFunctionsService();
  if (!f) throw new Error("Firebase Functions are not configured.");
  return f;
}

export function callable<TRequest = unknown, TResponse = unknown>(
  name: string,
  options?: HttpsCallableOptions,
) {
  return async (data: TRequest): Promise<TResponse> => {
    const fn = httpsCallable<TRequest, TResponse>(requireFunctions(), name, options);
    const result = await fn(data);
    return result.data;
  };
}
