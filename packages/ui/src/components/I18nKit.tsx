"use client";

import * as React from "react";

/**
 * i18n maison — même mécanique qu'AfroChina : dictionnaires plats + t() avec
 * interpolation {param}, locale appliquée PENDANT le rendu du provider pour
 * que tous les enfants lisent la bonne langue. fr = textes d'origine,
 * en = traduction ; repli fr puis clé brute.
 *
 * Chaque app appelle createI18n(ses dictionnaires) et exporte t/LangProvider/useLang.
 */

export type Lang = "fr" | "en";

const LANG_KEY = "hwe.lang";

export function createI18n(dicts: Record<Lang, Record<string, string>>) {
  let locale: Lang = "fr";

  function t(key: string, params?: Record<string, string | number>): string {
    let text = dicts[locale][key] ?? dicts.fr[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.split(`{${k}}`).join(String(v ?? ""));
      }
    }
    return text;
  }

  const Ctx = React.createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
    lang: "fr",
    setLang: () => {},
  });

  function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = React.useState<Lang>("fr");

    // Choix persisté, appliqué après le montage (rendu serveur = fr).
    React.useEffect(() => {
      try {
        const saved = window.localStorage.getItem(LANG_KEY);
        if (saved === "en" || saved === "fr") setLangState(saved);
      } catch {
        /* stockage indisponible */
      }
    }, []);

    // Pendant le rendu, avant les enfants : ils lisent t() dans la bonne langue.
    locale = lang;

    const setLang = React.useCallback((l: Lang) => {
      setLangState(l);
      try {
        window.localStorage.setItem(LANG_KEY, l);
      } catch {
        /* best effort */
      }
    }, []);

    return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
  }

  function useLang() {
    return React.useContext(Ctx);
  }

  /** Bascule FR | EN compacte, à poser dans une navbar. */
  function LangSwitch({ className = "" }: { className?: string }) {
    const { lang, setLang } = useLang();
    return (
      <div
        className={
          "inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium " +
          className
        }
        role="group"
        aria-label="Langue"
      >
        {(["fr", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`h-7 px-2.5 rounded-full transition-colors ${
              lang === l
                ? "bg-brand-950 text-cream-50 dark:bg-cream-100 dark:text-brand-950"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return { t, LangProvider, useLang, LangSwitch };
}
