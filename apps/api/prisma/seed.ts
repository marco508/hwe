/**
 * Seed minimal — uniquement le compte administrateur de bootstrap.
 *
 * Aucun bien fictif n'est créé : la base reste totalement vide jusqu'à ce
 * qu'un propriétaire publie une vraie annonce depuis l'espace owner.
 *
 * Utilisation :
 *   pnpm --filter @hwe/api prisma db seed
 *
 * Les identifiants peuvent être surchargés via les variables d'env :
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRST_NAME, ADMIN_LAST_NAME
 */
import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@hwe.local";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!2026";
  const firstName = process.env.ADMIN_FIRST_NAME ?? "Admin";
  const lastName = process.env.ADMIN_LAST_NAME ?? "hwe";

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      firstName,
      lastName,
      role: Role.ADMIN,
    },
  });

  console.log(
    `Seed OK — compte administrateur : ${admin.email} (mot de passe : ${
      process.env.ADMIN_PASSWORD ? "défini via ADMIN_PASSWORD" : password
    })`,
  );
  console.log(
    "Aucun bien n'a été inséré : la plateforme démarre avec un catalogue vide.",
  );
  console.log(
    "Connectez-vous à l'espace propriétaire pour publier votre premier bien.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
