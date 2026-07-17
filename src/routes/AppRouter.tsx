import { Routes, Route, Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { UnauthorizedPage } from "@/pages/errors/UnauthorizedPage";
import { SessionExpiredPage } from "@/pages/errors/SessionExpiredPage";
import { LandingPage } from "@/pages/LandingPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.auth.login} element={<LoginPage />} />
          <Route path={ROUTES.auth.register} element={<RegisterPage />} />
          <Route path={ROUTES.auth.forgotPassword} element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.app.root} element={<AppLayout />}>
          <Route index element={<Navigate to={ROUTES.app.dashboard} replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.errors.unauthorized} element={<UnauthorizedPage />} />
      <Route path={ROUTES.errors.sessionExpired} element={<SessionExpiredPage />} />
      <Route path={ROUTES.errors.notFound} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
