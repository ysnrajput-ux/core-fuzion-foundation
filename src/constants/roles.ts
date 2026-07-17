import type { UserRole } from "@/types/user";

export const ROLES: Record<Uppercase<UserRole>, UserRole> = {
  STUDENT: "student",
  TEACHER: "teacher",
  PARENT: "parent",
  ADMIN: "admin",
};

export const ALL_ROLES: UserRole[] = ["student", "teacher", "parent", "admin"];

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
  admin: "Administrator",
};

/** Default landing route per role. Modules can extend this map. */
export const ROLE_HOME: Record<UserRole, string> = {
  student: "/app/dashboard",
  teacher: "/app/dashboard",
  parent: "/app/dashboard",
  admin: "/app/dashboard",
};
