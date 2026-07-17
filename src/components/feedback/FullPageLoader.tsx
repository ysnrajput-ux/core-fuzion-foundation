import { Loader2 } from "lucide-react";

interface Props {
  label?: string;
}

export function FullPageLoader({ label }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background text-foreground">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
