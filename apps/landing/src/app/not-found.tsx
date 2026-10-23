"use client";

import { NotFoundView } from "@hwe/ui";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <NotFoundView homeHref="/" />
    </main>
  );
}
