"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedBackground, Breadcrumbs, EmailVerifyNotice, toast, Icon, type IconName } from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { PropertyForm, PropertyFormValue, toPropertyBody } from "../../../components/PropertyForm";

export default function NewPropertyPage() {
  const router = useRouter();
  // Session et rôle garantis par dashboard/layout.tsx.
  const { user, emailVerified } = useAuth();
  const [submitting, setSubmitting] = React.useState(false);

  if (!user) return null;

  const onSubmit = async (v: PropertyFormValue) => {
    setSubmitting(true);
    const { mediaUrls, pricingRates, ...rest } = v;
    const validRates = pricingRates.filter((r) => r.amount !== "" && Number(r.amount) > 0);

    let createdId: string;
    try {
      // F10 : prix facultatif si la grille est remplie (l'API dérive priceUnit).
      const created = await api.createProperty({
        ...toPropertyBody(rest),
        price: Number(rest.price) > 0 ? Number(rest.price) : undefined,
        media: mediaUrls.map((url, i) => ({ url, position: i })),
      });
      createdId = created.id;
    } catch (e) {
      toast.error(e);
      setSubmitting(false);
      return;
    }

    // F9 : le bien existe désormais ; un échec de grille ne doit jamais
    // conduire à une nouvelle soumission (doublon) → on bascule en édition.
    if (validRates.length > 0) {
      try {
        await api.upsertPricingRates(
          createdId,
          validRates.map((r) => ({ unit: r.unit, amount: Number(r.amount) })),
        );
      } catch (e) {
        toast.error(e);
        toast.info(t("pf.ratesFailed"), { durationMs: 9000 });
        router.replace(`/dashboard/${createdId}/edit`);
        return;
      }
    }
    // Fiche du bien : résumé + « Prochaines étapes » (documents, bail, séjours…).
    toast.success(t("pf.createdNext"), { durationMs: 6000 });
    router.push(`/dashboard/${encodeURIComponent(createdId)}`);
  };

  return (
    <section>
      {/* ── Hero d'introduction ──────────────────────────────────────────── */}
      <AnimatedBackground
        variant="blobs"
        className="rounded-2xl border border-border/60 px-5 sm:px-8 py-8 mb-8"
      >
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl min-w-0">
            <Breadcrumbs items={[{ href: "/dashboard", label: t("nav.myProperties") }, { label: t("nav.addProperty") }]} Link={Link} className="mb-3" />
            <span className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 pulse-dot" />
              {t("pf.new.badge")}
            </span>
            <h1 className="font-display text-4xl mb-2">
              {t("pf.new.title1")} <span className="gradient-text">{t("pf.new.title2")}</span>
            </h1>
            <p className="text-ink-muted leading-relaxed max-w-xl">
              {t("pf.new.sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm w-full">
            <TipCard icon="camera" text={t("pf.new.tip1")} />
            <TipCard icon="mapPin" text={t("pf.new.tip2")} />
            <TipCard icon="euro" text={t("pf.new.tip3")} />
            <TipCard icon="pen" text={t("pf.new.tip4")} />
          </div>
        </div>
      </AnimatedBackground>

      {/* F5 / contrat §2 : e-mail non confirmé → encart au lieu du formulaire. */}
      {emailVerified ? (
        <PropertyForm onSubmit={onSubmit} submitting={submitting} />
      ) : (
        <EmailVerifyNotice />
      )}
    </section>
  );
}

function TipCard({ icon, text }: { icon: IconName; text: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs">
      <Icon name={icon} size={16} className="text-brand-600 dark:text-brand-300" />
      <span className="text-ink-muted leading-tight">{text}</span>
    </div>
  );
}
