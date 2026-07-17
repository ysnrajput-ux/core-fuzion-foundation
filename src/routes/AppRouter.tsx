import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";

import { HomePage } from "@/pages/marketing/HomePage";
import { AboutPage } from "@/pages/marketing/AboutPage";
import { CoursesPage } from "@/pages/marketing/CoursesPage";
import { FacultyPage } from "@/pages/marketing/FacultyPage";
import { AchievementsPage } from "@/pages/marketing/AchievementsPage";
import { DemoPage } from "@/pages/marketing/DemoPage";
import { ContactPage } from "@/pages/marketing/ContactPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { UnauthorizedPage } from "@/pages/errors/UnauthorizedPage";
import { SessionExpiredPage } from "@/pages/errors/SessionExpiredPage";

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
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Admin (admin-only, /admin) */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path={ROUTES.admin.root} element={<AdminLayout />}>
          <Route index element={<Navigate to={ROUTES.admin.dashboard} replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
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
