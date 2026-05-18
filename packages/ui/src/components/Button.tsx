import * as React from "react";
import { cn } from "../utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "gradient"
  | "glass";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:shadow-focus disabled:bg-brand-300 dark:bg-brand-500 dark:hover:bg-brand-400 shadow-sm hover:shadow-glow",
  secondary:
    "bg-surface text-ink border border-border hover:border-ink/30 focus-visible:shadow-focus hover:shadow-card",
  ghost: "bg-transparent text-ink hover:bg-brand-50 dark:hover:bg-brand-900/40",
  danger: "bg-danger text-white hover:bg-red-700 shadow-sm",
  gradient:
    "text-white bg-[length:200%_200%] bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 hover:from-brand-700 hover:via-brand-600 hover:to-accent-600 shadow-md hover:shadow-glow animate-gradient-pan",
  glass:
    "glass text-ink hover:bg-white/80 dark:hover:bg-black/55 transition-colors",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all outline-none disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
