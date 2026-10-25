-- Espace Voyage : guides (pays, destinations, lieux, circuits), carnets de voyage,
-- séjours courte durée (réglages, calendrier, réservations, avis).
-- Migration ADDITIVE : nouvelles tables + une colonne à valeur par défaut.

-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('HISTORY', 'CULTURE', 'NATURE', 'BEACH', 'MUSEUM', 'MARKET', 'RELIGION', 'FESTIVAL', 'GASTRONOMY', 'LEISURE');

-- CreateEnum
CREATE TYPE "TripItemKind" AS ENUM ('PLACE', 'NOTE');

-- CreateEnum
CREATE TYPE "CancellationPolicy" AS ENUM ('FLEXIBLE', 'MODERATE', 'STRICT');

-- CreateEnum
CREATE TYPE "StayPaymentMode" AS ENUM ('ON_ARRIVAL', 'BEFORE_ARRIVAL');

-- CreateEnum
CREATE TYPE "StayBlockSource" AS ENUM ('MANUAL', 'ICAL');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'CONFIRMED', 'DECLINED', 'EXPIRED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "PlatformSettings" ADD COLUMN     "stayCommissionPct" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "VoyageImage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "dataUrl" TEXT NOT NULL,
    "fileKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoyageImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryGuide" (
    "country" VARCHAR(2) NOT NULL,
    "intro" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "translations" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryGuide_pkey" PRIMARY KEY ("country")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translations" JSONB,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "cover" TEXT,
    "coverCredit" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "category" "PlaceCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tips" TEXT,
    "translations" JSONB,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "address" TEXT,
    "openingHours" TEXT,
    "priceInfo" TEXT,
    "visitMinutes" INTEGER,
    "bestPeriod" TEXT,
    "website" TEXT,
    "cover" TEXT,
    "coverCredit" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circuit" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "translations" JSONB,
    "cover" TEXT,
    "coverCredit" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircuitStep" (
    "id" TEXT NOT NULL,
    "circuitId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "destinationId" TEXT,
    "placeId" TEXT,
    "note" TEXT,
    "translations" JSONB,

    CONSTRAINT "CircuitStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "startDate" DATE,
    "endDate" DATE,
    "dayCount" INTEGER NOT NULL DEFAULT 3,
    "travelers" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "shareToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,
    "kind" "TripItemKind" NOT NULL,
    "placeId" TEXT,
    "title" TEXT,
    "note" TEXT,
    "time" VARCHAR(5),
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TripItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaySettings" (
    "propertyId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "nightlyPrice" DOUBLE PRECISION,
    "cleaningFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "minNights" INTEGER NOT NULL DEFAULT 1,
    "maxNights" INTEGER,
    "maxGuests" INTEGER NOT NULL DEFAULT 2,
    "checkInFrom" VARCHAR(5) NOT NULL DEFAULT '15:00',
    "checkOutBefore" VARCHAR(5) NOT NULL DEFAULT '11:00',
    "cancellationPolicy" "CancellationPolicy" NOT NULL DEFAULT 'MODERATE',
    "paymentMode" "StayPaymentMode" NOT NULL DEFAULT 'ON_ARRIVAL',
    "minNoticeDays" INTEGER NOT NULL DEFAULT 1,
    "houseRules" TEXT,
    "arrivalInstructions" TEXT,
    "icalToken" TEXT NOT NULL,
    "icalImportUrl" TEXT,
    "icalSyncedAt" TIMESTAMP(3),
    "icalError" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaySettings_pkey" PRIMARY KEY ("propertyId")
);

