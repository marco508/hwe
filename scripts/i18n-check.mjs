#!/usr/bin/env node
// Contrôle des fichiers de langue (aucune dépendance : node scripts/i18n-check.mjs).
//
// Pour chaque dictionnaire (app, packages/ui, textes juridiques, contrat de
// bail, API) et chaque langue, compare au français (référence) :
//   - clés MANQUANTES (= à traduire ; le repli langue → en → fr s'applique) ;
//   - clés EN TROP (absentes de fr : faute de frappe ou clé supprimée) ;
//   - placeholders {x} incohérents : inconnus de fr (erreur) ou omis par la
//     traduction (signalé ; parfois voulu : accord du pluriel français…).
//
// Options :
//   --verbose          liste les clés concernées
//   --lang=es          une seule langue
//   --json             sortie JSON (outillage)
//   --strict           code de sortie 1 aussi pour des clés manquantes (es/pt/ar)
//   --sync-api-errors  régénère apps/api/src/i18n/errors/fr.json (catalogue des
//                      messages d'erreur écrits en français dans le code de l'API)
//
// Code de sortie 1 : clé en trop, placeholder incohérent, clé manquante en
// anglais (en doit rester complet), catalogue d'erreurs API périmé.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LANGS = ["en", "es", "pt", "ar"];
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const onlyLang = args.find((a) => a.startsWith("--lang="))?.split("=")[1];
const verbose = has("--verbose") || has("-v");

/** Dictionnaires : nom → dossier contenant <langue>.json. */
const GROUPS = [
  ["landing", "apps/landing/src/lib/i18n-locales"],
  ["landing/legal", "apps/landing/src/lib/legal-locales"],
  ["owner-web", "apps/owner-web/src/lib/i18n-locales"],
  ["tenant-web", "apps/tenant-web/src/lib/i18n-locales"],
  ["ui", "packages/ui/src/i18n-locales"],
  ["ui/pro", "packages/ui/src/pro-dict-locales"],
  ["types/lease", "packages/types/src/lease-locales"],
  ["api", "apps/api/src/i18n/locales"],
  ["api/errors", "apps/api/src/i18n/errors"],
];

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`JSON invalide : ${path.relative(ROOT, file)} — ${e.message}`);
    process.exitCode = 1;
    return {};
  }
}

