-- CreateEnum
CREATE TYPE "InspectionType" AS ENUM ('ENTRY', 'EXIT');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "LeaseContract" ADD COLUMN     "depositNote" TEXT,
ADD COLUMN     "depositPaidAt" TIMESTAMP(3),
ADD COLUMN     "depositRetained" DOUBLE PRECISION,
ADD COLUMN     "depositReturnedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "type" "InspectionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "items" JSONB,
    "generalNote" TEXT,
    "meterElectricity" TEXT,
    "meterWater" TEXT,
    "meterGas" TEXT,
    "keysCount" INTEGER,
    "ownerSignedAt" TIMESTAMP(3),
    "tenantSignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoDataUrl" TEXT,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "resolutionNote" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inspection_leaseId_idx" ON "Inspection"("leaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_leaseId_type_key" ON "Inspection"("leaseId", "type");

-- CreateIndex
CREATE INDEX "Ticket_leaseId_status_idx" ON "Ticket"("leaseId", "status");

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Rattrapage : les comptes existants sont considérés vérifiés (ne bloque
-- personne au déploiement ; les NOUVEAUX comptes devront vérifier).
UPDATE "User" SET "emailVerifiedAt" = now() WHERE "emailVerifiedAt" IS NULL;
