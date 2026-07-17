import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

export function Breadcrumbs({ className }: Props) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs", className)}>
      <ol className="flex items-center gap-1.5 text-muted-foreground">
        {parts.map((part, i) => {
          const to = "/" + parts.slice(0, i + 1).join("/");
          const isLast = i === parts.length - 1;
          return (
            <li key={to} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3" />}
              {isLast ? (
                <span className="text-foreground capitalize">{part.replace(/-/g, " ")}</span>
              ) : (
                <Link to={to} className="hover:text-foreground capitalize transition-colors">
                  {part.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
