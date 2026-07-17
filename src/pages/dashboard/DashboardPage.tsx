import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/constants/roles";

export function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div>
      <PageHeader
        title={`Welcome${user?.displayName ? `, ${user.displayName}` : ""}`}
        description="Your workspace overview."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{role ? ROLE_LABELS[role] : "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Portal modules unlock in later phases.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">0 / 6</p>
            <p className="text-xs text-muted-foreground mt-1">
              Student · Teacher · Parent · Admin · CBT · Fees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Ready</p>
            <p className="text-xs text-muted-foreground mt-1">
              Architecture, auth, and design system installed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
