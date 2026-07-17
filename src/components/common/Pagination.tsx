import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/utils/cn";

interface Props {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, onChange, className }: Props) {
  if (pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-between gap-2 text-sm", className)}
    >
      <p className="text-muted-foreground text-xs">
        Page {page} of {pageCount}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => onChange(page - 1)}
          className="inline-flex size-8 items-center justify-center rounded-md border border-input hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => onChange(page + 1)}
          className="inline-flex size-8 items-center justify-center rounded-md border border-input hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  );
}
