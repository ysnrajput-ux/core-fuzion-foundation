import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">403</p>
        <h1 className="text-2xl font-semibold tracking-tight">Unauthorized</h1>
        <p className="text-sm text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <Link to={ROUTES.app.dashboard}>
          <Button>Return to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
