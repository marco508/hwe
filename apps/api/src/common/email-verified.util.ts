import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export const EMAIL_NOT_VERIFIED_MESSAGE =
  "Vérifiez d'abord votre adresse e-mail : ouvrez le lien reçu à l'inscription, ou demandez-en un nouveau avec « Renvoyer le lien ».";

/** 403 normalisée `{ statusCode: 403, code: "EMAIL_NOT_VERIFIED", message }`. */
export function emailNotVerified(): ForbiddenException {
  return new ForbiddenException({
    statusCode: 403,
    code: "EMAIL_NOT_VERIFIED",
    message: EMAIL_NOT_VERIFIED_MESSAGE,
  });
}

/**
 * Lève une 403 claire si l'e-mail du compte n'est pas vérifié.
 * Appliqué aux actions où l'identité e-mail engage : publier un bien,
 * envoyer une demande ou un message, demander une visite, accéder à son bail
 * et à ses loyers (le rattachement locataire↔bail repose sur l'e-mail).
 */
export async function assertEmailVerified(prisma: PrismaService, userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailVerifiedAt: true },
  });
  if (!user?.emailVerifiedAt) throw emailNotVerified();
}
