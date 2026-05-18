import * as React from "react";
import { cn } from "../utils";

type Tone =
  | "neutral"
  | "brand"
  | "accent"
  | "success"
  | "danger"
  | "ocean"
  | "plum";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** When true, the badge gets a subtle glow halo. */
  glow?: boolean;
}

const tones: Record<Tone, string> = {
  neutral:
    "bg-background text-ink-muted border border-border dark:bg-surface dark:text-ink-muted",
  brand:
    "bg-brand-50 text-brand-700 border border-brand-100 dark:bg-brand-900/40 dark:text-brand-300 dark:border-brand-800",
  accent:
    "bg-amber-50 text-accent-700 border border-amber-100 dark:bg-amber-900/30 dark:text-accent-300 dark:border-amber-900/50",
  success:
    "bg-emerald-50 text-success border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-900/50",
  danger:
    "bg-red-50 text-danger border border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50",
  ocean:
    "bg-ocean-50 text-ocean-700 border border-ocean-100 dark:bg-ocean-900/30 dark:text-ocean-300 dark:border-ocean-700/40",
  plum:
    "bg-purple-50 text-plum-600 border border-purple-100 dark:bg-purple-900/30 dark:text-plum-400 dark:border-purple-900/50",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  tone = "neutral",
  glow = false,
  ...props
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      tones[tone],
      glow && tone === "brand" && "shadow-[0_0_18px_-2px_rgba(95,152,121,0.45)]",
      glow && tone === "accent" && "shadow-[0_0_18px_-2px_rgba(194,136,74,0.45)]",
      className,
    )}
    {...props}
  />
);
