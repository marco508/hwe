-- Écosystème DKP : Compte DKP, paiement en ligne de l'abonnement pro,
-- partage du loyer (FamiLyfe), connexion GestiPro des agences.
-- Migration ADDITIVE : colonnes nullables et tables nouvelles, rien de supprimé.

-- 1. Compte DKP lié (identifiant `sub` du hub).
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "dkpSub" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "User_dkpSub_key" ON "User"("dkpSub");

-- 2. GestiPro : clé d'intégration de l'agence (jamais renvoyée au front).
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "gestiproKey" TEXT;
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "gestiproKeyHint" VARCHAR(40);
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "gestiproTenantName" VARCHAR(160);
ALTER TABLE "Agency" ADD COLUMN IF NOT EXISTS "gestiproConnectedAt" TIMESTAMP(3);

-- 3. Moyen de paiement « en ligne (KkiaPay) ».
ALTER TYPE "PaymentMethod" ADD VALUE IF NOT EXISTS 'KKIAPAY';

-- 4. Paiements en ligne d'abonnement.
CREATE TYPE "OnlinePaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');
CREATE TABLE "OnlineSubscriptionPayment" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'XOF',
    "status" "OnlinePaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "providerStatus" TEXT,
    "paymentId" TEXT,
    "createdById" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OnlineSubscriptionPayment_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "OnlineSubscriptionPayment_reference_key" ON "OnlineSubscriptionPayment"("reference");
CREATE UNIQUE INDEX "OnlineSubscriptionPayment_transactionId_key" ON "OnlineSubscriptionPayment"("transactionId");
CREATE UNIQUE INDEX "OnlineSubscriptionPayment_paymentId_key" ON "OnlineSubscriptionPayment"("paymentId");
CREATE INDEX "OnlineSubscriptionPayment_agencyId_createdAt_idx" ON "OnlineSubscriptionPayment"("agencyId", "createdAt");
ALTER TABLE "OnlineSubscriptionPayment" ADD CONSTRAINT "OnlineSubscriptionPayment_agencyId_fkey"
  FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 5. Codes de partage du loyer (FamiLyfe).
CREATE TABLE "RentShareCode" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "hint" VARCHAR(12) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "useCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RentShareCode_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "RentShareCode_codeHash_key" ON "RentShareCode"("codeHash");
CREATE INDEX "RentShareCode_leaseId_createdAt_idx" ON "RentShareCode"("leaseId", "createdAt");
ALTER TABLE "RentShareCode" ADD CONSTRAINT "RentShareCode_leaseId_fkey"
  FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
