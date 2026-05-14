import * as React from "react";
import { cn } from "../utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className,
}) => (
  <div
    className={cn(
      "rounded-lg border border-dashed border-border bg-surface/60 p-10 text-center",
      className,
    )}
  >
    <div className="font-display text-lg mb-1">{title}</div>
    {description && (
      <div className="text-sm text-ink-muted mb-4">{description}</div>
    )}
    {action}
  </div>
);
