import * as React from "react";
import { cn } from "../utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle outline-none transition-shadow focus-visible:shadow-focus focus-visible:border-brand-500",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
