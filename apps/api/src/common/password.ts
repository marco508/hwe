/**
 * Hachage des mots de passe : module NATIF `bcrypt`, exécuté dans le pool de
 * threads libuv (n'occupe plus la boucle d'événements : avec bcryptjs, ~10
 * connexions/s suffisaient à figer toute l'API).
 *
 * Compatibilité : les hachages existants ($2a$ produits par bcryptjs, $2b$)
 * restent vérifiables tels quels — même algorithme, même coût, mêmes 72
 * premiers octets UTF-8 ; aucun mot de passe à réinitialiser.
 *
 * Concurrence bornée (PASSWORD_HASH_CONCURRENCY, défaut 2) : au plus N
 * hachages simultanés, pour laisser au reste de l'API (et aux lectures de
 * fichiers, qui partagent le même pool de threads) le temps processeur et les
 * threads disponibles ; les demandes en trop attendent leur tour.
 */
import * as bcrypt from "bcrypt";

export const BCRYPT_COST = 10;

const MAX = Math.max(1, Number(process.env.PASSWORD_HASH_CONCURRENCY ?? 2) || 2);
let running = 0;
const waiting: Array<() => void> = [];

async function limited<T>(fn: () => Promise<T>): Promise<T> {
  if (running >= MAX) await new Promise<void>((r) => waiting.push(r));
  running++;
  try {
    return await fn();
  } finally {
    running--;
    waiting.shift()?.();
  }
}

export function hashPassword(password: string, cost = BCRYPT_COST): Promise<string> {
  return limited(() => bcrypt.hash(password, cost));
}

/** false (jamais d'exception) si le hachage stocké est absent ou mal formé. */
export async function verifyPassword(password: string, hash: string | null | undefined): Promise<boolean> {
  if (typeof hash !== "string" || !/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash)) return false;
  try {
    return await limited(() => bcrypt.compare(password, hash));
  } catch {
    return false;
  }
}

/** Hachage fictif (même coût) pour un temps de réponse identique sans compte. */
export const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", BCRYPT_COST);
