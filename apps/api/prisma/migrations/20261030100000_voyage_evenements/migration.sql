-- Fêtes et événements de l'espace Voyage + journal du contenu de départ.
CREATE TYPE "VoyageEventKind" AS ENUM ('NATIONAL', 'RELIGIOUS', 'TRADITIONAL', 'FESTIVAL', 'SEASONAL');

CREATE TABLE "VoyageEvent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "kind" "VoyageEventKind" NOT NULL,
    "publicHoliday" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tips" TEXT,
    "where" TEXT,
    "dateNote" TEXT,
    "rule" JSONB NOT NULL,
    "destinationId" TEXT,
    "placeId" TEXT,
    "caution" BOOLEAN NOT NULL DEFAULT false,
    "cover" TEXT,
    "coverCredit" TEXT,
    "sources" JSONB,
    "translations" JSONB,
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VoyageEvent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "VoyageEvent_slug_key" ON "VoyageEvent"("slug");
CREATE INDEX "VoyageEvent_country_published_idx" ON "VoyageEvent"("country", "published");
CREATE INDEX "VoyageEvent_destinationId_idx" ON "VoyageEvent"("destinationId");
CREATE INDEX "VoyageEvent_placeId_idx" ON "VoyageEvent"("placeId");
ALTER TABLE "VoyageEvent" ADD CONSTRAINT "VoyageEvent_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "VoyageEvent" ADD CONSTRAINT "VoyageEvent_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "VoyageSeedEntry" (
    "kind" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VoyageSeedEntry_pkey" PRIMARY KEY ("kind", "slug")
);

-- Tout ce qui existe déjà a été inséré (contenu de départ ou admin) : le seed
-- n'ajoutera que les nouveautés, jamais ce qui a été supprimé.
INSERT INTO "VoyageSeedEntry" ("kind", "slug") SELECT 'destination', "slug" FROM "Destination" ON CONFLICT DO NOTHING;
INSERT INTO "VoyageSeedEntry" ("kind", "slug") SELECT 'place', "slug" FROM "Place" ON CONFLICT DO NOTHING;
INSERT INTO "VoyageSeedEntry" ("kind", "slug") SELECT 'circuit', "slug" FROM "Circuit" ON CONFLICT DO NOTHING;
INSERT INTO "VoyageSeedEntry" ("kind", "slug") SELECT 'circuit', 'nord-benin-6-jours' ON CONFLICT DO NOTHING;
