"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (n: number) => string;
  label?: string;
  className?: string;
}

/**
 * Two-thumb range slider with a gradient filled track and labels.
 * Uses two stacked native <input type="range"> elements so it stays
 * accessible and dependency-free. Thumb styling lives in styles.css
 * (`.range-thumb` class).
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue = (n) => n.toString(),
  label,
  className,
}) => {
  const [lo, hi] = value;

  const setLo = (v: number) => {
    const clamped = Math.min(v, hi - step);
    onChange([clamped, hi]);
  };
  const setHi = (v: number) => {
    const clamped = Math.max(v, lo + step);
    onChange([lo, clamped]);
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  const loPct = pct(lo);
  const hiPct = pct(hi);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-ink">{label}</span>
          <span className="text-ink-muted tabular-nums">
            {formatValue(lo)} <span className="text-ink-subtle">–</span>{" "}
            {formatValue(hi)}
          </span>
        </div>
      )}

      <div className="relative h-9 select-none">
        {/* Background track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full bg-border" />
        {/* Active track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />

        {/* Low thumb */}
        <input
          type="range"
          aria-label={tUi("ui.minimum")}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Number(e.target.value))}
          className="range-thumb absolute inset-0 w-full bg-transparent appearance-none pointer-events-none"
        />
        {/* High thumb */}
        <input
          type="range"
          aria-label={tUi("ui.maximum")}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Number(e.target.value))}
          className="range-thumb absolute inset-0 w-full bg-transparent appearance-none pointer-events-none"
        />
      </div>
    </div>
  );
};
