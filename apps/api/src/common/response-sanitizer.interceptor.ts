import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, mergeMap } from "rxjs";
import { avatarUrlFromKey, mediaUrl } from "./media.util";
import { PRIVATE_FILE_KEYS, isFileRef, refToDataUrl } from "./file-store";
import { requestLang } from "../i18n/i18n";
import { localizeResponse } from "../i18n/labels";

/**
 * Défense en profondeur sur TOUTES les réponses JSON :
 *  - supprime toute clé `password` / `tokenVersion` (un `include: { owner: true }`
 *    oublié renvoyait le hash bcrypt du propriétaire au locataire) ;
 *  - remplace `avatarKey` par `avatarUrl` (URL publique servie par /media) ;
 *  - remplace l'`url` data: d'un média de bien par son URL publique ;
 *  - rend dans la langue de la requête les libellés stockés en français
 *    (honoraires, mentions de signature, périodes) — i18n/labels.ts ;
 *  - fichiers PRIVÉS stockés sur le volume (référence `hwef:` dans fileUrl,
 *    photoDataUrl, proofDataUrl) : remplacés par leur data-URL, comme avant
 *    (contrat JSON inchangé). Ces champs ne sont présents que dans les
 *    réponses déjà autorisées par les services ; rien n'est rendu public.
 */
export interface FileRefSlot {
  obj: Record<string, unknown>;
  key: string;
  ref: string;
}
const SECRET_KEYS = new Set(["password", "tokenVersion"]);

export function sanitizeResponse(value: unknown, depth = 0, refs?: FileRefSlot[]): unknown {
  if (value === null || typeof value !== "object" || depth > 32) return value;
  if (value instanceof Date || Buffer.isBuffer(value) || ArrayBuffer.isView(value)) return value;
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) value[i] = sanitizeResponse(value[i], depth + 1, refs);
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
    obj[k] = sanitizeResponse(obj[k], depth + 1, refs);
  }
  if ("avatarKey" in obj) {
    obj.avatarUrl = avatarUrlFromKey(obj.avatarKey as string | null);
    delete obj.avatarKey;
  } else if (typeof obj.avatarUrl === "string" && (obj.avatarUrl.startsWith("data:") || isFileRef(obj.avatarUrl))) {
    // Avatar brut sans clé connue : on ne renvoie jamais la data-URL.
    obj.avatarUrl = null;
  }
  if (
    typeof obj.url === "string" &&
    (obj.url.startsWith("data:") || isFileRef(obj.url)) &&
    typeof obj.id === "string" &&
    ("propertyId" in obj || "position" in obj)
  ) {
    obj.url = mediaUrl(obj.id);
  }
  // Références internes de fichiers publics : jamais renvoyées.
  for (const k of ["fileKey", "avatarFileKey", "logoFileKey"]) if (k in obj) delete obj[k];
  if (refs) {
    for (const k of PRIVATE_FILE_KEYS) {
      const v = obj[k];
      if (typeof v === "string" && isFileRef(v)) refs.push({ obj, key: k, ref: v });
    }
  }
  return obj;
}

/** Remplace les références de fichiers privés par leur data-URL (lecture disque asynchrone). */
export async function inlineFileRefs(refs: FileRefSlot[]): Promise<void> {
  if (refs.length === 0) return;
  const cache = new Map<string, Promise<string | null>>();
  await Promise.all(
    refs.map(async (r) => {
      let p = cache.get(r.ref);
      if (!p) cache.set(r.ref, (p = refToDataUrl(r.ref)));
      // Fichier manquant : null (journalisé par le stockage), jamais la référence.
      r.obj[r.key] = await p;
    }),
  );
}

@Injectable()
export class ResponseSanitizerInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const lang = requestLang();
    return next.handle().pipe(
      mergeMap(async (data) => {
        const refs: FileRefSlot[] = [];
        const clean = sanitizeResponse(data, 0, refs);
        await inlineFileRefs(refs);
        return localizeResponse(clean, lang);
      }),
    );
  }
}
