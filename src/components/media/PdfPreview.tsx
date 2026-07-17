import { FileText, ExternalLink } from "lucide-react";

import { cn } from "@/utils/cn";

interface Props {
  src: string;
  title?: string;
  className?: string;
  height?: number | string;
}

export function PdfPreview({ src, title = "Document", className, height = 600 }: Props) {
  return (
    <div className={cn("rounded-lg border border-border/60 overflow-hidden bg-card", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="size-4 text-muted-foreground" />
          <span className="font-medium truncate">{title}</span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Open
          <ExternalLink className="size-3" />
        </a>
      </div>
      <iframe src={src} title={title} className="w-full" style={{ height }} />
    </div>
  );
}
