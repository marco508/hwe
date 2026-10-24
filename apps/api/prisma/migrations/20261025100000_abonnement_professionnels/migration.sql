-- Abonnement des professionnels : offres, paramètres plateforme, essai,
-- demandes de paiement (« J'ai payé »), paiements / factures FAC-<année>-<n>.
--
-- Migration ADDITIVE et REJOUABLE (IF NOT EXISTS, duplicate_object ignorés) :
-- aucune colonne ni index existant n'est modifié (les index partiels du
-- module Professionnels restent intacts).
--
-- Statut d'abonnement : CALCULÉ à la volée (common/subscription.ts), aucune
-- colonne « status » ni tâche planifiée nécessaire.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "PaymentMethod" AS ENUM ('TRANSFER', 'MOBILE_MONEY', 'CASH', 'OTHER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "SubscriptionRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AlterTable : essai consommé (une seule période d'essai par personne)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "proTrialUsedAt" TIMESTAMP(3);

-- AlterTable : abonnement de l'agence
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "trialEndsAt" TIMESTAMP(3);
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "paidUntil" TIMESTAMP(3);
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "planId" TEXT;
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "manualSuspension" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "lastReminderKey" TEXT;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Plan" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monthlyPrice" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "maxAgents" INTEGER,
    "maxActiveMandates" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable (singleton id = 1)
CREATE TABLE IF NOT EXISTS "PlatformSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "trialDays" INTEGER NOT NULL DEFAULT 60,
    "graceDays" INTEGER NOT NULL DEFAULT 7,
    "freePlanEnabled" BOOLEAN NOT NULL DEFAULT true,
    "paymentInstructions" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "SubscriptionRequest" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "reference" TEXT NOT NULL,
    "note" TEXT,
    "status" "SubscriptionRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "rejectReason" TEXT,
    "paymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AgencyPayment" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "reference" TEXT,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "recordedById" TEXT NOT NULL,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "InvoiceCounter" (
    "year" INTEGER NOT NULL,
    "last" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "InvoiceCounter_pkey" PRIMARY KEY ("year")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Plan_code_key" ON "Plan"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "SubscriptionRequest_paymentId_key" ON "SubscriptionRequest"("paymentId");
CREATE INDEX IF NOT EXISTS "SubscriptionRequest_agencyId_status_idx" ON "SubscriptionRequest"("agencyId", "status");
CREATE INDEX IF NOT EXISTS "SubscriptionRequest_status_createdAt_idx" ON "SubscriptionRequest"("status", "createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "AgencyPayment_number_key" ON "AgencyPayment"("number");
CREATE UNIQUE INDEX IF NOT EXISTS "AgencyPayment_requestId_key" ON "AgencyPayment"("requestId");
CREATE INDEX IF NOT EXISTS "AgencyPayment_agencyId_createdAt_idx" ON "AgencyPayment"("agencyId", "createdAt");

-- Index partiel (hors schéma Prisma) : une seule demande EN ATTENTE par agence.
-- ⚠️ Un futur `prisma migrate dev` peut proposer de le supprimer : ne pas accepter.
CREATE UNIQUE INDEX IF NOT EXISTS "SubscriptionRequest_one_pending_per_agency"
  ON "SubscriptionRequest"("agencyId") WHERE "status" = 'PENDING';

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "Agency" ADD CONSTRAINT "Agency_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "SubscriptionRequest" ADD CONSTRAINT "SubscriptionRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "SubscriptionRequest" ADD CONSTRAINT "SubscriptionRequest_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "AgencyPayment" ADD CONSTRAINT "AgencyPayment_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "AgencyPayment" ADD CONSTRAINT "AgencyPayment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Données de départ (valeurs provisoires, modifiables dans l'admin).
INSERT INTO "PlatformSettings" ("id", "trialDays", "graceDays", "freePlanEnabled", "updatedAt")
VALUES (1, 60, 7, true, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Plan" ("id", "code", "name", "monthlyPrice", "currency", "maxAgents", "maxActiveMandates", "active", "position", "updatedAt") VALUES
  ('plan_free',   'FREE',   'Gratuit', 0,  'EUR', 1,    2,    true, 0, CURRENT_TIMESTAMP),
  ('plan_solo',   'SOLO',   'Solo',    19, 'EUR', 1,    15,   true, 1, CURRENT_TIMESTAMP),
  ('plan_agence', 'AGENCE', 'Agence',  49, 'EUR', 5,    100,  true, 2, CURRENT_TIMESTAMP),
  ('plan_reseau', 'RESEAU', 'Réseau',  99, 'EUR', NULL, NULL, true, 3, CURRENT_TIMESTAMP)
ON CONFLICT ("code") DO NOTHING;

-- Agences existantes : essai de 60 jours à partir de leur création, et
-- essai consommé pour leurs responsables.
UPDATE "Agency" SET "trialEndsAt" = "createdAt" + INTERVAL '60 days' WHERE "trialEndsAt" IS NULL AND "paidUntil" IS NULL;
UPDATE "User" u SET "proTrialUsedAt" = a."createdAt"
  FROM "AgencyMember" m JOIN "Agency" a ON a."id" = m."agencyId"
  WHERE m."userId" = u."id" AND m."role" = 'MANAGER' AND u."proTrialUsedAt" IS NULL;