/** Aplatit un arbre (textes juridiques) : chemins « doc.sections.0.blocks.1 ». Les `id` ne se traduisent pas. */
function flatten(obj, prefix = "", out = {}) {
  if (typeof obj === "string") {
    out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, prefix ? `${prefix}.${i}` : String(i), out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (k === "id" && typeof v === "string") continue;
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

const placeholders = (s) => [...new Set([...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]))].sort();

// ───────────── Catalogue des messages d'erreur de l'API ─────────────

/** Lit les littéraux (chaînes, gabarits) d'un fichier TS, avec leur contexte. */
function extractApiMessages(src) {
  const out = [];
  let i = 0;
  const n = src.length;
  const stack = []; // parenthèses ouvertes : true si appel …Exception(
  let group = null; // { parts: [], start }
  const flush = (end) => {
    if (!group) return;
    const text = group.parts.join("");
    const ctx = group.ctx;
    if (ctx && /\s/.test(text) && /[a-zà-ÿ]/i.test(text)) out.push(text);
    group = null;
  };
  const contextAt = (pos) => {
    // Contexte d'erreur : dans un appel …Exception(…), après `message:` ou `…MESSAGE =`.
    if (stack.some(Boolean)) return true;
    const before = src.slice(Math.max(0, pos - 80), pos);
    if (/message\s*:\s*$/.test(before)) return true;
    // Table de messages par code (« PLAN_LIMIT_AGENTS: "…" »).
    if (/\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\s*:\s*$/.test(before)) return true;
    if (/[A-Z_]*MESSAGE\s*=\s*$/.test(before)) return true;
    return false;
  };
  const exprName = (expr, used) => {
    const ids = expr.replace(/\(.*$/s, "").match(/[A-Za-z_$][\w$]*/g) || ["x"];
    let name = ids[ids.length - 1].replace(/\$/g, "") || "x";
    let k = name;
    let c = 2;
    while (used.has(k)) k = `${name}${c++}`;
    used.add(k);
    return k;
  };
  while (i < n) {
    const ch = src[i];
    const next = src[i + 1];
    if (ch === "/" && next === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      i = src.indexOf("*/", i + 2);
      i = i < 0 ? n : i + 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      let s = "";
      while (j < n && src[j] !== ch) {
        if (src[j] === "\\") {
          const e = src[j + 1];
          s += e === "n" ? "\n" : e === "t" ? "\t" : e;
          j += 2;
          continue;
        }
        s += src[j++];
      }
      if (!group) group = { parts: [], ctx: contextAt(i), used: new Set() };
      group.parts.push(s);
      i = j + 1;
      continue;
    }
    if (ch === "`") {
      let j = i + 1;
      let s = "";
      if (!group) group = { parts: [], ctx: contextAt(i), used: new Set() };
      while (j < n && src[j] !== "`") {
        if (src[j] === "\\") {
          const e = src[j + 1];
          s += e === "n" ? "\n" : e;
          j += 2;
          continue;
        }
        if (src[j] === "$" && src[j + 1] === "{") {
          let depth = 1;
          let k = j + 2;
          while (k < n && depth > 0) {
            if (src[k] === "{") depth++;
            else if (src[k] === "}") depth--;
            k++;
          }
          s += `{${exprName(src.slice(j + 2, k - 1), group.used)}}`;
          j = k;
          continue;
        }
        s += src[j++];
      }
      group.parts.push(s);
      i = j + 1;
      continue;
    }
    if (group) {
      // Concaténation : seuls blancs et « + » entre deux littéraux.
      if (/\s/.test(ch)) {
        i++;
        continue;
      }
      if (ch === "+") {
        let k = i + 1;
        while (k < n && /\s/.test(src[k])) k++;
        if (src[k] === '"' || src[k] === "'" || src[k] === "`") {
          i = k;
          continue;
        }
      }
      flush(i);
    }
    if (ch === "(") {
      const before = src.slice(Math.max(0, i - 40), i);
      // Appel …Exception(…) ou assistant qui construit une erreur (deny, bad, exists, subscriptionError).
      stack.push(/(Exception|\bdeny|\bbad|\bexists|\bsubscriptionError|\btranslateError)\s*$/.test(before));
    } else if (ch === ")") {
      stack.pop();
    }
    i++;
  }
  flush(n);
  return out;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".ts") && !e.name.endsWith(".spec.ts") && !e.name.endsWith(".d.ts")) acc.push(p);
  }
  return acc;
}

function apiErrorCatalogue() {
  const msgs = new Set();
  for (const f of walk(path.join(ROOT, "apps/api/src"))) {
    if (f.includes(`${path.sep}i18n${path.sep}`)) continue;
    for (const m of extractApiMessages(fs.readFileSync(f, "utf8"))) msgs.add(m);
  }
  return Object.fromEntries([...msgs].sort((a, b) => a.localeCompare(b, "fr")).map((m) => [m, m]));
}

const errorsDir = path.join(ROOT, "apps/api/src/i18n/errors");
let staleCatalogue = false;
if (fs.existsSync(errorsDir)) {
  const cat = apiErrorCatalogue();
  const file = path.join(errorsDir, "fr.json");
  const current = readJson(file) || {};
  const same = JSON.stringify(Object.keys(current).sort()) === JSON.stringify(Object.keys(cat).sort());
  if (has("--sync-api-errors")) {
    fs.writeFileSync(file, JSON.stringify(cat, null, 2) + "\n");
    if (!same) console.log(`api/errors : catalogue fr.json régénéré (${Object.keys(cat).length} messages).`);
  } else if (!same) {
    staleCatalogue = true;
    const add = Object.keys(cat).filter((k) => !(k in current));
    const del = Object.keys(current).filter((k) => !(k in cat));
    console.log(
      `api/errors : catalogue fr.json périmé (+${add.length} / -${del.length}) — lancez « node scripts/i18n-check.mjs --sync-api-errors ».`,
    );
    if (verbose) for (const k of [...add.map((k) => `+ ${k}`), ...del.map((k) => `- ${k}`)]) console.log(`    ${k}`);
  }
}

