import { Controller, Get, Header, Logger, Query, Req, Res } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { randomBytes } from "node:crypto";
import type { Request, Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { hashPassword } from "../common/password";
import { jwtSecret } from "../common/jwt-secret.util";
import { requestLang } from "../i18n/i18n";
import { DKP_DEFAULT_LINKS, dkpEnv, dkpLoginEnabled, dkpPaymentsEnabled, dkpRedirectUri, parsePartnerKeys } from "./dkp-env";
import {
  DKP_STATE_COOKIE,
  DKP_STATE_TTL_MS,
  DkpSpace,
  DkpUserRow,
  DkpUserStore,
  newPkce,
  readCookie,
  readState,
  resolveDkpUser,
  safeInternalPath,
  signState,
} from "./dkp-auth";
import { exchangeCode } from "./hub";

const USER_ROW = { id: true, email: true, role: true, dkpSub: true, emailVerifiedAt: true, activatedAt: true } as const;

export function frontBase(space: DkpSpace): string {
  const v =
    space === "owner"
      ? process.env.OWNER_WEB_URL || "https://owner.hwe.dkpsolution.tech"
      : process.env.TENANT_WEB_URL || "https://tenant.hwe.dkpsolution.tech";
  return v.replace(/\/+$/, "");
}

/** Magasin Prisma des règles de rattachement (dkp-auth.ts). */
export function prismaDkpStore(prisma: PrismaService): DkpUserStore {
  return {
    findBySub: (sub) => prisma.user.findUnique({ where: { dkpSub: sub }, select: USER_ROW }),
    findByEmail: async (email) =>
      (await prisma.user.findUnique({ where: { email }, select: USER_ROW })) ??
      prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } }, orderBy: { createdAt: "asc" }, select: USER_ROW }),
    link: (id, data) => prisma.user.update({ where: { id }, data, select: USER_ROW }),
    create: async (data) =>
      prisma.user.create({
        data: {
          ...data,
          // Mot de passe aléatoire jamais communiqué : inutilisable (« mot de passe oublié » pour en choisir un).
          password: await hashPassword(randomBytes(32).toString("base64url")),
          activatedAt: new Date(),
          locale: requestLang(),
        },
        select: USER_ROW,
      }) as Promise<DkpUserRow>,
  };
}

/**
 * Configuration publique de l'écosystème (fronts) : quels boutons et liens
 * afficher. Aucun secret ici.
 */
@Controller("dkp")
export class DkpConfigController {
  @Get("config")
  @Header("Cache-Control", "public, max-age=60")
  config() {
    const c = dkpEnv();
    const services = c.publicUrl
      ? {
          account: `${c.publicUrl}/compte`,
          links: {
            zemi: c.zemiUrl || DKP_DEFAULT_LINKS.zemi,
            afrochina: c.afrochinaUrl || DKP_DEFAULT_LINKS.afrochina,
            gestipro: c.gestiproPublic || DKP_DEFAULT_LINKS.gestipro,
            familyfe: c.familyfeUrl || DKP_DEFAULT_LINKS.familyfe,
          },
        }
      : null;
    return {
      login: dkpLoginEnabled(),
      payments: dkpPaymentsEnabled(),
      services,
      zemi: c.zemiUrl || null,
      afrochina: c.afrochinaUrl ? `${c.afrochinaUrl}${c.afrochinaPath.startsWith("/") ? "" : "/"}${c.afrochinaPath}` : null,
      gestipro: !!c.gestiproApi,
      familyfe: parsePartnerKeys(process.env.DKP_PARTNER_KEYS).has("familyfe")
        ? { url: c.familyfeUrl || (c.publicUrl ? DKP_DEFAULT_LINKS.familyfe : null) }
        : null,
    };
  }
}

/** « Continuer avec un compte DKP » (contrat §1.1). */
@Controller("auth/dkp")
export class DkpAuthController {
  private readonly logger = new Logger("DkpAuth");

  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}

  private cookie(res: Response, value: string, maxAgeMs: number) {
    const secure = (process.env.PUBLIC_API_URL ?? "").startsWith("https:") || process.env.NODE_ENV === "production";
    res.setHeader(
      "Set-Cookie",
      `${DKP_STATE_COOKIE}=${encodeURIComponent(value)}; Path=/api/auth/dkp; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(maxAgeMs / 1000)}${secure ? "; Secure" : ""}`,
    );
  }

  private fail(res: Response, space: DkpSpace, code: string) {
    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, `${frontBase(space)}/login?dkp_error=${encodeURIComponent(code)}`);
  }

  @Get("start")
  start(@Query("space") spaceRaw: string, @Query("next") next: string, @Res() res: Response) {
    const space: DkpSpace = spaceRaw === "owner" ? "owner" : "tenant";
    if (!dkpLoginEnabled()) return this.fail(res, space, "disabled");
    const { verifier, challenge, state } = newPkce();
    const c = dkpEnv();
    this.cookie(res, signState({ s: state, v: verifier, sp: space, n: safeInternalPath(next), e: Date.now() + DKP_STATE_TTL_MS }, jwtSecret()), DKP_STATE_TTL_MS);
    const u = new URL(`${c.publicUrl}/compte/autoriser`);
    u.searchParams.set("response_type", "code");
    u.searchParams.set("client_id", c.clientId);
    u.searchParams.set("redirect_uri", dkpRedirectUri());
    u.searchParams.set("state", state);
    u.searchParams.set("code_challenge", challenge);
    u.searchParams.set("code_challenge_method", "S256");
    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, u.toString());
  }

  @Get("callback")
  async callback(@Req() req: Request, @Res() res: Response) {
    const q = req.query as Record<string, string | undefined>;
    const st = readState(readCookie(req.headers.cookie, DKP_STATE_COOKIE), jwtSecret());
    // Cookie consommé dans tous les cas (usage unique).
    this.cookie(res, "", 0);
    const space: DkpSpace = st?.sp ?? "tenant";
    if (!dkpLoginEnabled()) return this.fail(res, space, "disabled");
    if (!st || typeof q.state !== "string" || q.state !== st.s) return this.fail(res, space, "state");
    if (q.error) return this.fail(res, space, q.error === "access_denied" ? "denied" : "hub");
    if (typeof q.code !== "string" || !q.code) return this.fail(res, space, "hub");

    let claims;
    try {
      claims = (await exchangeCode(q.code, dkpRedirectUri(), st.v)).user;
    } catch (e) {
      this.logger.warn(`Échange du code DKP refusé : ${(e as Error).message}`);
      return this.fail(res, space, "hub");
    }
    let result;
    try {
      result = await resolveDkpUser(prismaDkpStore(this.prisma), claims, space);
    } catch (e) {
      // Course : compte créé entre-temps avec la même adresse ou le même sub.
      if ((e as Prisma.PrismaClientKnownRequestError)?.code === "P2002") return this.fail(res, space, "conflict");
      throw e;
    }
    if ("error" in result) return this.fail(res, space, result.error);
    if (result.created) this.logger.log(`Compte créé via Compte DKP (${result.user.role}) : ${result.user.id}`);
    else if (result.linked) this.logger.log(`Compte ${result.user.id} lié à un Compte DKP.`);

    const session = await this.auth.sessionFor(result.user.id);
    const frag = new URLSearchParams({ access: session.accessToken, next: st.n || "" });
    res.setHeader("Cache-Control", "no-store");
    // Fragment : le jeton n'apparaît ni dans les journaux ni dans le Referer.
    return res.redirect(302, `${frontBase(space)}/auth/dkp#${frag.toString()}`);
  }
}
