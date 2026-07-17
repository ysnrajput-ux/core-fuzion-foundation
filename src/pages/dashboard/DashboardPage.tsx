import { useAuth } from "@/context/AuthContext";
import { StudentDashboardPage } from "./StudentDashboardPage";
import { TeacherDashboardPage } from "./TeacherDashboardPage";
import { ParentDashboardPage } from "./ParentDashboardPage";

export function DashboardPage() {
  const { role } = useAuth();

  if (role === "teacher") return <TeacherDashboardPage />;
  if (role === "parent") return <ParentDashboardPage />;
  return <StudentDashboardPage />;
}
