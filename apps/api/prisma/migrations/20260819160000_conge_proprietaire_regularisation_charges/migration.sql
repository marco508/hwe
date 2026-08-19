-- AlterTable
ALTER TABLE "LeaseContract" ADD COLUMN     "ownerNoticeEffectiveDate" TIMESTAMP(3),
ADD COLUMN     "ownerNoticeGivenAt" TIMESTAMP(3),
ADD COLUMN     "ownerNoticeNote" TEXT,
ADD COLUMN     "ownerNoticeReason" TEXT;

-- CreateTable
CREATE TABLE "ChargeRegularization" (
    "id" TEXT NOT NULL,
    "leaseId" TEXT NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "provisionsCollected" DOUBLE PRECISION NOT NULL,
    "actualCharges" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChargeRegularization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChargeRegularization_leaseId_idx" ON "ChargeRegularization"("leaseId");

-- AddForeignKey
ALTER TABLE "ChargeRegularization" ADD CONSTRAINT "ChargeRegularization_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "LeaseContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

