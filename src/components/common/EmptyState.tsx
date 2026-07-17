import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

import { cn } from "@/utils/cn";

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 rounded-lg border border-dashed border-border/60 bg-card/40",
        className,
      )}
    >
      <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
        {icon ?? <Inbox className="size-5" />}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
