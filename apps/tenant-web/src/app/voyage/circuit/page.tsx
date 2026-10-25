"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Badge, Button, ErrorState, Icon, Input, Label, isNotFound, loginHref, toast, useAsync } from "@hwe/ui";
import { api } from "../../../lib/api";
import { t, useLang } from "../../../lib/i18n";
import { useAuth } from "../../../lib/auth-context";
import { useShellParams } from "../../../lib/route-params";
import { CATEGORY_ICON, Dialog, VoyageCover, VoyageCrumbs, countryName, fmtDuration, isoIn } from "../../../components/voyage/VoyageKit";

export default function CircuitPage() {
  const params = useShellParams<{ slug: string }>("/voyage/circuits/:slug");
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const { data: c, error, reload } = useAsync(() => api.voyageCircuit(params!.slug), [params?.slug, lang], { enabled: !!params?.slug });
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState("");
  const [travelers, setTravelers] = React.useState(2);
  const [busy, setBusy] = React.useState(false);

  if (error && isNotFound(error)) notFound();
  if (error && !c) return <ErrorState error={error} onRetry={reload} />;
  if (!c) return <div className="aspect-[21/9] rounded-3xl skeleton" />;

  const days = Array.from({ length: c.days }, (_, i) => i + 1);

  const copy = async () => {
    setBusy(true);
    try {
      const trip = await api.tripFromCircuit(c.slug, { startDate: start || null, travelers });
      toast.success(t("voy.circuit.copied"));
      router.push(`/voyage/mes-voyages/${trip.id}`);
    } catch (e) {
      toast.error(e);
      setBusy(false);
    }
  };

  return (
    <article className="space-y-8 pb-12 min-w-0">
      <VoyageCrumbs items={[{ href: "/voyage", label: t("voy.crumb.home") }, { href: `/voyage?pays=${c.country}`, label: countryName(c.country) }, { label: c.title }]} />
      <header className="grid lg:grid-cols-5 gap-6 items-center">
        <div className="lg:col-span-2 rounded-3xl overflow-hidden aspect-[3/2]">
          <VoyageCover cover={c.cover} alt={c.title} size={1200} eager />
        </div>
        <div className="lg:col-span-3 space-y-3 min-w-0">
          <Badge tone="ocean">{t("voy.circuit.days", { count: c.days })}</Badge>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight [overflow-wrap:anywhere]">{c.title}</h1>
          <p className="text-ink-muted">{c.summary}</p>
          <Button variant="gradient" className="gap-2" onClick={() => (user ? setOpen(true) : router.push(loginHref()))}>
            <Icon name="calendar" size={16} /> {t("voy.circuit.copy")}
          </Button>
          <p className="text-xs text-ink-muted">{t("voy.circuit.copyHint")}</p>
        </div>
      </header>

      <ol className="relative border-s-2 border-brand-200 dark:border-brand-800 ms-3 space-y-8">
        {days.map((day) => {
          const steps = c.steps.filter((s) => s.day === day);
          return (
            <li key={day} className="ps-6 relative">
              <span className="absolute -start-[13px] top-0 h-6 w-6 rounded-full bg-brand-600 text-white text-xs font-semibold flex items-center justify-center">
                {day}
              </span>
              <h2 className="font-display text-xl mb-3">{t("voy.trip.dayN", { n: day })}</h2>
              {steps.length === 0 ? (
                <p className="text-sm text-ink-muted">{t("voy.circuit.free")}</p>
              ) : (
                <div className="space-y-3">
                  {steps.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-border bg-surface p-3 flex gap-3 min-w-0">
                      {s.place ? (
                        <Link href={`/voyage/lieux/${s.place.slug}`} className="h-16 w-24 rounded-xl overflow-hidden shrink-0">
                          <VoyageCover cover={s.place.cover} alt={s.place.name} category={s.place.category} />
                        </Link>
                      ) : s.destination ? (
                        <Link href={`/voyage/destinations/${s.destination.slug}`} className="h-16 w-24 rounded-xl overflow-hidden shrink-0">
                          <VoyageCover cover={s.destination.cover} alt={s.destination.name} />
                        </Link>
                      ) : null}
                      <div className="min-w-0">
                        {s.place ? (
                          <Link href={`/voyage/lieux/${s.place.slug}`} className="font-semibold text-ink hover:text-brand-700 [overflow-wrap:anywhere]">
                            {s.place.name}
                          </Link>
                        ) : s.destination ? (
                          <Link href={`/voyage/destinations/${s.destination.slug}`} className="font-semibold text-ink hover:text-brand-700">
                            {s.destination.name}
                          </Link>
                        ) : null}
                        {s.place && (
                          <div className="text-xs text-ink-muted flex items-center gap-1 flex-wrap">
                            <Icon name={CATEGORY_ICON[s.place.category]} size={12} /> {t(`voy.cat.${s.place.category}`)}
                            {s.place.destination && <> · {s.place.destination.name}</>}
                            {s.place.visitMinutes ? <> · {fmtDuration(s.place.visitMinutes)}</> : null}
                          </div>
                        )}
                        {s.note && <p className="text-sm text-ink-muted mt-1">{s.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <Dialog open={open} onClose={() => setOpen(false)} title={t("voy.circuit.copy")}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="c-start">{t("voy.trip.startDate")}</Label>
            <Input id="c-start" type="date" min={isoIn(0)} value={start} onChange={(e) => setStart(e.target.value)} />
            <p className="text-xs text-ink-muted mt-1">{t("voy.circuit.noDateHint")}</p>
          </div>
          <div>
            <Label htmlFor="c-trav">{t("voy.trip.travelers")}</Label>
            <Input id="c-trav" type="number" min={1} max={50} value={travelers} onChange={(e) => setTravelers(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              {t("com.cancel")}
            </Button>
            <Button onClick={copy} disabled={busy}>
              {t("voy.circuit.copyConfirm")}
            </Button>
          </div>
        </div>
      </Dialog>
    </article>
  );
}
