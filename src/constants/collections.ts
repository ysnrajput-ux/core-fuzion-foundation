/**
 * Firestore collection names — single source of truth.
 */
export const COLLECTIONS = {
  users: "users",
  students: "students",
  teachers: "teachers",
  parents: "parents",
  courses: "courses",
  enrollments: "enrollments",
  attendance: "attendance",
  assessments: "assessments",
  results: "results",
  fees: "fees",
  payments: "payments",
  notifications: "notifications",
  events: "events",
  materials: "materials",
  messages: "messages",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
