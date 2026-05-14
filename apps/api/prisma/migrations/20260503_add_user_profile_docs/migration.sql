-- Add avatarUrl to User
ALTER TABLE "User" ADD COLUMN "avatarUrl" TEXT;

-- Enum for identity document types
CREATE TYPE "IdentityDocumentType" AS ENUM (
  'NATIONAL_ID',
  'PASSPORT',
  'DRIVERS_LICENSE',
  'RESIDENCE_PERMIT',
  'OTHER'
);

-- User identity documents table
CREATE TABLE "UserDocument" (
  "id"           TEXT NOT NULL,
  "userId"       TEXT NOT NULL,
  "name"         TEXT NOT NULL,
  "documentType" "IdentityDocumentType" NOT NULL,
  "fileUrl"      TEXT NOT NULL,
  "fileSize"     INTEGER,
  "mimeType"     TEXT,
  "notes"        TEXT,
  "verifiedAt"   TIMESTAMP(3),
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL,

  CONSTRAINT "UserDocument_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "UserDocument_userId_idx" ON "UserDocument"("userId");

ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
