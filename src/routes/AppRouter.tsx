import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { FullPageLoader } from "@/components/feedback/FullPageLoader";

// Marketing — eager (landing should be fast)
import { HomePage } from "@/pages/marketing/HomePage";
import { AboutPage } from "@/pages/marketing/AboutPage";
import { CoursesPage } from "@/pages/marketing/CoursesPage";
import { FacultyPage } from "@/pages/marketing/FacultyPage";
import { AchievementsPage } from "@/pages/marketing/AchievementsPage";
import { DemoPage } from "@/pages/marketing/DemoPage";
import { ContactPage } from "@/pages/marketing/ContactPage";

// Auth — eager (small)
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";

// App pages — lazy loaded
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage").then((m) => ({ default: m.DashboardPage })));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage").then((m) => ({ default: m.SettingsPage })));
const CoursesPageApp = lazy(() => import("@/pages/courses/CoursesPage").then((m) => ({ default: m.CoursesPage })));
const CourseDetailPage = lazy(() => import("@/pages/courses/CourseDetailPage").then((m) => ({ default: m.CourseDetailPage })));
const AttendancePage = lazy(() => import("@/pages/attendance/AttendancePage").then((m) => ({ default: m.AttendancePage })));
const TestListPage = lazy(() => import("@/pages/tests/TestListPage").then((m) => ({ default: m.TestListPage })));
const TestRunnerPage = lazy(() => import("@/pages/tests/TestRunnerPage").then((m) => ({ default: m.TestRunnerPage })));
const FeesPage = lazy(() => import("@/pages/fees/FeesPage").then((m) => ({ default: m.FeesPage })));
const NotificationsPage = lazy(() => import("@/pages/notifications/NotificationsPage").then((m) => ({ default: m.NotificationsPage })));
const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const PlaceholderPage = lazy(() => import("@/pages/PlaceholderPage").then((m) => ({ default: m.PlaceholderPage })));

// Admin pages — lazy loaded
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage })));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage").then((m) => ({ default: m.AdminUsersPage })));
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage").then((m) => ({ default: m.AdminSettingsPage })));

// Errors
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { UnauthorizedPage } from "@/pages/errors/UnauthorizedPage";
import { SessionExpiredPage } from "@/pages/errors/SessionExpiredPage";

const withSuspense = (el: React.ReactNode) => <Suspense fallback={<FullPageLoader label="Loading…" />}>{el}</Suspense>;

export function AppRouter() {
  return (
    <Routes>
      {/* Marketing */}
      <Route element={<MarketingLayout />}>
        <Route path={ROUTES.root} element={<HomePage />} />
        <Route path={ROUTES.marketing.about} element={<AboutPage />} />
        <Route path={ROUTES.marketing.courses} element={<CoursesPage />} />
        <Route path={ROUTES.marketing.faculty} element={<FacultyPage />} />
        <Route path={ROUTES.marketing.achievements} element={<AchievementsPage />} />
        <Route path={ROUTES.marketing.demo} element={<DemoPage />} />
        <Route path={ROUTES.marketing.contact} element={<ContactPage />} />
      </Route>

      {/* Auth (public-only) */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.auth.login} element={<LoginPage />} />
          <Route path={ROUTES.auth.register} element={<RegisterPage />} />
          <Route path={ROUTES.auth.forgotPassword} element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      {/* App (authenticated, any role) */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.app.root} element={<AppLayout />}>
          <Route index element={<Navigate to={ROUTES.app.dashboard} replace />} />
          <Route path="dashboard" element={withSuspense(<DashboardPage />)} />
          <Route path="settings" element={withSuspense(<SettingsPage />)} />
          <Route path="courses" element={withSuspense(<CoursesPageApp />)} />
          <Route path="courses/:courseId" element={withSuspense(<CourseDetailPage />)} />
          <Route path="attendance" element={withSuspense(<AttendancePage />)} />
          <Route path="tests" element={withSuspense(<TestListPage />)} />
          <Route path="tests/:testId" element={withSuspense(<TestRunnerPage />)} />
          <Route path="fees" element={withSuspense(<FeesPage />)} />
          <Route path="notifications" element={withSuspense(<NotificationsPage />)} />
          <Route path="profile" element={withSuspense(<ProfilePage />)} />
          <Route path="bookmarks" element={withSuspense(<PlaceholderPage title="Bookmarks" description="Your saved study materials and videos." />)} />
          <Route path="homework" element={withSuspense(<PlaceholderPage title="Homework" description="View and submit your homework assignments." />)} />
          <Route path="assignments" element={withSuspense(<PlaceholderPage title="Assignments" description="Track your assignment deadlines." />)} />
          <Route path="students" element={withSuspense(<PlaceholderPage title="Student Management" description="Manage your students and their progress." />)} />
          <Route path="reports" element={withSuspense(<PlaceholderPage title="Reports" description="Generate and view student reports." />)} />
          <Route path="analytics" element={withSuspense(<PlaceholderPage title="Analytics" description="Detailed performance analytics." />)} />
          <Route path="messages" element={withSuspense(<PlaceholderPage title="Messages" description="Communicate with teachers and parents." />)} />
        </Route>
      </Route>

      {/* Admin (admin-only, /admin) */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path={ROUTES.admin.root} element={<AdminLayout />}>
          <Route index element={<Navigate to={ROUTES.admin.dashboard} replace />} />
          <Route path="dashboard" element={withSuspense(<AdminDashboardPage />)} />
          <Route path="users" element={withSuspense(<AdminUsersPage />)} />
          <Route path="settings" element={withSuspense(<AdminSettingsPage />)} />
          <Route path="students" element={withSuspense(<PlaceholderPage title="Student Management" description="Manage all students across the institute." />)} />
          <Route path="teachers" element={withSuspense(<PlaceholderPage title="Teacher Management" description="Manage all teachers and their assignments." />)} />
          <Route path="parents" element={withSuspense(<PlaceholderPage title="Parent Management" description="Manage parent accounts and access." />)} />
          <Route path="batches" element={withSuspense(<PlaceholderPage title="Batch Management" description="Create and manage student batches." />)} />
          <Route path="courses" element={withSuspense(<PlaceholderPage title="Course Management" description="Create and manage institute courses." />)} />
          <Route path="revenue" element={withSuspense(<PlaceholderPage title="Revenue Dashboard" description="Track institute revenue and collections." />)} />
          <Route path="fees" element={withSuspense(<PlaceholderPage title="Fee Collection" description="Manage fee plans and collections." />)} />
          <Route path="notifications" element={withSuspense(<PlaceholderPage title="Notifications" description="Send institute-wide notifications." />)} />
          <Route path="analytics" element={withSuspense(<PlaceholderPage title="Institute Analytics" description="Comprehensive analytics dashboard." />)} />
          <Route path="reports" element={withSuspense(<PlaceholderPage title="Export Reports" description="Generate and export institute reports." />)} />
        </Route>
      </Route>

      {/* Errors */}
      <Route path={ROUTES.errors.unauthorized} element={<UnauthorizedPage />} />
      <Route path={ROUTES.errors.sessionExpired} element={<SessionExpiredPage />} />
      <Route path={ROUTES.errors.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
