"use client";

import { Toaster } from "@hwe/ui";

// Le layout (Server Component) passe par ce composant client pour monter
// le Toaster du barrel @hwe/ui.
export function AppToaster() {
  return <Toaster />;
}
