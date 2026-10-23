"use client";

// Session partagée (@hwe/ui) : rôle vérifié AVANT d'enregistrer le jeton (F4),
// seul un 401 déconnecte (A1), /auth/me rechargé après connexion (F5, F6).
import * as React from "react";
import { createAuth, useAuth, WRONG_ROLE } from "@hwe/ui";

const auth = createAuth({
  allowedRoles: ["OWNER", "ADMIN", "AGENT"],
  registerRole: "OWNER",
});

// Export nommé simple (pas de déstructuration) : le layout serveur importe ce
// module « use client » et Next ne détecte pas les exports déstructurés
// (sinon « Unsupported Server Component type: undefined » au prérendu).
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <auth.AuthProvider>{children}</auth.AuthProvider>;
}

export { useAuth, WRONG_ROLE };
