"use client";

import * as React from "react";
import {
  LANGS,
  LANG_INFO,
  countryName,
  isLang,
  pickLang,
  translate,
  type Dict,
  type Dicts,
  type Lang,
} from "@hwe/types";
import uiFr from "../i18n-locales/fr.json";
import uiEn from "../i18n-locales/en.json";
import uiEs from "../i18n-locales/es.json";
import uiPt from "../i18n-locales/pt.json";
import uiAr from "../i18n-locales/ar.json";
import proFr from "../pro-dict-locales/fr.json";
import proEn from "../pro-dict-locales/en.json";
import proEs from "../pro-dict-locales/es.json";
import proPt from "../pro-dict-locales/pt.json";
import proAr from "../pro-dict-locales/ar.json";
import { Icon } from "./Icon";

/**
 * i18n maison : dictionnaires plats (un fichier JSON par langue) + t() avec
 * interpolation {param}. La langue est appliquée PENDANT le rendu du provider
 * pour que tous les enfants lisent la bonne langue.
 *
 * - Langues : fr (référence), en, es, pt, ar (RTL). Repli : langue → en → fr.
 * - Choix mémorisé dans un cookie du DOMAINE PARENT (hwe, owner.hwe et
 *   tenant.hwe partagent le choix), localStorage en secours. Première visite :
 *   navigator.languages, sinon fr.
 * - Connecté : le choix est enregistré dans User.locale (voir client/auth) ;
 *   à la connexion, User.locale l'emporte.
 *
 * Chaque app appelle createI18n(ses dictionnaires) et exporte t/LangProvider/useLang.
 */

export type { Lang };
export { LANGS, LANG_INFO };

const LANG_KEY = "hwe.lang";
export const LANG_COOKIE = "hwe_lang";

/** Événements : choix de l'utilisateur (à enregistrer) ; demande externe (connexion). */
export const LANG_EVENTS = {
  changed: "hwe:lang-changed",
  request: "hwe:lang-request",
} as const;

// ── Préférences partagées entre les apps (cookie du domaine parent) ──

/**
 * Domaine du cookie : le domaine parent commun aux trois apps
 * (owner.hwe.x, tenant.hwe.x et hwe.x → hwe.x). En local (localhost, IP,
 * nom sans point) : pas d'attribut domain. NEXT_PUBLIC_COOKIE_DOMAIN force la valeur.
 */
export function prefCookieDomain(hostname?: string): string | undefined {
  const forced = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN : undefined;
  if (forced) return forced;
  const h = (hostname ?? (typeof window !== "undefined" ? window.location.hostname : "")).toLowerCase();
  if (!h || !h.includes(".") || h === "localhost" || h.endsWith(".localhost") || /^[\d.]+$/.test(h) || h.includes(":")) {
    return undefined;
  }
  const parts = h.split(".");
  if (parts.length >= 3 && ["owner", "tenant", "www", "landing", "app"].includes(parts[0]!)) {
    return parts.slice(1).join(".");
  }
  return h;
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]!) : null;
  } catch {
    return null;
  }
}

export function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  try {
    const domain = prefCookieDomain();
    document.cookie =
      `${name}=${encodeURIComponent(value)}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax` +
      (domain ? `; domain=${domain}` : "") +
      (window.location.protocol === "https:" ? "; Secure" : "");
  } catch {
    /* cookies indisponibles */
  }
}

/** Préférence : cookie partagé, sinon localStorage (secours). */
export function readPref(cookie: string, storageKey: string): string | null {
  const c = readCookie(cookie);
  if (c) return c;
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function writePref(cookie: string, storageKey: string, value: string) {
  writeCookie(cookie, value);
  try {
    window.localStorage.setItem(storageKey, value);
  } catch {
    /* best effort */
  }
}

/** Langue de départ : choix mémorisé, sinon navigator.languages, sinon fr. */
export function initialLang(): Lang {
  const saved = readPref(LANG_COOKIE, LANG_KEY);
  if (isLang(saved)) return saved;
  try {
    const l = pickLang(navigator.languages?.length ? navigator.languages : [navigator.language]);
    if (l) return l;
  } catch {
    /* navigateur sans navigator.languages */
  }
  return "fr";
}

// ── Traduction des composants partagés (packages/ui) ──
// Les composants du design system ne peuvent pas importer le i18n d'une app :
// ils lisent cette langue module, posée par le LangProvider pendant le rendu.
let uiLang: Lang = "fr";

export function setUiLang(l: Lang) {
  uiLang = l;
}

/** Langue courante des composants partagés (formatteurs, messages d'erreur). */
export function getUiLang(): Lang {
  return uiLang;
}

/** Sens d'écriture de la langue courante. */
export function uiDir(): "ltr" | "rtl" {
  return LANG_INFO[uiLang].dir;
}

/** Nom du pays dans la langue courante : `code` ISO 3166-1 alpha-2, `frName` en repli. */
export function countryLabel(code: string, frName: string): string {
  return countryName(code, uiLang, frName) || frName;
}

/** Dictionnaire des textes des composants partagés (+ module Professionnels). */
export const UI_DICT: Record<Lang, Dict> = {
  fr: { ...(uiFr as Dict), ...(proFr as Dict) },
  en: { ...(uiEn as Dict), ...(proEn as Dict) },
  es: { ...(uiEs as Dict), ...(proEs as Dict) },
  pt: { ...(uiPt as Dict), ...(proPt as Dict) },
  ar: { ...(uiAr as Dict), ...(proAr as Dict) },
};

export function tUi(key: string, params?: Record<string, string | number>): string {
  return translate(UI_DICT, uiLang, key, params);
}

/** Demande un changement de langue depuis l'extérieur du provider (connexion : User.locale). */
export function requestLang(l: Lang) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LANG_EVENTS.request, { detail: { lang: l } }));
}

