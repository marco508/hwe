-- Add signature timestamp fields to LeaseContract
ALTER TABLE "LeaseContract"
  ADD COLUMN "ownerSignedAt"  TIMESTAMP(3),
  ADD COLUMN "tenantSignedAt" TIMESTAMP(3);
