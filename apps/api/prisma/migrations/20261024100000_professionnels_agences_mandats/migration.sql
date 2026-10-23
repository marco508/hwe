-- Module Professionnels : agences, équipes, mandats, honoraires, propositions
-- de candidat, propriétaires invités (compte non activé).
--
-- Migration REJOUABLE : chaque instruction est idempotente (IF NOT EXISTS,
-- exceptions duplicate_object ignorées) — elle s'applique proprement sur une
-- base existante, même partiellement migrée.
--
-- NB : la valeur 'AGENT' ajoutée à "Role" n'est utilisée par AUCUNE
-- instruction de cette migration (PostgreSQL l'interdit dans la transaction
-- qui l'ajoute).

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "AgencyRole" AS ENUM ('MANAGER', 'AGENT');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "MandateType" AS ENUM ('LETTING', 'MANAGEMENT', 'SALE');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "MandateStatus" AS ENUM ('PENDING_OWNER', 'ACTIVE', 'REJECTED', 'ENDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "MandateOrigin" AS ENUM ('AGENCY', 'OWNER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "RentPayee" AS ENUM ('OWNER', 'AGENCY');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "MandateRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "FeeKind" AS ENUM ('MANAGEMENT', 'LETTING', 'SALE');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "FeeStatus" AS ENUM ('DUE', 'SETTLED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "OwnerDecision" AS ENUM ('APPROVED', 'DECLINED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AlterEnum
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'AGENT';

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN IF NOT EXISTS "ownerDecision" "OwnerDecision",
ADD COLUMN IF NOT EXISTS "ownerDecisionAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "ownerDecisionNote" TEXT,
ADD COLUMN IF NOT EXISTS "proposalNote" TEXT,
ADD COLUMN IF NOT EXISTS "proposedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "proposedById" TEXT;

-- AlterTable
ALTER TABLE "Inspection" ADD COLUMN IF NOT EXISTS "ownerSignatureMention" TEXT,
ADD COLUMN IF NOT EXISTS "ownerSignedById" TEXT,
ADD COLUMN IF NOT EXISTS "updatedById" TEXT;

-- AlterTable
ALTER TABLE "LeaseAmendment" ADD COLUMN IF NOT EXISTS "createdById" TEXT,
ADD COLUMN IF NOT EXISTS "ownerSignatureMention" TEXT,
ADD COLUMN IF NOT EXISTS "ownerSignedById" TEXT,
ALTER COLUMN "ownerSignedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LeaseContract" ADD COLUMN IF NOT EXISTS "ownerSignatureMention" TEXT,
ADD COLUMN IF NOT EXISTS "ownerSignedById" TEXT,
ADD COLUMN IF NOT EXISTS "preparedById" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "soldAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "soldPrice" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RentPeriod" ADD COLUMN IF NOT EXISTS "reviewedById" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "handledById" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "activatedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "invitedByAgencyId" TEXT;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN IF NOT EXISTS "answeredById" TEXT;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Agency" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "logoDataUrl" TEXT,
    "logoKey" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT NOT NULL DEFAULT 'FR',
    "registrationNumber" TEXT,
    "description" VARCHAR(2000),
    "paymentIban" TEXT,
    "paymentHolder" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AgencyMember" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "AgencyRole" NOT NULL DEFAULT 'AGENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AgencyInvite" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "AgencyRole" NOT NULL DEFAULT 'AGENT',
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Mandate" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "assignedAgentId" TEXT,
    "ownerId" TEXT NOT NULL,
    "type" "MandateType" NOT NULL,
    "status" "MandateStatus" NOT NULL DEFAULT 'PENDING_OWNER',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "endReason" TEXT,
    "endedById" TEXT,
    "createdBy" "MandateOrigin" NOT NULL DEFAULT 'AGENCY',
    "createdById" TEXT NOT NULL,
    "message" TEXT,
    "managementFeeRate" DOUBLE PRECISION,
    "lettingFeeAmount" DOUBLE PRECISION,
    "lettingFeeMonths" DOUBLE PRECISION,
    "saleFeeRate" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "rentPayee" "RentPayee" NOT NULL DEFAULT 'OWNER',
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mandate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "MandateRequest" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "type" "MandateType" NOT NULL,
    "status" "MandateRequestStatus" NOT NULL DEFAULT 'PENDING',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "message" TEXT,
    "managementFeeRate" DOUBLE PRECISION,
    "lettingFeeAmount" DOUBLE PRECISION,
    "lettingFeeMonths" DOUBLE PRECISION,
    "saleFeeRate" DOUBLE PRECISION,
    "rentPayee" "RentPayee" NOT NULL DEFAULT 'OWNER',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MandateRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "MandateEvent" (
    "id" TEXT NOT NULL,
    "mandateId" TEXT NOT NULL,
    "actorId" TEXT,
    "kind" TEXT NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MandateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "FeeEntry" (
    "id" TEXT NOT NULL,
    "mandateId" TEXT NOT NULL,
    "kind" "FeeKind" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "rentPeriodId" TEXT,
    "leaseId" TEXT,
    "label" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "FeeStatus" NOT NULL DEFAULT 'DUE',
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeeEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "MandateCounter" (
    "year" INTEGER NOT NULL,
    "last" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MandateCounter_pkey" PRIMARY KEY ("year")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Agency_slug_key" ON "Agency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Agency_code_key" ON "Agency"("code");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Agency_logoKey_key" ON "Agency"("logoKey");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "AgencyMember_userId_key" ON "AgencyMember"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AgencyMember_agencyId_idx" ON "AgencyMember"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "AgencyInvite_tokenHash_key" ON "AgencyInvite"("tokenHash");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AgencyInvite_agencyId_idx" ON "AgencyInvite"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Mandate_reference_key" ON "Mandate"("reference");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Mandate_propertyId_status_idx" ON "Mandate"("propertyId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Mandate_agencyId_status_idx" ON "Mandate"("agencyId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Mandate_ownerId_idx" ON "Mandate"("ownerId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Mandate_assignedAgentId_idx" ON "Mandate"("assignedAgentId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MandateRequest_ownerId_status_idx" ON "MandateRequest"("ownerId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MandateRequest_agencyId_status_idx" ON "MandateRequest"("agencyId", "status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MandateEvent_mandateId_createdAt_idx" ON "MandateEvent"("mandateId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "FeeEntry_rentPeriodId_key" ON "FeeEntry"("rentPeriodId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "FeeEntry_mandateId_dueDate_idx" ON "FeeEntry"("mandateId", "dueDate");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "FeeEntry_status_idx" ON "FeeEntry"("status");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "User" ADD CONSTRAINT "User_invitedByAgencyId_fkey" FOREIGN KEY ("invitedByAgencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "AgencyMember" ADD CONSTRAINT "AgencyMember_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "AgencyMember" ADD CONSTRAINT "AgencyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "AgencyInvite" ADD CONSTRAINT "AgencyInvite_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "MandateRequest" ADD CONSTRAINT "MandateRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "MandateEvent" ADD CONSTRAINT "MandateEvent_mandateId_fkey" FOREIGN KEY ("mandateId") REFERENCES "Mandate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "FeeEntry" ADD CONSTRAINT "FeeEntry_mandateId_fkey" FOREIGN KEY ("mandateId") REFERENCES "Mandate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Données : comptes existants considérés comme activés ──
UPDATE "User" SET "activatedAt" = "createdAt" WHERE "activatedAt" IS NULL;

-- ── Contraintes métier non exprimables dans le schéma Prisma ──
-- Un seul mandat ouvert (en attente ou actif) par bien.
CREATE UNIQUE INDEX IF NOT EXISTS "Mandate_one_open_per_property"
  ON "Mandate"("propertyId") WHERE "status" IN ('PENDING_OWNER', 'ACTIVE');
-- Honoraire de mise en location : un seul (non annulé) par bail.
CREATE UNIQUE INDEX IF NOT EXISTS "FeeEntry_letting_once_per_lease"
  ON "FeeEntry"("leaseId") WHERE "kind" = 'LETTING' AND "status" <> 'CANCELLED';
-- Honoraire de vente : un seul (non annulé) par mandat.
CREATE UNIQUE INDEX IF NOT EXISTS "FeeEntry_sale_once_per_mandate"
  ON "FeeEntry"("mandateId") WHERE "kind" = 'SALE' AND "status" <> 'CANCELLED';
