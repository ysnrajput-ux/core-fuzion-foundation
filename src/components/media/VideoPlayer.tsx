import { cn } from "@/lib/utils";

interface Props {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: Props) {
  return (
    <video
      controls
      preload="metadata"
      poster={poster}
      className={cn("w-full rounded-lg bg-black aspect-video", className)}
    >
      <source src={src} />
      Your browser doesn't support HTML5 video.
    </video>
  );
}
