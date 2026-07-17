export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends AppUser {
  phone?: string;
  metadata?: Record<string, unknown>;
}