export function createI18n(dicts: Dicts) {
  let locale: Lang = "fr";

  function t(key: string, params?: Record<string, string | number>): string {
    return translate(dicts, locale, key, params);
  }

  const Ctx = React.createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
    lang: "fr",
    setLang: () => {},
  });

  function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = React.useState<Lang>("fr");
    const resolved = React.useRef(false);

    // Choix persisté, appliqué après le montage (rendu serveur = fr).
    React.useEffect(() => {
      const l = initialLang();
      resolved.current = true;
      setLangState(l);
      applyDocument(l);
    }, []);

    // Attributs lang/dir du document (lecteurs d'écran, césure, RTL).
    React.useEffect(() => {
      if (resolved.current) applyDocument(lang);
    }, [lang]);

    // Pendant le rendu, avant les enfants : ils lisent t() dans la bonne langue.
    locale = lang;
    setUiLang(lang);

    const apply = React.useCallback((l: Lang, source: "user" | "external") => {
      setLangState(l);
      writePref(LANG_COOKIE, LANG_KEY, l);
      if (source === "user" && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(LANG_EVENTS.changed, { detail: { lang: l } }));
      }
    }, []);

    const setLang = React.useCallback((l: Lang) => apply(l, "user"), [apply]);

    React.useEffect(() => {
      const onRequest = (e: Event) => {
        const l = (e as CustomEvent<{ lang?: string }>).detail?.lang;
        if (isLang(l)) apply(l, "external");
      };
      window.addEventListener(LANG_EVENTS.request, onRequest);
      return () => window.removeEventListener(LANG_EVENTS.request, onRequest);
    }, [apply]);

    // `key={lang}` : les pages appellent t() sans s'abonner au contexte ; on
    // remonte donc l'arbre au changement de langue pour tout retraduire.
    return (
      <Ctx.Provider value={{ lang, setLang }}>
        <React.Fragment key={lang}>{children}</React.Fragment>
      </Ctx.Provider>
    );
  }

  function useLang() {
    return React.useContext(Ctx);
  }

  /** Menu des langues (nom natif), à poser dans une navbar ou un tiroir. */
  function LangSwitch({ className = "" }: { className?: string }) {
    const { lang, setLang } = useLang();
    return <LangMenu lang={lang} onChange={setLang} className={className} />;
  }

  return { t, LangProvider, useLang, LangSwitch };
}

function applyDocument(l: Lang) {
  try {
    const d = document.documentElement;
    d.lang = l;
    d.dir = LANG_INFO[l].dir;
  } catch {
    /* rien */
  }
}

/** Ferme un menu au clic extérieur ou sur Échap. */
export function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, ref]);
}

/** Menu à 5 langues : bouton compact (code) + liste des noms natifs. */
export function LangMenu({
  lang,
  onChange,
  className = "",
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const close = React.useCallback(() => setOpen(false), []);
  useDismiss(open, close, ref);
  return (
    <div ref={ref} className={"relative inline-flex " + className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${tUi("ui.language")} : ${LANG_INFO[lang].native}`}
        title={tUi("ui.language")}
        data-lang-menu=""
        className="inline-flex h-9 items-center gap-1 rounded-full border border-border bg-surface px-2.5 text-xs font-medium text-ink-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Icon name="globe" size={14} />
        <span>{lang.toUpperCase()}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={tUi("ui.language")}
          className="absolute end-0 top-full z-50 mt-1 min-w-[10rem] rounded-xl border border-border bg-surface p-1 shadow-lg"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === lang}
                lang={l}
                dir={LANG_INFO[l].dir}
                data-lang={l}
                onClick={() => {
                  setOpen(false);
                  if (l !== lang) onChange(l);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-start text-sm transition-colors ${
                  l === lang
                    ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                    : "text-ink hover:bg-cream-100 dark:hover:bg-white/5"
                }`}
              >
                <span>{LANG_INFO[l].native}</span>
                <span className="text-[10px] uppercase opacity-60">{l}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
