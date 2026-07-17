/**
 * Repository instances for every Firestore collection.
 * Import the specific repository in feature modules.
 */
import { Repository } from "./repository";
import { COLLECTIONS } from "@/constants/collections";
import type {
  StudentProfile,
  TeacherProfile,
  ParentProfile,
  Course,
  Enrollment,
  Attendance,
  Assessment,
  Result,
  Fee,
  Payment,
  Notification,
  InstituteEvent,
  Material,
  Message,
} from "@/types/firestore";
import type { AppUser } from "@/types/user";

export const usersRepo = new Repository<AppUser>(COLLECTIONS.users);
export const studentsRepo = new Repository<StudentProfile>(COLLECTIONS.students);
export const teachersRepo = new Repository<TeacherProfile>(COLLECTIONS.teachers);
export const parentsRepo = new Repository<ParentProfile>(COLLECTIONS.parents);
export const coursesRepo = new Repository<Course>(COLLECTIONS.courses);
export const enrollmentsRepo = new Repository<Enrollment>(COLLECTIONS.enrollments);
export const attendanceRepo = new Repository<Attendance>(COLLECTIONS.attendance);
export const assessmentsRepo = new Repository<Assessment>(COLLECTIONS.assessments);
export const resultsRepo = new Repository<Result>(COLLECTIONS.results);
export const feesRepo = new Repository<Fee>(COLLECTIONS.fees);
export const paymentsRepo = new Repository<Payment>(COLLECTIONS.payments);
export const notificationsRepo = new Repository<Notification>(COLLECTIONS.notifications);
export const eventsRepo = new Repository<InstituteEvent>(COLLECTIONS.events);
export const materialsRepo = new Repository<Material>(COLLECTIONS.materials);
export const messagesRepo = new Repository<Message>(COLLECTIONS.messages);
