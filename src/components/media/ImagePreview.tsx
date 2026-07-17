import { useState } from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/feedback/Skeleton";

interface Props {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function ImagePreview({ src, alt, className, aspectRatio = "16 / 9" }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
      style={{ aspectRatio }}
    >
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "size-full object-cover transition-opacity",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
