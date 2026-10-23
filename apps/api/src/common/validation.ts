import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";

/**
 * ValidationPipe global : champs inconnus refusés (forbidNonWhitelisted), et
 * messages traduits en français lisible par un utilisateur final (les
 * messages par défaut de class-validator sont en anglais technique).
 */

const LABELS: Record<string, string> = {
  email: "e-mail",
  password: "mot de passe",
  firstName: "prénom",
  lastName: "nom",
  phone: "téléphone",
  title: "titre",
  description: "description",
  price: "prix",
  surface: "surface",
  rooms: "pièces",
  bedrooms: "chambres",
  bathrooms: "salles de bain",
  addressLine: "adresse",
  city: "ville",
  postalCode: "code postal",
  country: "pays",
  currency: "devise",
  message: "message",
  content: "message",
  note: "note",
  notes: "notes",
  name: "nom",
  label: "libellé",
  value: "valeur",
  reference: "identifiant de transaction",
  startDate: "date de début",
  endDate: "date de fin",
  monthlyRent: "loyer mensuel",
  charges: "charges",
  deposit: "caution",
  tenantEmail: "e-mail du locataire",
  tenantFirstName: "prénom du locataire",
  tenantLastName: "nom du locataire",
  contactEmail: "e-mail de contact",
  specialClauses: "clauses particulières",
  proposedAt: "date de visite",
  url: "adresse du média",
  avatarUrl: "avatar",
  fileUrl: "fichier",
  media: "photos",
  amount: "montant",
  rates: "tarifs",
  status: "statut",
  token: "lien",
};

function label(prop: string): string {
  return `« ${LABELS[prop] ?? prop} »`;
}

function firstNumber(msg: string): string {
  return /(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i.exec(msg)?.[1] ?? "";
}

export function translateConstraint(prop: string, key: string, original: string): string {
  const f = label(prop);
  const n = firstNumber(original);
  switch (key) {
    case "whitelistValidation":
      return `Champ non autorisé : ${f}.`;
    case "isNotEmpty":
    case "isDefined":
      return `${f} est requis.`;
    case "maxLength":
      return `${f} : ${n} caractères maximum.`;
    case "minLength":
      return `${f} : ${n} caractères minimum.`;
    case "max":
      return `${f} : valeur maximale ${n}.`;
    case "min":
      return `${f} : valeur minimale ${n}.`;
    case "isEmail":
      return `${f} : adresse e-mail invalide.`;
    case "isString":
      return `${f} doit être un texte.`;
    case "isNumber":
      return `${f} doit être un nombre.`;
    case "isInt":
      return `${f} doit être un nombre entier.`;
    case "isBoolean":
      return `${f} doit être vrai ou faux.`;
    case "isEnum":
    case "isIn":
      return `${f} : valeur non reconnue.`;
    case "isDateString":
    case "isISO8601":
      return `${f} : date invalide.`;
    case "arrayMaxSize":
      return `${f} : ${n} éléments maximum.`;
    case "arrayMinSize":
      return `${f} : ${n} élément(s) minimum.`;
    case "isArray":
      return `${f} doit être une liste.`;
    case "matches":
      return `${f} : format invalide.`;
    case "isLatitude":
    case "isLongitude":
      return `${f} : coordonnée invalide.`;
    case "nestedValidation":
      return `${f} : contenu invalide.`;
    default:
      return `${f} : valeur invalide.`;
  }
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
