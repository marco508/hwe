"use client";

import * as React from "react";
import { cn } from "../utils";
import { tUi } from "./I18nKit";

export interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  /** Contenu affiché si l'image manque ou ne se charge pas (initiales, logo…). */
  fallback?: React.ReactNode;
  /** Classes du conteneur de repli (par défaut : celles de l'image). */
  fallbackClassName?: string;
}

/**
 * <img> avec repli propre quand l'URL est vide, invalide ou en erreur
 * (plus d'icône d'image cassée).
 */
export function SafeImage({ src, alt = "", fallback, className, fallbackClassName, onError, ...rest }: SafeImageProps) {
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn(
          "inline-flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 text-brand-700 dark:text-brand-300 overflow-hidden",
          fallbackClassName ?? className,
        )}
        title={src && failed ? tUi("ui.imageUnavailable") : undefined}
      >
        {fallback ?? <span className="font-display text-sm">hwe</span>}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
