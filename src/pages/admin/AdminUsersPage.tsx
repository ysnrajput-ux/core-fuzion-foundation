import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";

export function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="User Management" description="Manage students, teachers, parents, and admins." />
      <Card>
        <CardContent className="py-16 text-center">
          <UsersIcon className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            User management table will appear here. Backend logic to be wired in next phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
