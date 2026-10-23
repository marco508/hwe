"use client";

// Session partagée (@hwe/ui) : seul un 401 déconnecte (A1), /auth/me rechargé
// après connexion (F5, F6). Un propriétaire peut aussi utiliser l'espace
// locataire (consulter, candidater ailleurs, voir « votre bien »).
import { createAuth, useAuth, WRONG_ROLE } from "@hwe/ui";

const auth = createAuth({
  allowedRoles: ["TENANT", "OWNER", "ADMIN"],
  registerRole: "TENANT",
});

// Export nommé simple (pas de déstructuration) : Next ne détecte pas les
// exports déstructurés d'un module "use client" importé par le layout serveur.
export const AuthProvider = auth.AuthProvider;

export { useAuth, WRONG_ROLE };
