import * as React from "react";
import { cn } from "../utils";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand: React.ReactNode;
  audienceLabel?: string;
  right?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  audienceLabel,
  right,
  className,
  children,
  ...props
}) => (
  <header
    className={cn(
      "sticky top-0 z-30 w-full border-b border-border bg-surface/80 backdrop-blur",
      className,
    )}
    {...props}
  >
    <div className="container-app flex h-16 items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="font-display text-xl font-semibold text-brand-700 dark:text-brand-300">
          {brand}
        </div>
        {audienceLabel && (
          <span className="hidden sm:inline-block rounded-sm bg-brand-50 dark:bg-brand-900/50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800">
            {audienceLabel}
          </span>
        )}
      </div>
      <nav className="flex items-center gap-4 text-sm text-ink">{children}</nav>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  </header>
);
