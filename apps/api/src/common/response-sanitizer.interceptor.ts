import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { avatarUrlFromKey, mediaUrl } from "./media.util";
import { requestLang } from "../i18n/i18n";
import { localizeResponse } from "../i18n/labels";

/**
 * Défense en profondeur sur TOUTES les réponses JSON :
 *  - supprime toute clé `password` / `tokenVersion` (un `include: { owner: true }`
 *    oublié renvoyait le hash bcrypt du propriétaire au locataire) ;
 *  - remplace `avatarKey` par `avatarUrl` (URL publique servie par /media) ;
 *  - remplace l'`url` data: d'un média de bien par son URL publique ;
 *  - rend dans la langue de la requête les libellés stockés en français
 *    (honoraires, mentions de signature, périodes) — i18n/labels.ts.
 */
const SECRET_KEYS = new Set(["password", "tokenVersion"]);

export function sanitizeResponse(value: unknown, depth = 0): unknown {
  if (value === null || typeof value !== "object" || depth > 32) return value;
  if (value instanceof Date || Buffer.isBuffer(value) || ArrayBuffer.isView(value)) return value;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = sanitizeResponse(value[i], depth + 1);
    return value;
  }
  // Seuls les objets « simples » (résultats Prisma, littéraux) sont parcourus.
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) return value;

  const obj = value as Record<string, unknown>;
  for (const k of Object.keys(obj)) {
    if (SECRET_KEYS.has(k)) {
      delete obj[k];
      continue;
    }
    obj[k] = sanitizeResponse(obj[k], depth + 1);
  }
  if ("avatarKey" in obj) {
    obj.avatarUrl = avatarUrlFromKey(obj.avatarKey as string | null);
    delete obj.avatarKey;
  } else if (typeof obj.avatarUrl === "string" && obj.avatarUrl.startsWith("data:")) {
    // Avatar brut sans clé connue : on ne renvoie jamais la data-URL.
    obj.avatarUrl = null;
  }
  if (
    typeof obj.url === "string" &&
    obj.url.startsWith("data:") &&
    typeof obj.id === "string" &&
    ("propertyId" in obj || "position" in obj)
  ) {
    obj.url = mediaUrl(obj.id);
  }
  return obj;
}

@Injectable()
export class ResponseSanitizerInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const lang = requestLang();
    return next.handle().pipe(map((data) => localizeResponse(sanitizeResponse(data), lang)));
  }
}
