"use client";

// Le layout est un Server Component : importer Toaster depuis le barrel
// @hwe/ui côté serveur donne un composant `undefined` au prérendu. Ce
// relais client isole l'import.
import { Toaster } from "@hwe/ui";

export function AppToaster() {
  return <Toaster />;
}
