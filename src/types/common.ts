export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export type Nullable<T> = T | null;
export type ID = string;

export interface Timestamped {
  createdAt?: string;
  updatedAt?: string;
}
