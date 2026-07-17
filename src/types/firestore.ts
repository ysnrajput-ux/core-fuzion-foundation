import type { UserRole } from "@/types/user";

/** Base fields present on every Firestore document via the service layer. */
export interface BaseDocument {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentProfile extends BaseDocument {
  uid: string;
  rollNumber?: string;
  grade?: string;
  batch?: string;
  guardianUid?: string;
  enrolledCourses?: string[];
  status: "active" | "inactive" | "graduated";
}

export interface TeacherProfile extends BaseDocument {
  uid: string;
  subjects: string[];
  qualifications?: string;
  experienceYears?: number;
  status: "active" | "inactive";
}

export interface ParentProfile extends BaseDocument {
  uid: string;
  childUids: string[];
  phone?: string;
}

export interface Course extends BaseDocument {
  name: string;
  description?: string;
  category: string;
  duration: string;
  fee: number;
  capacity: number;
  teacherUid?: string;
  schedule?: { day: string; startTime: string; endTime: string }[];
  status: "active" | "archived";
}

export interface Enrollment extends BaseDocument {
  studentUid: string;
  courseUid: string;
  status: "pending" | "active" | "completed" | "cancelled";
  enrolledAt?: string;
}

export interface Attendance extends BaseDocument {
  studentUid: string;
  courseUid: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
}

export interface Assessment extends BaseDocument {
  courseUid: string;
  title: string;
  type: "quiz" | "test" | "exam" | "assignment";
  totalMarks: number;
  date: string;
  duration?: number;
}

export interface Result extends BaseDocument {
  studentUid: string;
  assessmentUid: string;
  marks: number;
  grade?: string;
  rank?: number;
}

export interface Fee extends BaseDocument {
  studentUid: string;
  courseUid?: string;
  amount: number;
  dueDate: string;
  status: "pending" | "partial" | "paid" | "overdue";
}

export interface Payment extends BaseDocument {
  feeUid: string;
  studentUid: string;
  amount: number;
  method: "cash" | "card" | "upi" | "bank_transfer";
  paidAt: string;
  transactionId?: string;
}

export interface Notification extends BaseDocument {
  targetUid?: string;
  targetRole?: UserRole;
  title: string;
  body: string;
  read: boolean;
}

export interface InstituteEvent extends BaseDocument {
  title: string;
  description?: string;
  date: string;
  location?: string;
  audience: UserRole | "all";
}

export interface Material extends BaseDocument {
  courseUid: string;
  title: string;
  type: "pdf" | "video" | "link" | "image";
  url: string;
  uploadedBy: string;
}

export interface Message extends BaseDocument {
  senderUid: string;
  receiverUid: string;
  body: string;
  read: boolean;
}
