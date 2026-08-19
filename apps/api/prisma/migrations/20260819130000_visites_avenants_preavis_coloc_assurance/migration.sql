-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('REQUESTED', 'CONFIRMED', 'DECLINED', 'CANCELLED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "IdentityDocumentType" ADD VALUE 'INCOME_PROOF';
ALTER TYPE "IdentityDocumentType" ADD VALUE 'EMPLOYMENT_CONTRACT';
ALTER TYPE "IdentityDocumentType" ADD VALUE 'TAX_NOTICE';
ALTER TYPE "IdentityDocumentType" ADD VALUE 'GUARANTOR_ID';
ALTER TYPE "IdentityDocumentType" ADD VALUE 'GUARANTOR_INCOME';

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "shareDossier" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LeaseContract" ADD COLUMN     "noticeEffectiveDate" TIMESTAMP(3),
ADD COLUMN     "noticeGivenAt" TIMESTAMP(3),
ADD COLUMN     "noticeNote" TEXT;

-- CreateTable
CREATE TABLE "LeaseAmendment" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "newMonthlyRent" DOUBLE PRECISION,
    "newCharges" DOUBLE PRECISION,
    "newEndDate" TIMESTAMP(3),
    "note" TEXT,
    "ownerSignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantSignedAt" TIMESTAMP(3),
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaseAmendment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaseCoTenant" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaseCoTenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCertificate" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsuranceCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "proposedAt" TIMESTAMP(3) NOT NULL,
    "status" "VisitStatus" NOT NULL DEFAULT 'REQUESTED',
    "note" TEXT,
    "ownerNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaseAmendment_leaseId_idx" ON "LeaseAmendment"("leaseId");

-- CreateIndex
CREATE INDEX "LeaseCoTenant_email_idx" ON "LeaseCoTenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LeaseCoTenant_leaseId_email_key" ON "LeaseCoTenant"("leaseId", "email");

-- CreateIndex
CREATE INDEX "InsuranceCertificate_leaseId_validUntil_idx" ON "InsuranceCertificate"("leaseId", "validUntil");

-- CreateIndex
CREATE INDEX "Visit_propertyId_status_idx" ON "Visit"("propertyId", "status");

-- CreateIndex
CREATE INDEX "Visit_requesterId_idx" ON "Visit"("requesterId");

-- AddForeignKey
ALTER TABLE "LeaseAmendment" ADD CONSTRAINT "LeaseAmendment_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaseCoTenant" ADD CONSTRAINT "LeaseCoTenant_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceCertificate" ADD CONSTRAINT "InsuranceCertificate_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