// ───────────── Comparaison ─────────────

const report = [];
const totals = Object.fromEntries(LANGS.map((l) => [l, 0]));
let failing = staleCatalogue;
for (const [name, rel] of GROUPS) {
  const dir = path.join(ROOT, rel);
  if (!fs.existsSync(dir)) {
    report.push({ group: name, error: `dossier absent : ${rel}` });
    failing = true;
    continue;
  }
  const fr = flatten(readJson(path.join(dir, "fr.json")) || {});
  const refKeys = Object.keys(fr);
  for (const lang of LANGS) {
    if (onlyLang && lang !== onlyLang) continue;
    const raw = readJson(path.join(dir, `${lang}.json`));
    if (raw === null) {
      report.push({ group: name, lang, error: `fichier absent : ${rel}/${lang}.json` });
      failing = true;
      continue;
    }
    const dict = flatten(raw);
    const missing = refKeys.filter((k) => typeof dict[k] !== "string" || dict[k].trim() === "");
    const extra = Object.keys(dict).filter((k) => !(k in fr));
    const badPh = refKeys
      .filter((k) => typeof dict[k] === "string" && dict[k].trim() !== "")
      .filter((k) => placeholders(fr[k]).join() !== placeholders(dict[k]).join())
      .map((k) => {
        const a = placeholders(fr[k]);
        const b = placeholders(dict[k]);
        return { key: k, fr: a, [lang]: b, unknown: b.filter((x) => !a.includes(x)) };
      });
    totals[lang] += missing.length;
    const unknownPh = badPh.filter((p) => p.unknown.length > 0);
    if (extra.length || unknownPh.length || (lang === "en" && missing.length)) failing = true;
    if (has("--strict") && missing.length) failing = true;
    report.push({ group: name, lang, total: refKeys.length, missing, extra, placeholders: badPh });
  }
}

if (has("--json")) {
  console.log(JSON.stringify({ report, totals, failing }, null, 2));
} else {
  const pad = (s, w) => String(s).padEnd(w);
  console.log(`${pad("dictionnaire", 15)}${pad("langue", 8)}${pad("clés fr", 9)}${pad("manquantes", 12)}${pad("en trop", 9)}placeholders (inconnus/omis)`);
  for (const r of report) {
    if (r.error) {
      console.log(`${pad(r.group, 15)}${pad(r.lang ?? "", 8)}${r.error}`);
      continue;
    }
    console.log(
      `${pad(r.group, 15)}${pad(r.lang, 8)}${pad(r.total, 9)}${pad(r.missing.length, 12)}${pad(r.extra.length, 9)}${r.placeholders.filter((p) => p.unknown.length).length}/${r.placeholders.filter((p) => !p.unknown.length).length}`,
    );
    if (verbose) {
      for (const k of r.missing) console.log(`    manquante : ${k}`);
      for (const k of r.extra) console.log(`    en trop   : ${k}`);
      for (const p of r.placeholders)
        console.log(
          `    placeholders ${p.unknown.length ? "INCONNUS" : "omis"} : ${p.key} — fr {${p.fr.join("},{")}} / ${r.lang} {${p[r.lang].join("},{")}}`,
        );
    }
  }
  console.log(`\nClés à traduire par langue : ${LANGS.filter((l) => !onlyLang || l === onlyLang).map((l) => `${l} ${totals[l]}`).join(" · ")}`);
}
process.exit(failing ? 1 : 0);
