"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  Textarea,
} from "@hwe/ui";
import { api } from "../../../lib/api";
import { useCurrency } from "../../../lib/currency-context";
import { useAuth } from "../../../lib/auth-context";
import type { Property, PricingRate, LeaseDurationUnit } from "@hwe/types";
import { LEASE_DURATION_UNIT_LABELS, computeRentalTotal } from "@hwe/types";

type DurationUnit = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

const UNIT_LABELS: Record<DurationUnit, string> = {
  DAYS: "jour(s)",
  WEEKS: "semaine(s)",
  MONTHS: "mois",
  YEARS: "an(s)",
};

const formatPrice = (n: number, currency = "EUR", decimals = 0) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { format: fmtPrice } = useCurrency();
  const [p, setP] = React.useState<Property | null>(null);
  const [rates, setRates] = React.useState<PricingRate[]>([]);
  const [isFav, setIsFav] = React.useState(false);
  const [favLoading, setFavLoading] = React.useState(false);
  const [contact, setContact] = React.useState({
    contactEmail: "",
    contactPhone: "",
    message: "",
    desiredStartDate: "",
    leaseDuration: "",
    leaseDurationUnit: "MONTHS" as DurationUnit,
    isDurationLimited: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!params?.id) return;
    api.getProperty(params.id).then(setP);
    api.getPricingRates(params.id).then((r) => setRates(r as unknown as PricingRate[]));
  }, [params?.id]);

  React.useEffect(() => {
    if (!user || !params?.id) return;
    api.favoriteIds().then((r) => setIsFav(r.ids.includes(params.id)));
  }, [user, params?.id]);

  React.useEffect(() => {
    if (user)
      setContact((c) => ({
        ...c,
        contactEmail: c.contactEmail || user.email,
        contactPhone: c.contactPhone || user.phone || "",
      }));
  }, [user]);

  const toggleFav = async () => {
    if (!p) return;
    setFavLoading(true);
    try {
      if (isFav) { await api.removeFavorite(p.id); setIsFav(false); }
      else { await api.addFavorite(p.id); setIsFav(true); }
    } finally { setFavLoading(false); }
  };

  // ── Calcul du montant simulé ──────────────────────────────────────────────
  const simulatedTotal = React.useMemo((): number | null => {
    if (!contact.isDurationLimited || !contact.leaseDuration) return null;
    const n = parseInt(contact.leaseDuration, 10);
    if (!n || n <= 0) return null;
    return computeRentalTotal(rates, n, contact.leaseDurationUnit as LeaseDurationUnit);
  }, [rates, contact.isDurationLimited, contact.leaseDuration, contact.leaseDurationUnit]);

  // Quand la grille propose l'unité sélectionnée, on pre-sélectionne la bonne unité
  const availableUnits = rates.map((r) => r.unit as DurationUnit);
  const hasGrid = availableUnits.length > 0;

  if (!p) return <p className="text-ink-muted">Chargement…</p>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.sendInquiry({
        propertyId: p.id,
        message: contact.message,
        contactEmail: contact.contactEmail,
        contactPhone: contact.contactPhone || undefined,
        desiredStartDate: contact.desiredStartDate || undefined,
        leaseDuration:
          contact.isDurationLimited && contact.leaseDuration
            ? parseInt(contact.leaseDuration, 10)
            : undefined,
        leaseDurationUnit:
          contact.isDurationLimited && contact.leaseDuration
            ? contact.leaseDurationUnit
            : undefined,
      });
      setSent(true);
    } catch {
      setError("Impossible d'envoyer la demande. Êtes-vous connecté ?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <header>
          <div className="flex gap-2 mb-3">
            <Badge tone={p.listingType === "SALE" ? "accent" : "brand"}>
              {p.listingType === "SALE" ? "Vente" : "Location"}
            </Badge>
            <Badge>{p.propertyType}</Badge>
          </div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl mb-1">{p.title}</h1>
            {user && (
              <button
                type="button"
                disabled={favLoading}
                onClick={toggleFav}
                aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                className={`shrink-0 mt-1 text-2xl transition-colors ${
                  isFav ? "text-red-500 hover:text-red-700" : "text-ink-muted hover:text-red-400"
                } disabled:opacity-50`}
              >
                {isFav ? "♥" : "♡"}
              </button>
            )}
          </div>
          <div className="text-ink-muted">
            {p.addressLine}, {p.postalCode} {p.city}
          </div>
        </header>

        {p.media.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {p.media.map((m) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.id}
                src={m.url}
                alt={m.alt ?? p.title}
                className="rounded-md w-full aspect-[4/3] object-cover border border-border"
              />
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Description</h2>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm">{p.description}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Caractéristiques</h2>
          </CardHeader>
          <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm">
            <div><span className="text-ink-muted">Surface</span><div>{p.surface} m²</div></div>
            <div><span className="text-ink-muted">Pièces</span><div>{p.rooms}</div></div>
            <div><span className="text-ink-muted">Chambres</span><div>{p.bedrooms}</div></div>
            <div><span className="text-ink-muted">Salles de bain</span><div>{p.bathrooms}</div></div>
            {p.floor !== null && <div><span className="text-ink-muted">Étage</span><div>{p.floor}</div></div>}
            {p.yearBuilt && <div><span className="text-ink-muted">Année</span><div>{p.yearBuilt}</div></div>}
            <div><span className="text-ink-muted">Meublé</span><div>{p.furnished ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Parking</span><div>{p.hasParking ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Balcon</span><div>{p.hasBalcony ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Jardin</span><div>{p.hasGarden ? "Oui" : "Non"}</div></div>
            <div><span className="text-ink-muted">Ascenseur</span><div>{p.hasElevator ? "Oui" : "Non"}</div></div>
          </CardBody>
        </Card>

        {/* ── Grille tarifaire ─────────────────────────────────────────────── */}
        {p.listingType === "RENT" && hasGrid && (
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg">Grille tarifaire</h2>
              <p className="text-sm text-ink-muted mt-1">
                Tarifs définis par le propriétaire selon la durée de séjour.
              </p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["DAYS", "WEEKS", "MONTHS", "YEARS"] as DurationUnit[])
                  .filter((u) => availableUnits.includes(u))
                  .map((unit) => {
                    const rate = rates.find((r) => r.unit === unit)!;
                    return (
                      <div
                        key={unit}
                        className="rounded-xl border border-brand-100 bg-brand-50 p-3 text-center"
                      >
                        <div className="text-xs text-ink-muted mb-1 uppercase tracking-wide">
                          Par {UNIT_LABELS[unit].replace("(s)", "")}
                        </div>
                        <div className="text-xl font-display text-brand-700">
                          {fmtPrice(rate.amount, p.currency)}
                        </div>
                        <div className="text-xs text-ink-muted mt-0.5">
                          / {UNIT_LABELS[unit].replace("(s)", "")}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      <aside className="space-y-4">
        {/* ── Prix affiché ───────────────────────────────────────────────── */}
        <Card>
          <CardBody>
            <div className="text-3xl font-display text-brand-700">
              {fmtPrice(p.price, p.currency)}
              {p.listingType === "RENT" && (
                <span className="text-sm font-normal text-ink-muted"> /mois</span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-2">
              {p.surface} m² · {p.rooms} {p.rooms > 1 ? "pièces" : "pièce"}
            </div>
          </CardBody>
        </Card>

        {/* ── Formulaire de contact ────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <h2 className="font-display text-lg">Contacter le propriétaire</h2>
          </CardHeader>
          <CardBody>
            {!user ? (
              <div className="text-sm">
                <p className="text-ink-muted mb-3">
                  Connectez-vous pour envoyer un message au propriétaire.
                </p>
                <Link href="/login">
                  <Button className="w-full">Se connecter</Button>
                </Link>
              </div>
            ) : sent ? (
              <p className="text-sm text-success">
                Demande envoyée. Le propriétaire vous recontactera.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label>Votre email</Label>
                  <Input
                    type="email"
                    value={contact.contactEmail}
                    onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Téléphone (optionnel)</Label>
                  <Input
                    value={contact.contactPhone}
                    onChange={(e) => setContact({ ...contact, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Date de début souhaitée (optionnel)</Label>
                  <Input
                    type="date"
                    value={contact.desiredStartDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setContact({ ...contact, desiredStartDate: e.target.value })}
                  />
                </div>

                {/* ── Durée + simulateur de prix ─────────────────────── */}
                <div className="space-y-2">
                  <Label>Durée de location</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDurationLimited"
                      checked={contact.isDurationLimited}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          isDurationLimited: e.target.checked,
                          leaseDuration: "",
                        })
                      }
                      className="h-4 w-4 rounded border-border accent-brand-600"
                    />
                    <label htmlFor="isDurationLimited" className="text-sm text-ink-muted cursor-pointer">
                      Durée limitée
                    </label>
                  </div>

                  {contact.isDurationLimited && (
                    <>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={9999}
                          placeholder="ex : 3"
                          value={contact.leaseDuration}
                          onChange={(e) =>
                            setContact({ ...contact, leaseDuration: e.target.value })
                          }
                          className="w-24"
                          required={contact.isDurationLimited}
                        />
                        <select
                          value={contact.leaseDurationUnit}
                          onChange={(e) =>
                            setContact({
                              ...contact,
                              leaseDurationUnit: e.target.value as DurationUnit,
                            })
                          }
                          className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          {/* N'afficher que les unités disponibles dans la grille, ou toutes si pas de grille */}
                          {(hasGrid ? availableUnits : (["DAYS","WEEKS","MONTHS","YEARS"] as DurationUnit[])).map((u) => (
                            <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                          ))}
                        </select>
                      </div>

                      {/* Montant calculé */}
                      {simulatedTotal !== null ? (
                        <div className="rounded-lg bg-brand-50 border border-brand-100 px-4 py-3">
                          <div className="text-xs text-ink-muted mb-1">Montant estimé pour votre séjour</div>
                          <div className="text-2xl font-display text-brand-700">
                            {fmtPrice(simulatedTotal, p.currency)}
                          </div>
                          <div className="text-xs text-ink-muted mt-1">
                            {contact.leaseDuration} {UNIT_LABELS[contact.leaseDurationUnit]} × {formatPrice(
                              rates.find((r) => r.unit === contact.leaseDurationUnit)!.amount,
                              p.currency,
                            )}
                            {" "}/ {UNIT_LABELS[contact.leaseDurationUnit].replace("(s)", "")}
                          </div>
                        </div>
                      ) : contact.leaseDuration && !hasGrid ? (
                        <div className="rounded-lg bg-slate-50 border border-border px-4 py-2 text-sm text-ink-muted">
                          Ce propriétaire n&apos;a pas défini de grille tarifaire détaillée. Le loyer mensuel de base est de {formatPrice(p.price, p.currency)}.
                        </div>
                      ) : null}
                    </>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Message</Label>
                  <Textarea
                    value={contact.message}
                    onChange={(e) => setContact({ ...contact, message: e.target.value })}
                    minLength={10}
                    required
                    placeholder="Bonjour, je suis intéressé(e) par votre bien…"
                  />
                </div>
                {error && <p className="text-sm text-danger">{error}</p>}
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Envoi…" : "Envoyer la demande"}
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
      </aside>
    </article>
  );
}
