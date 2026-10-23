"use client";

import * as React from "react";
import { t, useLang } from "../lib/i18n";
import { LEGAL_DOCS, TODO_TOKEN, type LegalDocId, type LegalBlock } from "../lib/legal";
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

function Block({ block }: { block: LegalBlock }) {
  if (Array.isArray(block)) {
    return (
      <ul className="list-disc pl-5 space-y-1.5 text-ink-muted leading-relaxed">
        {block.map((li, i) => (
          <li key={i}>{withTodos(li)}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-ink-muted leading-relaxed">{withTodos(block)}</p>;
}

function LegalInner({ doc }: { doc: LegalDocId }) {
  const { lang } = useLang();
  const content = LEGAL_DOCS[lang === "en" ? "en" : "fr"][doc];

  React.useEffect(() => {
    document.title = `${content.title} — hwe`;
  }, [content.title]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1 py-12 sm:py-16">
        <article className="container-tight max-w-3xl">
          <a href="/" className="text-sm text-ink-muted hover:text-ink">
            ← {t("legal.back")}
          </a>
          <h1 className="display-serif text-4xl sm:text-5xl text-ink mt-6 leading-tight">{content.title}</h1>
          <p className="text-sm text-ink-subtle mt-3">
            {t("legal.updated")} {withTodos(TODO_TOKEN)}
          </p>
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
                  <Block key={i} block={b} />
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
