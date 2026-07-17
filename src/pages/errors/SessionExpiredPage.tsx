import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function SessionExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Session</p>
        <h1 className="text-2xl font-semibold tracking-tight">Your session expired</h1>
        <p className="text-sm text-muted-foreground">Please sign in again to continue.</p>
        <Link to={ROUTES.auth.login}>
          <Button>Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
