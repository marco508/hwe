-- Langues et devises (« polyvalence maximum ») : langue préférée des
-- utilisateurs, devise de facturation des agences, prix des offres par
-- devise, taux de change quotidiens.
--
-- Migration ADDITIVE et REJOUABLE (IF NOT EXISTS, ON CONFLICT DO NOTHING) :
-- aucune colonne ni index existant n'est modifié ; les index partiels des
-- modules Professionnels et Abonnement restent intacts.

-- AlterTable : langue préférée (null = jamais choisie → fr)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "locale" VARCHAR(5);

-- AlterTable : devise de facturation choisie par l'agence (null = pays)
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "billingCurrency" VARCHAR(3);

-- CreateTable
CREATE TABLE IF NOT EXISTS "PlanPrice" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "monthlyPrice" DECIMAL(14,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PlanPrice_planId_currency_key" ON "PlanPrice"("planId", "currency");

DO $$ BEGIN
  ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "FxRate" (
    "id" TEXT NOT NULL,
    "base" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "date" DATE NOT NULL,
    "source" TEXT NOT NULL,
    "rates" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FxRate_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "FxRate_fetchedAt_idx" ON "FxRate"("fetchedAt");

-- Données : le prix actuel de chaque offre devient son prix dans sa devise
-- (EUR pour les offres de départ).
INSERT INTO "PlanPrice" ("id", "planId", "currency", "monthlyPrice", "createdAt", "updatedAt")
SELECT 'pp_' || md5(p."id" || ':' || upper(p."currency")), p."id", upper(p."currency"), p."monthlyPrice", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Plan" p
ON CONFLICT ("planId", "currency") DO NOTHING;
