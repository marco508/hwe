"use client";

import * as React from "react";
import { interpolate } from "@hwe/types";
import { usePlatformSettings, usePlatformTexts } from "@hwe/ui";
import { t, useLang } from "../lib/i18n";
import { legalDoc, legalVars, TODO_TOKEN, type LegalDocId, type LegalBlock } from "../lib/legal";
import { SiteProviders, SiteHeader, SiteFooter } from "./SiteShell";

/**
 * Page légale (mentions légales, CGU, confidentialité) — U5.
 * Les informations réelles encore inconnues apparaissent comme un marqueur
 * visible « [À compléter] » : rien n'est inventé.
 */
export function LegalPage({ doc }: { doc: LegalDocId }) {
  return (
    <SiteProviders>
      <LegalInner doc={doc} />
    </SiteProviders>
  );
}

/** Remplace chaque jeton {{TODO}} par un <mark> bien visible. */
function withTodos(text: string): React.ReactNode {
  const parts = text.split(TODO_TOKEN);
  if (parts.length === 1) return text;
  return parts.map((p, i) => (
    <React.Fragment key={i}>
      {p}
      {i < parts.length - 1 && (
        <mark className="rounded px-1 py-0.5 bg-accent-100 text-accent-700 dark:bg-accent-700/30 dark:text-accent-200 font-medium">
          {t("legal.todo")}
        </mark>
      )}
    </React.Fragment>
  ));
}

type Vars = Record<string, string | number>;

function Block({ block, vars }: { block: LegalBlock; vars: Vars }) {
  if (Array.isArray(block)) {
    return (
      <ul className="list-disc ps-5 space-y-1.5 text-ink-muted leading-relaxed">
        {block.map((li, i) => (
          <li key={i}>{withTodos(interpolate(li, vars))}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-ink-muted leading-relaxed">{withTodos(interpolate(block, vars))}</p>;
}

/**
 * Valeurs de l'abonnement (essai, grâce, offre gratuite, prix) injectées dans
 * les textes : lues en base via GET /plans (rendu client, rafraîchi à chaque
 * visite, cache de 30 s) — jamais figées dans le texte.
 */
function usePlatformVars(lang: Parameters<typeof legalVars>[0]): Vars {
  const params = usePlatformTexts();
  const s = usePlatformSettings();
  const v = legalVars(lang);
  const after = s.freePlanEnabled
    ? s.graceDays > 0 ? v.afterFREE : v.afterFREE0
    : s.graceDays > 0 ? v.afterSUSPENDED : v.afterSUSPENDED0;
  return {
    ...params,
    trialSentence: interpolate(s.trialDays > 0 ? v.trial : v.noTrial, params),
    afterTrial: interpolate(after, params),
  };
}

function LegalInner({ doc }: { doc: LegalDocId }) {
  const { lang } = useLang();
  const { content, translated } = legalDoc(lang, doc);
  const vars = usePlatformVars(lang);

  React.useEffect(() => {
    document.title = `${content.title} — hwe`;
  }, [content.title]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1 py-12 sm:py-16">
        <article className="container-tight max-w-3xl">
          <a href="/" className="text-sm text-ink-muted hover:text-ink">
            <span className="inline-block rtl:rotate-180">←</span> {t("legal.back")}
          </a>
          <h1 className="display-serif text-4xl sm:text-5xl text-ink mt-6 leading-tight">{content.title}</h1>
          <p className="text-sm text-ink-subtle mt-3">
            {t("legal.updated")} {withTodos(TODO_TOKEN)}
          </p>
          {translated && (
            <p
              role="note"
              data-legal-translation-note=""
              className="mt-4 rounded-xl border border-border bg-cream-100/60 dark:bg-white/5 px-4 py-3 text-sm text-ink-muted"
            >
              {t("legal.translationNote")}
            </p>
          )}
          <p className="text-ink-muted mt-6 leading-relaxed">{content.intro}</p>

          <nav aria-label={t("legal.toc")} className="mt-8 rounded-2xl border border-border bg-surface p-5">
            <div className="eyebrow mb-3">{t("legal.toc")}</div>
            <ol className="grid gap-1.5 text-sm">
              {content.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-brand-700 dark:text-brand-300 hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-10">
            {content.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 space-y-3">
                <h2 className="display-serif text-2xl text-ink">{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} vars={vars} />
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
