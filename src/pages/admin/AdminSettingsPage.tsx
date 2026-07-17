import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export function AdminSettingsPage() {
  return (
    <div>
      <PageHeader title="Admin Settings" description="Configure institute-wide preferences." />
      <Card>
        <CardContent className="py-16 text-center">
          <SettingsIcon className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Institute settings will appear here. Backend logic to be wired in next phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
