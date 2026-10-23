"use client";

import * as React from "react";
import { ErrorView } from "@hwe/ui";

// Erreur de rendu non rattrapée : message lisible + « Réessayer ».
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return <ErrorView onRetry={reset} homeHref="/" />;
}
