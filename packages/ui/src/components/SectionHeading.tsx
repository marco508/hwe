import * as React from "react";
import { cn } from "../utils";

export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

/**
 * Editorial-style section header. Eyebrow (small caps) +
 * display serif title + optional description, with an optional
 * right-aligned action (CTA / link).
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col gap-3",
      align === "center" && "items-center text-center mx-auto max-w-2xl",
      align === "left" &&
        action &&
        "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
      className,
    )}
  >
    <div className={cn(align === "center" ? "" : "max-w-2xl")}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="display-serif text-4xl sm:text-5xl leading-[1.05] tracking-tightest">
        {title}
      </h2>
      {description && (
        <p className="text-ink-muted mt-4 text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
