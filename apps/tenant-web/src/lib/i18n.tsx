"use client";

import { createI18n } from "@hwe/ui";
// Un fichier par langue (fr = référence, en = traduction ; es, pt, ar à
// traduire). Clé absente : repli langue → en → fr. Voir scripts/i18n-check.mjs.
import fr from "./i18n-locales/fr.json";
import en from "./i18n-locales/en.json";
import es from "./i18n-locales/es.json";
import pt from "./i18n-locales/pt.json";
import ar from "./i18n-locales/ar.json";

export const { t, LangProvider, useLang, LangSwitch } = createI18n({ fr, en, es, pt, ar });
