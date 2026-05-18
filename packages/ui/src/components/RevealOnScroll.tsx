"use client";

import * as React from "react";
import { cn } from "../utils";

export interface RevealOnScrollProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay before the reveal starts (ms). */
  delay?: number;
  /** Wrapper tag (defaults to div). */
  as?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * Lazy-reveals children once they enter the viewport.
 * Uses the `.reveal`/`.is-in` classes from styles.css.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  delay = 0,
  as: Tag = "div",
  className,
  children,
  style,
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("reveal", seen && "is-in", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
