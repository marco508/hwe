-- Fichiers hors de la base + recherche indexée des baux d'un locataire.
-- Migration ADDITIVE et REJOUABLE : colonnes nullables ajoutées, aucune
-- donnée supprimée (les data-URL restent en base jusqu'à la purge explicite).

-- 1. Références des fichiers publics écrits sur le volume (MEDIA_DIR).
ALTER TABLE "PropertyMedia" ADD COLUMN IF NOT EXISTS "fileKey" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "avatarFileKey" TEXT;
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "logoFileKey" TEXT;

-- 2. E-mails des baux normalisés (minuscules, sans espaces), comme à
--    l'écriture depuis l'audit : la recherche des baux d'un locataire devient
--    une égalité indexée au lieu d'un parcours complet insensible à la casse.
UPDATE "LeaseContract" SET "tenantEmail" = lower(btrim("tenantEmail"))
 WHERE "tenantEmail" <> lower(btrim("tenantEmail"));

-- Colocataires : (leaseId, email) est unique → on ne normalise que les lignes
-- sans doublon de casse sur le même bail (une ligne laissée telle quelle a
-- alors un double normalisé sur ce bail : le bail reste trouvé).
UPDATE "LeaseCoTenant" c SET "email" = lower(btrim(c."email"))
 WHERE c."email" <> lower(btrim(c."email"))
   AND NOT EXISTS (
     SELECT 1 FROM "LeaseCoTenant" d
      WHERE d."leaseId" = c."leaseId" AND d."id" <> c."id"
        AND lower(btrim(d."email")) = lower(btrim(c."email")));

CREATE INDEX IF NOT EXISTS "LeaseContract_tenantEmail_idx" ON "LeaseContract"("tenantEmail");
