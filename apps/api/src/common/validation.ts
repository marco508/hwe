import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";
import { hasKey } from "../shared/hwe-types";
import { API_DICTS, requestLang, t, type Lang } from "../i18n/i18n";

/**
 * ValidationPipe global : champs inconnus refusés (forbidNonWhitelisted), et
 * messages lisibles par un utilisateur final dans la langue de la requête
 * (les messages par défaut de class-validator sont en anglais technique) :
 * clés `validation.*` et noms de champs `field.*` des dictionnaires i18n.
 */

/** Nom lisible d'un champ dans la langue (clés `field.<propriété>`), sinon la propriété. */
function label(prop: string, lang: Lang): string {
  const key = `field.${prop}`;
  const name = hasKey(API_DICTS, lang, key) ? t(lang, key) : prop;
  return t(lang, "validation.field", { field: name });
}

function firstNumber(msg: string): string {
  return /(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i.exec(msg)?.[1] ?? "";
}

const CONSTRAINT_KEYS: Record<string, string> = {
  whitelistValidation: "whitelistValidation",
  isNotEmpty: "isNotEmpty",
  isDefined: "isNotEmpty",
  maxLength: "maxLength",
  minLength: "minLength",
  max: "max",
  min: "min",
  isEmail: "isEmail",
  isString: "isString",
  isNumber: "isNumber",
  isInt: "isInt",
  isBoolean: "isBoolean",
  isEnum: "isEnum",
  isIn: "isEnum",
  isDateString: "isDateString",
  isISO8601: "isDateString",
  arrayMaxSize: "arrayMaxSize",
  arrayMinSize: "arrayMinSize",
  isArray: "isArray",
  matches: "matches",
  isLatitude: "isLatitude",
  isLongitude: "isLatitude",
  nestedValidation: "nestedValidation",
};

/** Message d'une contrainte class-validator, dans la langue de la requête (fr identique à l'historique). */
export function translateConstraint(prop: string, key: string, original: string, lang: Lang = requestLang()): string {
  const field = label(prop, lang);
  const n = firstNumber(original);
  // `count` : forme plurielle (« 1 caractère » / « 8 caractères ») selon la langue.
  return t(lang, `validation.${CONSTRAINT_KEYS[key] ?? "default"}`, { field, n, ...(n !== "" ? { count: Number(n) } : {}) });
}

export function flattenValidationErrors(errors: ValidationError[], parent = ""): string[] {
  const out: string[] = [];
  for (const e of errors) {
    const prop = e.property;
    for (const [key, msg] of Object.entries(e.constraints ?? {})) {
      out.push(translateConstraint(prop, key, msg));
    }
    if (e.children?.length) {
      out.push(...flattenValidationErrors(e.children, parent ? `${parent}.${prop}` : prop));
    }
  }
  return [...new Set(out)];
}

export function buildValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) =>
      new BadRequestException({
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: flattenValidationErrors(errors),
      }),
  });
}
