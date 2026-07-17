import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/constants/routes";
import type { UserRole } from "@/types/user";
import { FullPageLoader } from "@/components/feedback/FullPageLoader";

interface Props {
  roles?: UserRole[];
}

/**
 * Wrap authenticated segments of the tree. Optionally restrict by role.
 * Use as an `element` on a parent <Route> so children render via <Outlet />.
 */
export function ProtectedRoute({ roles }: Props) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader label="Loading your workspace…" />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.auth.login}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  if (roles && role && !roles.includes(role)) {
    return <Navigate to={ROUTES.errors.unauthorized} replace />;
  }

  return <Outlet />;
}
