/**
 * Secret JWT unique pour toute l'API.
 * En production, l'absence de JWT_SECRET fait échouer le démarrage : mieux
 * vaut un conteneur qui ne démarre pas qu'une API signée avec « dev-secret ».
 */
export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET manquant ou trop court (16 caractères minimum) : démarrage refusé en production.",
    );
  }
  return "dev-secret";
}