-- CreateTable
CREATE TABLE "StayBlock" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "source" "StayBlockSource" NOT NULL DEFAULT 'MANUAL',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StayBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "checkIn" DATE NOT NULL,
    "checkOut" DATE NOT NULL,
    "nights" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "nightlyRate" DOUBLE PRECISION NOT NULL,
    "cleaningFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "commissionPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cancellationPolicy" "CancellationPolicy" NOT NULL,
    "paymentMode" "StayPaymentMode" NOT NULL,
    "message" TEXT,
    "hostNote" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'REQUESTED',
    "expiresAt" TIMESTAMP(3),
    "answeredAt" TIMESTAMP(3),
    "answeredById" TEXT,
    "paymentDeclaredAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "paymentReference" TEXT,
    "paidAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancelledBy" TEXT,
    "cancelReason" TEXT,
    "refundAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingCounter" (
    "year" INTEGER NOT NULL,
    "last" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BookingCounter_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "StayReview" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StayReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoyageImage_key_key" ON "VoyageImage"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE INDEX "Destination_country_published_position_idx" ON "Destination"("country", "published", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");

-- CreateIndex
CREATE INDEX "Place_destinationId_published_position_idx" ON "Place"("destinationId", "published", "position");

-- CreateIndex
CREATE INDEX "Place_category_idx" ON "Place"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Circuit_slug_key" ON "Circuit"("slug");

-- CreateIndex
CREATE INDEX "Circuit_country_published_position_idx" ON "Circuit"("country", "published", "position");

-- CreateIndex
CREATE INDEX "CircuitStep_circuitId_day_position_idx" ON "CircuitStep"("circuitId", "day", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_shareToken_key" ON "Trip"("shareToken");

-- CreateIndex
CREATE INDEX "Trip_userId_updatedAt_idx" ON "Trip"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "TripItem_tripId_day_position_idx" ON "TripItem"("tripId", "day", "position");

-- CreateIndex
CREATE UNIQUE INDEX "StaySettings_icalToken_key" ON "StaySettings"("icalToken");

-- CreateIndex
CREATE INDEX "StayBlock_propertyId_startDate_idx" ON "StayBlock"("propertyId", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_reference_key" ON "Booking"("reference");

-- CreateIndex
CREATE INDEX "Booking_propertyId_checkIn_idx" ON "Booking"("propertyId", "checkIn");

-- CreateIndex
CREATE INDEX "Booking_guestId_checkIn_idx" ON "Booking"("guestId", "checkIn");

-- CreateIndex
CREATE INDEX "Booking_status_expiresAt_idx" ON "Booking"("status", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "StayReview_bookingId_key" ON "StayReview"("bookingId");

-- CreateIndex
CREATE INDEX "StayReview_propertyId_createdAt_idx" ON "StayReview"("propertyId", "createdAt");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircuitStep" ADD CONSTRAINT "CircuitStep_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "Circuit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircuitStep" ADD CONSTRAINT "CircuitStep_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircuitStep" ADD CONSTRAINT "CircuitStep_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripItem" ADD CONSTRAINT "TripItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripItem" ADD CONSTRAINT "TripItem_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaySettings" ADD CONSTRAINT "StaySettings_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StayBlock" ADD CONSTRAINT "StayBlock_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StayReview" ADD CONSTRAINT "StayReview_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StayReview" ADD CONSTRAINT "StayReview_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StayReview" ADD CONSTRAINT "StayReview_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Défense en profondeur contre la double réservation : deux réservations qui
-- bloquent des dates (acceptée, confirmée, terminée) ne peuvent pas se
-- chevaucher sur un même bien (le service vérifie aussi, sous verrou).
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_no_overlap"
  EXCLUDE USING gist ("propertyId" WITH =, daterange("checkIn", "checkOut", '[)') WITH &&)
  WHERE ("status" IN ('ACCEPTED', 'CONFIRMED', 'COMPLETED'));
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_dates_check" CHECK ("checkOut" > "checkIn");
ALTER TABLE "StayBlock" ADD CONSTRAINT "StayBlock_dates_check" CHECK ("endDate" > "startDate");
ALTER TABLE "StayReview" ADD CONSTRAINT "StayReview_rating_check" CHECK ("rating" BETWEEN 1 AND 5);
