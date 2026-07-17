import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import { FullPageLoader } from "@/components/feedback/FullPageLoader";

/** Redirects authenticated users away from auth pages. */
export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <FullPageLoader />;
  if (isAuthenticated) return <Navigate to={ROUTES.app.dashboard} replace />;
  return <Outlet />;
}
