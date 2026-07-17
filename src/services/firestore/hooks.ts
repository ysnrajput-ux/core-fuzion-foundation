/**
 * React hooks for Firestore subscriptions with loading and error states.
 */
import { useEffect, useState } from "react";

import { Repository, type QueryFilter } from "./repository";

interface SubscriptionState<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
}

export function useCollection<T extends { id: string }>(
  repo: Repository<T>,
  constraints: QueryFilter[] = [],
  enabled = true,
): SubscriptionState<T> {
  const [state, setState] = useState<SubscriptionState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    const unsub = repo.subscribeToCollection(
      constraints,
      (data) => setState({ data, loading: false, error: null }),
      (error) => setState({ data: null, loading: false, error }),
    );
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, JSON.stringify(constraints.map((c) => String(c)))]);

  return state;
}

interface DocumentState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDocument<T extends { id: string }>(
  repo: Repository<T>,
  id: string | null | undefined,
): DocumentState<T> {
  const [state, setState] = useState<DocumentState<T>>({
    data: null,
    loading: Boolean(id),
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState({ data: null, loading: true, error: null });
    const unsub = repo.subscribe(id, (data) =>
      setState({ data, loading: false, error: null }),
    );
    return () => unsub();
  }, [repo, id]);

  return state;
}
