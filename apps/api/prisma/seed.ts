import { PrismaClient, Role, ListingType, PropertyType } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const ownerPwd = await bcrypt.hash("owner1234", 10);
  const tenantPwd = await bcrypt.hash("tenant1234", 10);

  const owner = await prisma.user.upsert({
    where: { email: "owner@hwe.test" },
    update: {},
    create: {
      email: "owner@hwe.test",
      password: ownerPwd,
      firstName: "Olivia",
      lastName: "Martin",
      phone: "+33600000001",
      role: Role.OWNER,
    },
  });

  await prisma.user.upsert({
    where: { email: "tenant@hwe.test" },
    update: {},
    create: {
      email: "tenant@hwe.test",
      password: tenantPwd,
      firstName: "Theo",
      lastName: "Durand",
      phone: "+33600000002",
      role: Role.TENANT,
    },
  });

  const samples = [
    {
      title: "Appartement lumineux Marais",
      description:
        "Charmant 3 pièces refait à neuf, idéalement situé au cœur du Marais.",
      listingType: ListingType.RENT,
      propertyType: PropertyType.APARTMENT,
      price: 2400,
      surface: 62,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      floor: 4,
      yearBuilt: 1900,
      furnished: true,
      hasElevator: true,
      addressLine: "12 rue des Archives",
      city: "Paris",
      postalCode: "75004",
      latitude: 48.859,
      longitude: 2.355,
    },
    {
      title: "Maison familiale avec jardin",
      description: "Belle maison de 5 pièces avec jardin, garage et terrasse.",
      listingType: ListingType.SALE,
      propertyType: PropertyType.HOUSE,
      price: 690000,
      surface: 145,
      rooms: 5,
      bedrooms: 4,
      bathrooms: 2,
      yearBuilt: 1985,
      hasGarden: true,
      hasParking: true,
      addressLine: "8 allée des Tilleuls",
      city: "Versailles",
      postalCode: "78000",
      latitude: 48.802,
      longitude: 2.13,
    },
    {
      title: "Studio cosy proche métro",
      description: "Studio meublé de 22 m², idéal étudiant ou jeune actif.",
      listingType: ListingType.RENT,
      propertyType: PropertyType.STUDIO,
      price: 850,
      surface: 22,
      rooms: 1,
      bedrooms: 0,
      bathrooms: 1,
      floor: 2,
      furnished: true,
      addressLine: "5 rue Pasteur",
      city: "Lyon",
      postalCode: "69007",
      latitude: 45.745,
      longitude: 4.842,
    },
  ];

  for (const s of samples) {
    await prisma.property.create({
      data: {
        ...s,
        ownerId: owner.id,
        media: {
          create: [
            {
              url: `https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200`,
              position: 0,
            },
          ],
        },
      },
    });
  }

  console.log("Seed done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
