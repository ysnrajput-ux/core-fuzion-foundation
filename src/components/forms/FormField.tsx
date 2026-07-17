import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leadingIcon?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, hint, leadingIcon, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className="space-y-1.5">
        {label && <Label htmlFor={fieldId}>{label}</Label>}
        <div className="relative">
          {leadingIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leadingIcon}
            </span>
          )}
          <Input
            id={fieldId}
            ref={ref}
            aria-invalid={Boolean(error)}
            className={cn(
              leadingIcon && "pl-9",
              error && "border-destructive focus-visible:ring-destructive/40",
              className,
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-destructive">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = "FormField";
