import * as React from "react";
import { cn } from "../utils";

export type EnergyClassLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G";

const COLORS: Record<EnergyClassLetter, string> = {
  A: "#00a651",
  B: "#5bc049",
  C: "#c8d100",
  D: "#fce200",
  E: "#f8a005",
  F: "#e95e0f",
  G: "#d31f23",
};
// Texte lisible sur chaque couleur (le blanc n'atteint 4,5:1 que sur G).
const TEXT: Record<EnergyClassLetter, string> = { A: "#101815", B: "#101815", C: "#101815", D: "#101815", E: "#101815", F: "#101815", G: "#ffffff" };

export interface EnergyClassBadgeProps {
  value: EnergyClassLetter;
  /** Show all 7 letters with the active one highlighted (DPE strip). */
  withStrip?: boolean;
  className?: string;
}

/**
 * Stripe DPE — affiche la barre complète A→G avec la lettre active mise en
 * relief. Si `withStrip=false`, n'affiche qu'un badge carré coloré.
 */
export const EnergyClassBadge: React.FC<EnergyClassBadgeProps> = ({
  value,
  withStrip = true,
  className,
}) => {
  if (!withStrip) {
    return (
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold",
          className,
        )}
        style={{ backgroundColor: COLORS[value], color: TEXT[value] }}
      >
        {value}
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-end gap-0.5", className)}>
      {(["A", "B", "C", "D", "E", "F", "G"] as EnergyClassLetter[]).map(
        (letter, i) => {
          const isActive = letter === value;
          const baseHeight = 22 + i * 4; // hauteur croissante
          return (
            <span
              key={letter}
              className={cn(
                "rounded-sm flex items-center justify-center text-[10px] font-bold transition-transform",
                isActive ? "scale-110 ring-2 ring-offset-1 ring-ink/60" : "opacity-60",
              )}
              style={{
                backgroundColor: COLORS[letter],
                color: TEXT[letter],
                height: `${baseHeight}px`,
                width: isActive ? "28px" : "18px",
              }}
            >
              {letter}
            </span>
          );
        },
      )}
    </div>
  );
};
