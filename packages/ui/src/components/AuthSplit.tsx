"use client";

import * as React from "react";
import { cn } from "../utils";
import { Icon, type IconName } from "./Icon";
import { Photo, type PhotoId } from "./Photos";

export interface AuthSplitProps {
  /** Formulaire (colonne de gauche). */
  children: React.ReactNode;
  photo: PhotoId;
  /** Accroche sur la photo. */
  title: React.ReactNode;
  /** Trois arguments courts. */
  points: { icon: IconName; text: string }[];
  className?: string;
}

/**
 * Pages d'authentification en deux colonnes : formulaire à gauche, photo et
 * arguments à droite. Sous lg, la photo devient un bandeau compact au-dessus
 * des arguments (repliés en liste discrète) pour garder le formulaire en tête.
 */
export function AuthSplit({ children, photo, title, points, className }: AuthSplitProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 lg:gap-12 items-stretch",
        className,
      )}
    >
      <div className="min-w-0 flex flex-col justify-center lg:py-6">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>

      <aside className="relative min-w-0 overflow-hidden rounded-3xl ring-1 ring-border/60 bg-brand-950 hidden lg:block min-h-[560px]">
        <Photo
          id={photo}
          sizes="(min-width: 1024px) 50vw, 1px"
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/35 to-brand-950/5" />
        <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10 text-cream-50">
          <p className="display-serif text-3xl xl:text-4xl leading-[1.1] max-w-md">{title}</p>
          <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-cream-100/95">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm shrink-0">
                  <Icon name={p.icon} size={16} />
                </span>
                <span className="pt-1.5 leading-snug">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile / tablette : arguments sous le formulaire, sans photo lourde. */}
      <ul className="lg:hidden grid gap-2 max-w-md w-full mx-auto">
        {points.map((p, i) => (
          <li key={i} className="flex items-center gap-3 rounded-xl border border-border/70 bg-surface/70 px-3 py-2.5 text-sm text-ink-muted">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 shrink-0">
              <Icon name={p.icon} size={16} />
            </span>
            <span className="min-w-0 [overflow-wrap:anywhere]">{p.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
