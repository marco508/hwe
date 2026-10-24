import type { NextFunction, Request, RequestHandler, Response } from "express";
import { langOfRequest, translateError } from "../i18n/i18n";
// Parseurs d'express (= body-parser), résolus via @nestjs/platform-express :
// avec pnpm, ni express ni body-parser ne sont des dépendances directes.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require(
  require.resolve("express", { paths: [require.resolve("@nestjs/platform-express")] }),
);
const bodyParser = { json: express.json, urlencoded: express.urlencoded };

/**
 * Limites de taille des corps JSON.
 *
 * 1 Mo partout (y compris sur /auth/login, sans authentification), et une
 * limite élevée UNIQUEMENT sur les routes qui reçoivent des fichiers en
 * data-URL. Avant : 50 Mo acceptés sur toutes les routes.
 */
export const UPLOAD_ROUTES: Array<[string, RegExp]> = [
  ["POST", /^\/api\/properties$/], // création de bien (photos)
  ["PATCH", /^\/api\/properties\/[^/]+$/], // édition de bien (photos)
  ["POST", /^\/api\/properties\/[^/]+\/documents$/], // documents du bien
  ["PATCH", /^\/api\/properties\/[^/]+\/documents\/[^/]+$/],
  ["POST", /^\/api\/users\/me\/documents$/], // pièces du dossier
  ["PATCH", /^\/api\/users\/me$/], // avatar
  ["PATCH", /^\/api\/agencies\/me$/], // logo d'agence
  ["POST", /^\/api\/mandates\/with-new-owner$/], // bien créé par un pro (photos)
  ["POST", /^\/api\/leases\/[^/]+\/insurances$/], // attestation d'assurance
  ["POST", /^\/api\/rents\/[^/]+\/declare$/], // justificatif de loyer
  ["POST", /^\/api\/leases\/[^/]+\/tickets$/], // photo d'incident
];

export function isUploadRoute(method: string, path: string): boolean {
  const p = path.split("?")[0]!.replace(/\/+$/, "");
  return UPLOAD_ROUTES.some(([m, re]) => m === method.toUpperCase() && re.test(p));
}

export function bodyParserMiddleware(opts: { defaultLimit: string; uploadLimit: string }): RequestHandler {
  const small = bodyParser.json({ limit: opts.defaultLimit });
  const big = bodyParser.json({ limit: opts.uploadLimit });
  const form = bodyParser.urlencoded({ limit: opts.defaultLimit, extended: true });

  return (req: Request, res: Response, next: NextFunction) => {
    const onError = (err?: { type?: string; status?: number }) => {
      if (!err) return next();
      if (err.type === "entity.too.large" || err.status === 413) {
        res.status(413).json({
          statusCode: 413,
          code: "PAYLOAD_TOO_LARGE",
          message: translateError("Envoi trop volumineux — réduisez la taille ou le nombre des fichiers.", langOfRequest(req)),
        });
        return;
      }
      res.status(400).json({
        statusCode: 400,
        code: "BAD_INPUT",
        message: translateError("Corps de requête invalide (JSON mal formé).", langOfRequest(req)),
      });
    };
    const parser = isUploadRoute(req.method, req.originalUrl || req.url) ? big : small;
    parser(req, res, (err?: { type?: string; status?: number }) => {
      if (err) return onError(err);
      form(req, res, onError);
    });
  };
}

/** Refuse les URL contenant un caractère nul ou de contrôle (sinon 500 en base). */
export function rejectControlCharsInUrl(req: Request, res: Response, next: NextFunction) {
  let decoded: string;
  try {
    decoded = decodeURIComponent(req.originalUrl || req.url || "");
  } catch {
    res.status(400).json({ statusCode: 400, code: "BAD_INPUT", message: translateError("Adresse de requête invalide.", langOfRequest(req)) });
    return;
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(decoded)) {
    res.status(400).json({ statusCode: 400, code: "BAD_INPUT", message: translateError("Adresse de requête invalide.", langOfRequest(req)) });
    return;
  }
  next();
}
