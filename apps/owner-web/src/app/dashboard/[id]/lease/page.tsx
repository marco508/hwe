"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Input, Label, Select, Textarea, Badge } from "@hwe/ui";
import { useAuth } from "../../../../lib/auth-context";
import { api } from "../../../../lib/api";
import type { Property, LeaseContract, LeaseStatus } from "@hwe/types";
import { LEASE_STATUS_LABELS } from "@hwe/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatMoney(n: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

const STATUS_TONE: Record<LeaseStatus, "neutral" | "success" | "accent" | "danger"> = {
  DRAFT: "neutral",
  SIGNED: "accent",
  ACTIVE: "success",
  EXPIRED: "neutral",
  TERMINATED: "danger",
};

// ─── Contract text generator ──────────────────────────────────────────────────

function generateContractText(lease: LeaseContract, property: Property): string {
  const ownerName = property.owner
    ? `${property.owner.firstName} ${property.owner.lastName}`
    : "Le propriétaire";
  const ownerEmail = property.owner?.email ?? "";
  const ownerPhone = property.owner?.phone ?? "";

  const tenantName = `${lease.tenantFirstName} ${lease.tenantLastName}`;
  const address = `${property.addressLine}, ${property.postalCode} ${property.city}, ${property.country}`;
  const startDateFmt = formatDate(lease.startDate);
  const endDateFmt = lease.endDate ? formatDate(lease.endDate) : "indéterminée";
  const rentTotal = lease.monthlyRent + lease.charges;
  const leaseDuration = lease.endDate ? "durée déterminée" : "durée indéterminée";
  const noticeTxt = `${lease.noticePeriod} mois`;
  const paymentDaySuffix = lease.rentPaymentDay === 1 ? "er" : "";

  return `CONTRAT DE BAIL D'HABITATION
${lease.furnished ? "MEUBLÉ" : "NON MEUBLÉ"}

Établi conformément à la loi n° 89-462 du 6 juillet 1989 modifiée
et à la loi n° 2014-366 du 24 mars 2014 (loi ALUR).

═══════════════════════════════════════════════════════════════
ARTICLE 1 — LES PARTIES
═══════════════════════════════════════════════════════════════

BAILLEUR (Propriétaire)
Nom : ${ownerName}
${ownerEmail ? `Email : ${ownerEmail}` : ""}
${ownerPhone ? `Téléphone : ${ownerPhone}` : ""}

PRENEUR (Locataire)
Nom : ${tenantName}
Email : ${lease.tenantEmail}
${lease.tenantPhone ? `Téléphone : ${lease.tenantPhone}` : ""}
${lease.tenantAddress ? `Adresse actuelle : ${lease.tenantAddress}` : ""}

═══════════════════════════════════════════════════════════════
ARTICLE 2 — DÉSIGNATION DU BIEN
═══════════════════════════════════════════════════════════════

Le présent bail porte sur le logement situé à l'adresse suivante :
${address}

Nature : ${property.propertyType === "APARTMENT" ? "Appartement" : property.propertyType === "HOUSE" ? "Maison" : property.propertyType}
Surface habitable : ${property.surface} m²
Nombre de pièces principales : ${property.rooms}
Logement ${lease.furnished ? "meublé" : "non meublé"}

═══════════════════════════════════════════════════════════════
ARTICLE 3 — DURÉE DU BAIL
═══════════════════════════════════════════════════════════════

Le présent bail est conclu pour une ${leaseDuration}.
Date de prise d'effet : ${startDateFmt}
${lease.endDate ? `Date de fin : ${endDateFmt}` : ""}

Préavis : ${noticeTxt} (conformément à la législation en vigueur).

═══════════════════════════════════════════════════════════════
ARTICLE 4 — CONDITIONS FINANCIÈRES
═══════════════════════════════════════════════════════════════

Loyer mensuel hors charges : ${formatMoney(lease.monthlyRent)}
Charges mensuelles : ${formatMoney(lease.charges)}
─────────────────────────────────────────────────────
Total mensuel : ${formatMoney(rentTotal)}

Le loyer est payable le ${lease.rentPaymentDay}${paymentDaySuffix} de chaque mois.

Dépôt de garantie : ${formatMoney(lease.deposit)}
(soit ${Math.round(lease.deposit / lease.monthlyRent)} mois de loyer hors charges)
Le dépôt de garantie sera restitué dans un délai maximal de 2 mois suivant
la remise des clés, déduction faite des éventuelles retenues justifiées.

═══════════════════════════════════════════════════════════════
ARTICLE 5 — OBLIGATIONS DU BAILLEUR
═══════════════════════════════════════════════════════════════

Le bailleur s'engage à :
• Délivrer un logement décent et en bon état d'usage et de réparation.
• Assurer au preneur la jouissance paisible du logement.
• Entretenir les locaux en état de servir à l'usage prévu.
• Effectuer toutes les réparations autres que locatives.

═══════════════════════════════════════════════════════════════
ARTICLE 6 — OBLIGATIONS DU LOCATAIRE
═══════════════════════════════════════════════════════════════

Le locataire s'engage à :
• Payer le loyer et les charges aux termes convenus.
• Utiliser paisiblement les locaux loués suivant la destination prévue.
• Répondre des dégradations et pertes survenues pendant la durée du contrat.
• Prendre à sa charge l'entretien courant du logement et les réparations locatives.
• Souscrire une assurance contre les risques locatifs.
• Ne pas transformer les locaux et équipements sans accord écrit du bailleur.

═══════════════════════════════════════════════════════════════
ARTICLE 7 — RÉVISION DU LOYER
═══════════════════════════════════════════════════════════════

Le loyer est révisable annuellement à la date anniversaire du bail,
selon la variation de l'Indice de Référence des Loyers (IRL) publié
par l'INSEE, conformément à l'article 17-1 de la loi du 6 juillet 1989.

═══════════════════════════════════════════════════════════════
ARTICLE 8 — RÉSILIATION
═══════════════════════════════════════════════════════════════

Le preneur peut résilier le bail à tout moment, sous réserve de respecter
un préavis de ${noticeTxt} adressé par lettre recommandée avec accusé de réception.

Le bailleur peut résilier le bail à son échéance en respectant un préavis
de ${lease.furnished ? "3 mois" : "6 mois"} et pour l'un des motifs prévus par la loi.

${
  lease.specialClauses
    ? `═══════════════════════════════════════════════════════════════
ARTICLE 9 — CLAUSES PARTICULIÈRES
═══════════════════════════════════════════════════════════════

${lease.specialClauses}

`
    : ""
}═══════════════════════════════════════════════════════════════
SIGNATURES
═══════════════════════════════════════════════════════════════

Fait en deux exemplaires originaux, à ________________,
le ________________

Le Bailleur                          Le Locataire
(Signature précédée de la mention    (Signature précédée de la mention
"Lu et approuvé")                    "Lu et approuvé")



____________________________         ____________________________
${ownerName}                         ${tenantName}


─────────────────────────────────────────────────────────────────
Document généré par hwe — Plateforme de gestion immobilière
Ce document est fourni à titre d'exemple. Il est recommandé de le faire
valider par un professionnel juridique avant signature.
─────────────────────────────────────────────────────────────────`;
}

