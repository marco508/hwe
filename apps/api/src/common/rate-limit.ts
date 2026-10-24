import type { NextFunction, Request, Response } from "express";
import { normalizeEmail } from "./email.util";
import { requestLang, translateError } from "../i18n/i18n";

/**
 * Limitation de débit des routes sensibles d'authentification.
 *
 * Instance unique (pas de Redis) : compteurs en mémoire, fenêtre fixe.
 * Ne concerne QUE login / register / forgot / reset / verify /
 * send-verification — jamais `/auth/me` ni le reste de l'API (un utilisateur
 * actif était bloqué après ~60 pages). L'IP vient de `req.ip`, fiable grâce à
 * `trust proxy` (Traefik devant) : un en-tête X-Forwarded-For forgé par le
 * client ne crée plus de nouveau compteur à chaque essai.
 *
 * Monté APRÈS enableCors : la réponse 429 porte les en-têtes CORS (sinon le
 * navigateur n'y voit qu'une erreur réseau).
 */
export class FixedWindowLimiter {
  private readonly hits = new Map<string, { n: number; reset: number }>();

  constructor(
    readonly limit: number,
    readonly windowMs: number,
    private readonly maxKeys = 50_000,
  ) {}

  /** Compte un essai ; renvoie le délai d'attente (s) si la limite est dépassée, sinon 0. */
  hit(key: string, now = Date.now()): number {
    if (this.hits.size > this.maxKeys) this.prune(now);
    const entry = this.hits.get(key);
    if (!entry || now >= entry.reset) {
      this.hits.set(key, { n: 1, reset: now + this.windowMs });
      return 0;
    }
    entry.n++;
    if (entry.n > this.limit) return Math.max(1, Math.ceil((entry.reset - now) / 1000));
    return 0;
  }

  prune(now = Date.now()): void {
    for (const [k, v] of this.hits) if (now >= v.reset) this.hits.delete(k);
  }

  get size(): number {
    return this.hits.size;
  }
}

interface Rule {
  ip?: FixedWindowLimiter;
  /** Limite par e-mail (champ `email` du corps) */
  email?: FixedWindowLimiter;
}

const MIN = 60_000;

export function defaultAuthRules(): Record<string, Rule> {
  return {
    "/api/auth/login": {
      ip: new FixedWindowLimiter(30, 15 * MIN),
      email: new FixedWindowLimiter(10, 15 * MIN),
    },
    "/api/auth/register": { ip: new FixedWindowLimiter(10, 60 * MIN) },
    "/api/auth/forgot-password": {
      ip: new FixedWindowLimiter(10, 60 * MIN),
      email: new FixedWindowLimiter(5, 60 * MIN),
    },
    "/api/auth/reset-password": { ip: new FixedWindowLimiter(20, 15 * MIN) },
    "/api/auth/verify-email": { ip: new FixedWindowLimiter(30, 15 * MIN) },
    "/api/auth/send-verification": { ip: new FixedWindowLimiter(10, 60 * MIN) },
  };
}

/** Routes à paramètre (jeton dans l'URL) : même limitation, clé = motif. */
export function defaultPatternRules(): Array<[RegExp, Rule]> {
  return [
    [/^\/api\/auth\/owner-invite\/[^/]+\/activate$/, { ip: new FixedWindowLimiter(20, 15 * MIN) }],
    [/^\/api\/agencies\/invites\/[^/]+\/accept$/, { ip: new FixedWindowLimiter(20, 15 * MIN) }],
  ];
}

export function authRateLimitMiddleware(
  rules: Record<string, Rule> = defaultAuthRules(),
  patterns: Array<[RegExp, Rule]> = defaultPatternRules(),
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "POST") return next();
    const path = (req.originalUrl || req.url || "").split("?")[0]!.replace(/\/+$/, "");
    const rule = rules[path] ?? patterns.find(([re]) => re.test(path))?.[1];
    if (!rule) return next();

    const ip = req.ip || req.socket?.remoteAddress || "?";
    let wait = rule.ip ? rule.ip.hit(`ip:${ip}`) : 0;
    const email = normalizeEmail((req.body as { email?: unknown } | undefined)?.email);
    if (!wait && rule.email && email) wait = rule.email.hit(`email:${email}`);

    if (wait > 0) {
      res.setHeader("Retry-After", String(wait));
      const minutes = Math.ceil(wait / 60);
      res.status(429).json({
        statusCode: 429,
        code: "TOO_MANY_REQUESTS",
        message: translateError(`Trop de tentatives — réessayez dans ${minutes} minute(s).`, requestLang()),
      });
      return;
    }
    next();
  };
}
