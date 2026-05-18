import * as React from "react";
import { cn } from "../utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-surface/90 px-3 text-sm text-ink outline-none",
        "transition-all duration-200",
        "focus-visible:shadow-focus focus-visible:border-brand-500 focus-visible:bg-surface",
        "hover:border-ink/25",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