// ─── Component ────────────────────────────────────────────────────────────────

type View = "list" | "create" | "preview";

const EMPTY_FORM = {
  tenantFirstName: "",
  tenantLastName: "",
  tenantEmail: "",
  tenantPhone: "",
  tenantAddress: "",
  monthlyRent: "",
  charges: "0",
  deposit: "",
  startDate: "",
  endDate: "",
  noticePeriod: "1",
  rentPaymentDay: "1",
  furnished: false,
  specialClauses: "",
};

export default function LeasePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [property, setProperty] = React.useState<Property | null>(null);
  const [leases, setLeases] = React.useState<LeaseContract[]>([]);
  const [working, setWorking] = React.useState(true);
  const [view, setView] = React.useState<View>("list");
  const [selectedLease, setSelectedLease] = React.useState<LeaseContract | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [contractText, setContractText] = React.useState("");

  React.useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  React.useEffect(() => {
    if (!params?.id) return;
    Promise.all([
      api.getProperty(params.id),
      api.listLeases(params.id),
    ]).then(([prop, ls]) => {
      setProperty(prop);
      setLeases(ls);
      setWorking(false);
    });
  }, [params?.id]);

  const field = (key: keyof typeof EMPTY_FORM) => ({
    value: form[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    setSubmitting(true);
    try {
      const created = await api.createLease(params.id, {
        tenantFirstName: form.tenantFirstName,
        tenantLastName: form.tenantLastName,
        tenantEmail: form.tenantEmail,
        tenantPhone: form.tenantPhone || undefined,
        tenantAddress: form.tenantAddress || undefined,
        monthlyRent: parseFloat(form.monthlyRent),
        charges: parseFloat(form.charges) || 0,
        deposit: parseFloat(form.deposit),
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        noticePeriod: parseInt(form.noticePeriod),
        rentPaymentDay: parseInt(form.rentPaymentDay),
        furnished: form.furnished,
        specialClauses: form.specialClauses || undefined,
      });
      setLeases((l) => [created, ...l]);
      setForm(EMPTY_FORM);
      setView("list");
    } catch (err) {
      alert("Erreur : " + (err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (lease: LeaseContract, status: LeaseStatus) => {
    if (!params?.id) return;
    const updated = await api.updateLease(params.id, lease.id, { status });
    setLeases((l) => l.map((x) => (x.id === updated.id ? updated : x)));
  };

  const handleDelete = async (leaseId: string) => {
    if (!confirm("Supprimer ce contrat ?") || !params?.id) return;
    await api.deleteLease(params.id, leaseId);
    setLeases((l) => l.filter((x) => x.id !== leaseId));
  };

  const openPreview = (lease: LeaseContract) => {
    if (!property) return;
    setSelectedLease(lease);
    setContractText(generateContractText(lease, property));
    setView("preview");
  };

  const downloadContract = () => {
    if (!contractText || !selectedLease) return;
    const blob = new Blob([contractText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contrat-bail-${selectedLease.tenantLastName.toLowerCase()}-${selectedLease.startDate.split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading || working) return <p className="text-ink-muted">Chargement…</p>;

  // ── Preview view ─────────────────────────────────────────────────────────────
  if (view === "preview" && selectedLease) {
    return (
      <section>
        <div className="mb-4">
          <button
            onClick={() => setView("list")}
            className="text-sm text-ink-muted hover:underline"
          >
            ← Retour aux contrats
          </button>
        </div>
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="font-display text-2xl">Aperçu du contrat</h1>
          <div className="flex gap-2">
            <Button onClick={downloadContract} variant="secondary">
              ⬇️ Télécharger (.txt)
            </Button>
            {!selectedLease.ownerSignedAt && (
              <Button
                onClick={async () => {
                  if (!params?.id) return;
                  if (!confirm("Confirmez-vous la signature électronique de ce contrat ?")) return;
                  try {
                    const updated = await api.signLease(params.id, selectedLease.id);
                    setLeases((l) => l.map((x) => (x.id === updated.id ? updated : x)));
                    setSelectedLease(updated);
                  } catch (e) {
                    alert("Erreur : " + (e as Error).message);
                  }
                }}
              >
                ✍️ Signer électroniquement
              </Button>
            )}
            {selectedLease.ownerSignedAt && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-lg px-3 py-2">
                ✅ Signé le {new Date(selectedLease.ownerSignedAt).toLocaleDateString("fr-FR")}
              </span>
            )}
          </div>
        </div>
        <div className="bg-white border border-ink-subtle rounded-2xl p-8 shadow-sm">
          <pre className="text-sm font-mono whitespace-pre-wrap text-ink leading-relaxed">
            {contractText}
          </pre>
        </div>
        {/* Signature status */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span>{selectedLease.ownerSignedAt ? "✅" : "⏳"}</span>
            <span className="text-ink-muted">
              Propriétaire :{" "}
              {selectedLease.ownerSignedAt
                ? `signé le ${new Date(selectedLease.ownerSignedAt).toLocaleDateString("fr-FR")}`
                : "en attente"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{selectedLease.tenantSignedAt ? "✅" : "⏳"}</span>
            <span className="text-ink-muted">
              Locataire :{" "}
              {selectedLease.tenantSignedAt
                ? `signé le ${new Date(selectedLease.tenantSignedAt).toLocaleDateString("fr-FR")}`
                : "en attente"}
            </span>
          </div>
        </div>
      </section>
    );
  }

  // ── Create form view ─────────────────────────────────────────────────────────
  if (view === "create") {
    return (
      <section>
        <div className="mb-4">
          <button
            onClick={() => setView("list")}
            className="text-sm text-ink-muted hover:underline"
          >
            ← Retour aux contrats
          </button>
        </div>
        <h1 className="font-display text-3xl mb-8">Nouveau contrat de location</h1>

        <form onSubmit={handleCreate} className="max-w-2xl space-y-8">
          {/* Tenant info */}
          <fieldset className="space-y-4 border border-ink-subtle rounded-xl p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              👤 Informations du locataire
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tf">Prénom *</Label>
                <Input id="tf" {...field("tenantFirstName")} required />
              </div>
              <div>
                <Label htmlFor="tl">Nom *</Label>
                <Input id="tl" {...field("tenantLastName")} required />
              </div>
            </div>
            <div>
              <Label htmlFor="te">Email *</Label>
              <Input id="te" type="email" {...field("tenantEmail")} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tp">Téléphone</Label>
                <Input id="tp" type="tel" {...field("tenantPhone")} />
              </div>
              <div>
                <Label htmlFor="ta">Adresse actuelle</Label>
                <Input id="ta" {...field("tenantAddress")} />
              </div>
            </div>
          </fieldset>

          {/* Financial */}
          <fieldset className="space-y-4 border border-ink-subtle rounded-xl p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              💶 Conditions financières
            </legend>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rent">Loyer (€/mois) *</Label>
                <Input
                  id="rent"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("monthlyRent")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="charges">Charges (€/mois)</Label>
                <Input
                  id="charges"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("charges")}
                />
              </div>
              <div>
                <Label htmlFor="deposit">Dépôt de garantie (€) *</Label>
                <Input
                  id="deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  {...field("deposit")}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rpd">Jour de paiement du loyer</Label>
                <Select id="rpd" {...field("rentPaymentDay")}>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d === 1 ? "1er" : `${d}`} du mois
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </fieldset>

          {/* Duration */}
          <fieldset className="space-y-4 border border-ink-subtle rounded-xl p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              📅 Durée du bail
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sd">Date de début *</Label>
                <Input id="sd" type="date" {...field("startDate")} required />
              </div>
              <div>
                <Label htmlFor="ed">Date de fin (vide = indéterminée)</Label>
                <Input id="ed" type="date" {...field("endDate")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="np">Préavis (mois)</Label>
                <Select id="np" {...field("noticePeriod")}>
                  <option value="1">1 mois</option>
                  <option value="2">2 mois</option>
                  <option value="3">3 mois</option>
                  <option value="6">6 mois</option>
                </Select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.furnished}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, furnished: e.target.checked }))
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Logement meublé</span>
                </label>
              </div>
            </div>
          </fieldset>

          {/* Special clauses */}
          <fieldset className="space-y-4 border border-ink-subtle rounded-xl p-6">
            <legend className="font-semibold px-2 text-sm uppercase tracking-wide text-ink-muted">
              📝 Clauses particulières
            </legend>
            <Textarea
              id="clauses"
              value={form.specialClauses}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialClauses: e.target.value }))
              }
              rows={5}
              placeholder="Ex : Interdiction d'animaux, travaux autorisés, utilisation professionnelle partielle…"
            />
          </fieldset>

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Création…" : "Créer le contrat"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setView("list")}
            >
              Annuler
            </Button>
          </div>
        </form>
      </section>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────────
  return (
    <section>
      <div className="mb-2">
        <Link
          href={`/dashboard/${params?.id}/edit`}
          className="text-sm text-ink-muted hover:underline"
        >
          ← Retour au bien
        </Link>
      </div>
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl mb-1">Contrats de location</h1>
          <p className="text-ink-muted">
            {property?.title} — {property?.addressLine}, {property?.city}
          </p>
          <Link
            href="/dashboard/loyers"
            className="inline-block mt-1 text-sm font-medium text-brand-600 dark:text-brand-300 hover:underline"
          >
            💶 Suivre les loyers de ce bail →
          </Link>
        </div>
        <Button onClick={() => setView("create")}>+ Nouveau contrat</Button>
      </div>

      {leases.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-ink-subtle rounded-2xl">
          <div className="text-5xl mb-4">📋</div>
          <p className="font-semibold text-lg mb-1">Aucun contrat créé</p>
          <p className="text-ink-muted text-sm mb-6">
            Générez un bail conforme en quelques clics.
          </p>
          <Button onClick={() => setView("create")}>+ Créer un contrat</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {leases.map((lease) => (
            <div
              key={lease.id}
              className="rounded-2xl border border-ink-subtle bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-lg">
                      {lease.tenantFirstName} {lease.tenantLastName}
                    </span>
                    <Badge tone={STATUS_TONE[lease.status]}>
                      {LEASE_STATUS_LABELS[lease.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-ink-muted">{lease.tenantEmail}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span>
                      🗓 Début : <strong>{formatDate(lease.startDate)}</strong>
                    </span>
                    {lease.endDate && (
                      <span>
                        Fin : <strong>{formatDate(lease.endDate)}</strong>
                      </span>
                    )}
                    <span>
                      💶{" "}
                      <strong>
                        {formatMoney(lease.monthlyRent + lease.charges)} / mois
                      </strong>
                      {lease.charges > 0 && (
                        <span className="text-ink-muted">
                          {" "}
                          (dont {formatMoney(lease.charges)} de charges)
                        </span>
                      )}
                    </span>
                    <span>
                      🔒 Dépôt :{" "}
                      <strong>{formatMoney(lease.deposit)}</strong>
                    </span>
                    {lease.furnished && (
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        Meublé
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openPreview(lease)}
                  >
                    📄 Voir le contrat
                  </Button>
                  {lease.status === "DRAFT" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(lease, "ACTIVE")}
                    >
                      Activer
                    </Button>
                  )}
                  {lease.status === "ACTIVE" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(lease, "TERMINATED")}
                    >
                      Résilier
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(lease.id)}
                  >
                    🗑
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-ink-subtle flex gap-4 flex-wrap">
        <Link href={`/dashboard/${params?.id}/documents`}>
          <Button variant="secondary">🗂️ Documents légaux</Button>
        </Link>
        <Link href={`/dashboard/${params?.id}/edit`}>
          <Button variant="ghost">Retour au bien</Button>
        </Link>
      </div>
    </section>
  );
}
