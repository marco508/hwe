import * as React from "react";
import { cn } from "../utils";

type Tone = "neutral" | "brand" | "accent" | "success" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  neutral: "bg-background text-ink-muted border border-border",
  brand: "bg-brand-50 text-brand-700 border border-brand-100",
  accent: "bg-amber-50 text-accent-600 border border-amber-100",
  success: "bg-emerald-50 text-success border border-emerald-100",
  danger: "bg-red-50 text-danger border border-red-100",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  tone = "neutral",
  ...props
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
      tones[tone],
      className,
    )}
    {...props}
  />
);
