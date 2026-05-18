-- ============================================================================
-- Champs supplémentaires Property : différencier vente / location
-- ============================================================================

-- Enums
DO $$ BEGIN
  CREATE TYPE "EnergyClass" AS ENUM ('A','B','C','D','E','F','G');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "RentalKind" AS ENUM ('BARE','FURNISHED','SEASONAL','STUDENT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Vente
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "coOwnershipFees" DOUBLE PRECISION;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "propertyTax"     DOUBLE PRECISION;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "energyClass"     "EnergyClass";
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "notaryFeesRate"  DOUBLE PRECISION;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "isNew"           BOOLEAN NOT NULL DEFAULT FALSE;

-- Location
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "rentalKind"      "RentalKind";
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "chargesIncluded" BOOLEAN;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "chargesAmount"   DOUBLE PRECISION;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "deposit"         DOUBLE PRECISION;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "noticeMonths"    INTEGER;
ALTER TABLE "Property" ADD COLUMN IF NOT EXISTS "petsAllowed"     BOOLEAN;
