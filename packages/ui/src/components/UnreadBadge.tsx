import * as React from "react";
import { cn } from "../utils";

export interface UnreadBadgeProps {
  count: number;
  className?: string;
  /** Display style — "dot" (just a colored dot) or "pill" (with count). */
  variant?: "pill" | "dot";
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({
  count,
  className,
  variant = "pill",
}) => {
  if (!count || count <= 0) return null;
  if (variant === "dot") {
    return (
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full bg-red-500 shadow-[0_0_0_2px_rgba(255,255,255,0.9)]",
          className,
        )}
        aria-label={`${count} non lu`}
      />
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold leading-none",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
