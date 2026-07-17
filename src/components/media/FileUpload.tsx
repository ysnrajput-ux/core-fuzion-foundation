import { useRef, useState } from "react";
import { Upload, File as FileIcon, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface Props {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({ onFiles, accept, multiple, className, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    setFiles(arr);
    onFiles(arr);
  };

  return (
    <div className={className}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
          "border-border/60 hover:border-primary/40 hover:bg-accent/40",
          dragging && "border-primary bg-accent/60",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Upload className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium">Drop files here or click to browse</p>
        <p className="text-xs text-muted-foreground">
          {accept ? `Accepted: ${accept}` : "Any file type"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-md border border-border/60 p-2 text-sm"
            >
              <FileIcon className="size-4 text-muted-foreground" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-xs text-muted-foreground">
                {(f.size / 1024).toFixed(1)} KB
              </span>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const next = files.filter((_, idx) => idx !== i);
                  setFiles(next);
                  onFiles(next);
                }}
              >
                <X className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
