-- Correctifs d'audit (2026-10-23) : sessions révocables, avatars servis par
-- URL, devise et location courte sur les baux, montants figés des échéances,
-- numérotation atomique des quittances, marqueurs d'alerte de fin de bail,
-- e-mails normalisés. Toutes les données existantes sont conservées.

-- ── Utilisateurs ────────────────────────────────────────────────────────────
ALTER TABLE "User" ADD COLUMN "tokenVersion" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN "avatarKey" TEXT;
CREATE UNIQUE INDEX "User_avatarKey_key" ON "User"("avatarKey");

-- Avatars existants : une clé publique non devinable chacun.
UPDATE "User"
SET "avatarKey" = md5(random()::text || clock_timestamp()::text || "id")
WHERE "avatarUrl" IS NOT NULL AND "avatarUrl" <> '';

-- E-mails en minuscules/sans espaces. Si deux comptes ne diffèrent que par
-- la casse, on ne touche à aucun des deux (pas de perte) et on le signale ;
-- l'API le signale aussi à chaque démarrage.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT lower(btrim("email")) AS e, count(*) AS n
    FROM "User" GROUP BY lower(btrim("email")) HAVING count(*) > 1
  LOOP
    RAISE WARNING 'Comptes en doublon (casse) non normalisés : % (% comptes)', r.e, r.n;
  END LOOP;
END $$;

UPDATE "User" u
SET "email" = lower(btrim(u."email"))
WHERE u."email" <> lower(btrim(u."email"))
  AND NOT EXISTS (
    SELECT 1 FROM "User" o
    WHERE o."id" <> u."id" AND lower(btrim(o."email")) = lower(btrim(u."email"))
  );

-- Unicité insensible à la casse, si aucune collision ne subsiste.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM "User" GROUP BY lower("email") HAVING count(*) > 1
  ) THEN
    CREATE UNIQUE INDEX "User_email_lower_key" ON "User" (lower("email"));
  ELSE
    RAISE WARNING 'Index unique lower(email) NON créé : des doublons de casse subsistent.';
  END IF;
END $$;

-- Autres e-mails de rattachement (bail, colocataires, demandes).
UPDATE "LeaseContract" SET "tenantEmail" = lower(btrim("tenantEmail"))
WHERE "tenantEmail" <> lower(btrim("tenantEmail"));

UPDATE "LeaseCoTenant" c SET "email" = lower(btrim(c."email"))
WHERE c."email" <> lower(btrim(c."email"))
  AND NOT EXISTS (
    SELECT 1 FROM "LeaseCoTenant" o
    WHERE o."id" <> c."id" AND o."leaseId" = c."leaseId"
      AND lower(btrim(o."email")) = lower(btrim(c."email"))
  );

UPDATE "Inquiry" SET "contactEmail" = lower(btrim("contactEmail"))
WHERE "contactEmail" <> lower(btrim("contactEmail"));

-- ── Baux ────────────────────────────────────────────────────────────────────
ALTER TABLE "LeaseContract"
  ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'EUR',
  ADD COLUMN "shortStay" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "stayTotal" DOUBLE PRECISION,
  ADD COLUMN "contentHash" TEXT,
  ADD COLUMN "expiryReminder7At" TIMESTAMP(3),
  ADD COLUMN "expiryReminder1At" TIMESTAMP(3);

-- Devise copiée du bien.
UPDATE "LeaseContract" l
SET "currency" = COALESCE(NULLIF(p."currency", ''), 'EUR')
FROM "Property" p
WHERE p."id" = l."propertyId";

-- Les baux passés (expirés/résiliés) ne doivent plus recevoir d'alerte.
UPDATE "LeaseContract"
SET "expiryReminder7At" = now(), "expiryReminder1At" = now()
WHERE "status" IN ('EXPIRED', 'TERMINATED');

-- Supprimer un bien ne détruit plus ses baux (et quittances) en cascade.
ALTER TABLE "LeaseContract" DROP CONSTRAINT "LeaseContract_propertyId_fkey";
ALTER TABLE "LeaseContract" ADD CONSTRAINT "LeaseContract_propertyId_fkey"
  FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ── Avenants : valeurs avant application ────────────────────────────────────
ALTER TABLE "LeaseAmendment"
  ADD COLUMN "prevMonthlyRent" DOUBLE PRECISION,
  ADD COLUMN "prevCharges" DOUBLE PRECISION,
  ADD COLUMN "prevEndDate" TIMESTAMP(3);

-- ── Échéances : loyer et charges figés ──────────────────────────────────────
ALTER TABLE "RentPeriod"
  ADD COLUMN "rentAmount" DOUBLE PRECISION,
  ADD COLUMN "chargesAmount" DOUBLE PRECISION;

-- Rattrapage : les charges du bail (bornées au total), le reste en loyer.
UPDATE "RentPeriod" r
SET "chargesAmount" = LEAST(GREATEST(COALESCE(l."charges", 0), 0), r."amount"),
    "rentAmount" = r."amount" - LEAST(GREATEST(COALESCE(l."charges", 0), 0), r."amount")
FROM "LeaseContract" l
WHERE l."id" = r."leaseId";

UPDATE "RentPeriod" SET "rentAmount" = "amount", "chargesAmount" = 0
WHERE "rentAmount" IS NULL OR "chargesAmount" IS NULL;

ALTER TABLE "RentPeriod" ALTER COLUMN "rentAmount" SET NOT NULL;
ALTER TABLE "RentPeriod" ALTER COLUMN "chargesAmount" SET NOT NULL;

-- ── Compteur de quittances par année d'émission ─────────────────────────────
CREATE TABLE "ReceiptCounter" (
    "year" INTEGER NOT NULL,
    "last" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReceiptCounter_pkey" PRIMARY KEY ("year")
);

-- Reprise de la numérotation existante (HWE-AAAA-NNNNN) : on repart du plus
-- grand numéro déjà émis pour chaque année → aucune collision possible.
INSERT INTO "ReceiptCounter" ("year", "last")
SELECT substring("receiptNo" from '^HWE-(\d{4})-')::int,
       max(substring("receiptNo" from '^HWE-\d{4}-(\d{1,9})$')::int)
FROM "RentPeriod"
WHERE "receiptNo" ~ '^HWE-\d{4}-\d{1,9}$'
GROUP BY 1;
