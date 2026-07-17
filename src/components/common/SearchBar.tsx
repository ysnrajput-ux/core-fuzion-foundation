import { Search } from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/cn";

interface Props {
  placeholder?: string;
  onSearch?: (q: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Search…", onSearch, className }: Props) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(value);
      }}
      className={cn(
        "relative flex items-center h-9 rounded-md border border-input bg-background/50 focus-within:ring-2 focus-within:ring-ring/40 transition-all",
        className,
      )}
    >
      <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground"
      />
    </form>
  );
}
