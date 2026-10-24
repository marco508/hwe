import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type { Response } from "express";
import { SUBSCRIPTION_CODES } from "./subscription";
import { requestLang, translateError } from "../i18n/i18n";

/**
 * Format d'erreur unique : `{ statusCode, message, code? }`.
 *
 * Les erreurs Prisma ne remontent plus en 500 :
 *  - P2002 (unicité) → 409, P2025 (introuvable) → 404, P2003 (lien) → 409 ;
 *  - valeur invalide (id mal formé, caractère nul, valeur hors bornes) → 400.
 * Une entrée invalide ne doit jamais produire de 500 ; seules les vraies
 * pannes (base injoignable, bug) en produisent, sans détail interne.
 */
export interface ErrorBody {
  statusCode: number;
  message: string | string[];
  code?: string;
}

const BAD_INPUT_PRISMA_CODES = new Set([
  "P2000", // valeur trop longue pour la colonne
  "P2005", "P2006", "P2007", "P2009", "P2011", "P2012", "P2019", "P2020", "P2023", "P2033",
]);

export function toErrorBody(exception: unknown): ErrorBody {
  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    const res = exception.getResponse();
    if (typeof res === "string") return { statusCode: status, message: res };
    const r = res as { message?: string | string[]; code?: string; error?: string };
    const body: ErrorBody = {
      statusCode: status,
      message: r.message ?? r.error ?? exception.message,
    };
    if (r.code) body.code = r.code;
    // Abonnement : toujours 402, même levé via une 403 de refus d'accès.
    if (r.code && SUBSCRIPTION_CODES.has(r.code)) body.statusCode = 402;
    return body;
  }

  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case "P2002":
        return { statusCode: 409, message: "Cet élément existe déjà.", code: "CONFLICT" };
      case "P2025":
      case "P2001":
      case "P2015":
      case "P2018":
        return { statusCode: 404, message: "Élément introuvable.", code: "NOT_FOUND" };
      case "P2003":
      case "P2014":
        return {
          statusCode: 409,
          message: "Opération impossible : cet élément est encore utilisé ailleurs.",
          code: "CONFLICT",
        };
      default:
        if (BAD_INPUT_PRISMA_CODES.has(exception.code)) {
          return { statusCode: 400, message: "Valeur invalide dans la requête.", code: "BAD_INPUT" };
        }
    }
    if (looksLikeBadInput(exception.message)) {
      return { statusCode: 400, message: "Valeur invalide dans la requête.", code: "BAD_INPUT" };
    }
  }

  if (exception instanceof Prisma.PrismaClientValidationError) {
    return { statusCode: 400, message: "Requête invalide.", code: "BAD_INPUT" };
  }

  if (exception instanceof Prisma.PrismaClientUnknownRequestError && looksLikeBadInput(exception.message)) {
    return { statusCode: 400, message: "Valeur invalide dans la requête.", code: "BAD_INPUT" };
  }

  if (exception instanceof Prisma.PrismaClientInitializationError) {
    return {
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: "Service momentanément indisponible, réessayez dans un instant.",
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Erreur interne — réessayez plus tard.",
  };
}

/** Message(s) traduit(s) dans la langue de la requête (catalogue i18n/errors). */
export function localizeErrorBody(body: ErrorBody, lang = requestLang()): ErrorBody {
  if (lang === "fr") return body;
  const message = Array.isArray(body.message)
    ? body.message.map((m) => translateError(String(m), lang))
    : translateError(String(body.message ?? ""), lang);
  return { ...body, message };
}

/** Erreurs PostgreSQL dues à la donnée envoyée (encodage, format, bornes). */
function looksLikeBadInput(message: string): boolean {
  return /invalid byte sequence|22021|22P02|22003|22007|22008|0x00|invalid input syntax|out of range|value too long/i.test(
    message || "",
  );
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger("Exceptions");

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const body = localizeErrorBody(toErrorBody(exception));
    if (body.statusCode >= 500) {
      this.logger.error(
        exception instanceof Error ? exception.stack || exception.message : String(exception),
      );
    }
    if (res.headersSent) return;
    res.status(body.statusCode).json(body);
  }
}
