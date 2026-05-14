-- Create enum type for lease duration unit
CREATE TYPE "LeaseDurationUnit" AS ENUM ('DAYS', 'WEEKS', 'MONTHS', 'YEARS');

-- Add CANCELLED to InquiryStatus enum
ALTER TYPE "InquiryStatus" ADD VALUE 'CANCELLED';

-- AlterTable Inquiry: add rental period + cancel fields
ALTER TABLE "Inquiry"
  ADD COLUMN "desiredStartDate"  TIMESTAMP(3),
  ADD COLUMN "leaseDuration"     INTEGER,
  ADD COLUMN "leaseDurationUnit" "LeaseDurationUnit",
  ADD COLUMN "cancelledAt"       TIMESTAMP(3);

-- AlterTable Property: add country index
CREATE INDEX "Property_country_idx" ON "Property"("country");

-- CreateTable Favorite
CREATE TABLE "Favorite" (
  "id"         TEXT NOT NULL,
  "userId"     TEXT NOT NULL,
  "propertyId" TEXT NOT NULL,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Favorite"
  ADD CONSTRAINT "Favorite_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "Favorite_propertyId_fkey"
    FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Favorite_userId_propertyId_key" ON "Favorite"("userId", "propertyId");
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");
