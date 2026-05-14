-- CreateTable
CREATE TABLE "PricingRate" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "unit" "LeaseDurationUnit" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PricingRate_propertyId_unit_key" ON "PricingRate"("propertyId", "unit");

-- CreateIndex
CREATE INDEX "PricingRate_propertyId_idx" ON "PricingRate"("propertyId");

-- AddForeignKey
ALTER TABLE "PricingRate" ADD CONSTRAINT "PricingRate_propertyId_fkey"
    FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
