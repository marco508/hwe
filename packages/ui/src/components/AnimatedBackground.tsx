import * as React from "react";
import { cn } from "../utils";

type Variant = "aurora" | "mesh" | "grid" | "blobs" | "soft";

export interface AnimatedBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  /** Children rendered above the background. */
  children?: React.ReactNode;
  /** Force a min height (defaults to none). */
  minH?: string;
}

/**
 * Decorative animated background wrapper.
 *
 * - `aurora`: animated blurred color blobs (default, very alive)
 * - `mesh`   : slowly panning multi-color radial gradient
 * - `grid`   : faded dotted/line grid for editorial sections
 * - `blobs`  : 3 floating colored circles, calmer
 * - `soft`   : just a gentle tinted backdrop, no animation
 */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = "aurora",
  className,
  children,
  minH,
  style,
  ...rest
}) => {
  const base = "relative w-full overflow-hidden";

  return (
    <div
      className={cn(base, className)}
      style={{ minHeight: minH, ...style }}
      {...rest}
    >
      {variant === "aurora" && <AuroraLayer />}
      {variant === "mesh" && <MeshLayer />}
      {variant === "grid" && <GridLayer />}
      {variant === "blobs" && <BlobsLayer />}
      {variant === "soft" && <SoftLayer />}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

function AuroraLayer() {
  return (
    <div className="aurora-bg absolute inset-0 -z-0" aria-hidden="true" />
  );
}

function MeshLayer() {
  return (
    <div
      className="mesh-bg absolute inset-0 -z-0"
      aria-hidden="true"
    />
  );
}

function GridLayer() {
  return (
    <div className="bg-grid absolute inset-0 -z-0" aria-hidden="true" />
  );
}

function SoftLayer() {
  return (
    <div
      className="absolute inset-0 -z-0 bg-gradient-to-br from-brand-50/60 via-transparent to-accent-50/40 dark:from-brand-900/30 dark:to-accent-900/10"
      aria-hidden="true"
    />
  );
}

function BlobsLayer() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden" aria-hidden="true">
      <span className="blob-deco animate-blob bg-brand-300/60 dark:bg-brand-700/50 w-[420px] h-[420px] -top-20 -left-16" />
      <span className="blob-deco animate-blob-slow bg-accent-300/55 dark:bg-accent-600/40 w-[380px] h-[380px] top-1/3 right-[-100px]" />
      <span className="blob-deco animate-blob bg-ocean-300/50 dark:bg-ocean-700/40 w-[460px] h-[460px] bottom-[-160px] left-1/3" />
    </div>
  );
}
