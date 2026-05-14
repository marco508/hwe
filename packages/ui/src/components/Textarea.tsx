import * as React from "react";
import { cn } from "../utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle outline-none transition-shadow focus-visible:shadow-focus focus-visible:border-brand-500",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
