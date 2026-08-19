"use client";

import * as React from "react";
import { useAuth } from "../lib/auth-context";
import { api } from "../lib/api";

/** Bandeau affiché tant que l'adresse e-mail n'est pas confirmée.
 * `emailVerifiedAt === null` vient de /auth/me — après une simple connexion
 * le champ est absent (undefined) et le bandeau reste discret. */
export function EmailVerifyBanner() {
  const { user } = useAuth();
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  if (!user || user.emailVerifiedAt !== null) return null;

  const resend = async () => {
    setBusy(true);
    try {
      await api.sendVerification();
      setSent(true);
    } catch {
      /* best effort */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-accent/10 border-b border-accent/30 px-6 py-2 text-sm flex flex-wrap items-center justify-center gap-3 text-center">
      <span>Confirmez votre e-mail pour publier, répondre et gérer vos baux.</span>
      {sent ? (
        <span className="font-medium">Lien envoyé — vérifiez votre boîte mail.</span>
      ) : (
        <button
          onClick={resend}
          disabled={busy}
          className="underline font-medium disabled:opacity-50"
        >
          {busy ? "Envoi…" : "Renvoyer le lien"}
        </button>
      )}
    </div>
  );
}
