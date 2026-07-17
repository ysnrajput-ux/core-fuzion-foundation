import type { UserRole } from "@/types/user";

export const ROLES: Record<Uppercase<UserRole>, UserRole> = {
  STUDENT: "student",
  TEACHER: "teacher",
  PARENT: "parent",
  ADMIN: "admin",
};

export const ALL_ROLES: UserRole[] = ["student", "teacher", "parent", "admin"];

/** Roles a new user can self-select during registration. Admin is excluded. */
export const SELF_REG_ROLES: UserRole[] = ["student", "teacher", "parent"];

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
  admin: "Administrator",
};

/** Default landing route per role after authentication. */
export const ROLE_HOME: Record<UserRole, string> = {
  student: "/app/dashboard",
  teacher: "/app/dashboard",
  parent: "/app/dashboard",
  admin: "/admin/dashboard",
};
