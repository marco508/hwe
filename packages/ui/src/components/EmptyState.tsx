import * as React from "react";
import { cn } from "../utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
  className,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border border-dashed border-border bg-surface/60 p-10 text-center overflow-hidden",
      className,
    )}
  >
    {/* Decorative blobs */}
    <span
      aria-hidden="true"
      className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-brand-200/40 dark:bg-brand-800/30 blur-2xl animate-blob-slow"
    />
    <span
      aria-hidden="true"
      className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-accent-200/40 dark:bg-accent-700/20 blur-2xl animate-blob"
    />
    <div className="relative">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-900/50 dark:to-accent-900/30 text-brand-700 dark:text-brand-300 animate-float-slow">
        {icon ?? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
        )}
      </div>
      <div className="font-display text-lg mb-1">{title}</div>
      {description && (
        <div className="text-sm text-ink-muted mb-4 max-w-md mx-auto">
          {description}
        </div>
      )}
      {action}
    </div>
  </div>
);
