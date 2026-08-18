import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

/**
 * Lève une 403 claire si l'e-mail du compte n'est pas vérifié.
 * Appliqué aux actions où l'identité e-mail engage : publier un bien,
 * envoyer une demande, accéder à son bail et à ses loyers (le rattachement
 * locataire↔bail repose sur l'e-mail).
 */
export async function assertEmailVerified(prisma: PrismaService, userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailVerifiedAt: true },
  });
  if (!user?.emailVerifiedAt) {
    throw new ForbiddenException(
      "Vérifiez d'abord votre adresse e-mail — lien envoyé à l'inscription, bouton « Renvoyer » disponible dans votre espace.",
    );
  }
}
