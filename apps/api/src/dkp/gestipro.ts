/**
 * GestiPro (contrat §2.4) : relevé mensuel des honoraires d'une agence →
 * factures GestiPro, une par propriétaire (client) et par devise. Règles pures.
 */

export interface GestiproFeeRow {
  id: string;
  kind: string;
  label: string;
  amount: number;
  currency: string;
  dueDate: Date;
  mandate: {
    reference: string;
    property: { title: string; city: string | null };
    owner: { id: string; firstName: string; lastName: string; email: string; phone: string | null };
  };
}

export interface GestiproInvoice {
  reference: string;
  source: "hwe";
  customer: { name: string; email?: string; phone?: string };
  items: Array<{ label: string; quantity: number; unitPrice: number }>;
  notes?: string;
  currency?: string;
  issuedAt?: string;
}

export function isGestiproKey(key: unknown): key is string {
  return typeof key === "string" && /^gp_[A-Za-z0-9_-]{8,200}$/.test(key.trim());
}

/** « gp_…a1b2 » : seul indice jamais renvoyé au front. */
export function maskKey(key: string): string {
  return `gp_…${key.trim().slice(-4)}`;
}

/** Référence idempotente : HWE-<agence>-<AAAA-MM>[-<propriétaire>-<devise>]. */
export function invoiceReference(agencyId: string, month: string, ownerId?: string, currency?: string): string {
  const base = `HWE-${agencyId}-${month}`;
  return ownerId ? `${base}-${ownerId}${currency ? `-${currency}` : ""}` : base;
}

export function buildGestiproInvoices(
  agencyId: string,
  month: string,
  fees: GestiproFeeRow[],
  opts: { label: (f: GestiproFeeRow) => string; notes: (refs: string[]) => string; issuedAt: string },
): GestiproInvoice[] {
  const groups = new Map<string, GestiproFeeRow[]>();
  for (const f of fees) {
    if (!(f.amount > 0)) continue;
    const k = `${f.mandate.owner.id}|${f.currency}`;
    const list = groups.get(k) ?? [];
    list.push(f);
    groups.set(k, list);
  }
  const out: GestiproInvoice[] = [];
  for (const [k, list] of groups) {
    const [ownerId, currency] = k.split("|") as [string, string];
    const o = list[0]!.mandate.owner;
    const refs = [...new Set(list.map((f) => f.mandate.reference))];
    out.push({
      reference: invoiceReference(agencyId, month, ownerId, currency),
      source: "hwe",
      customer: {
        name: `${o.firstName} ${o.lastName}`.trim() || o.email,
        ...(o.email ? { email: o.email } : {}),
        ...(o.phone ? { phone: o.phone } : {}),
      },
      items: list.map((f) => ({ label: opts.label(f).slice(0, 200), quantity: 1, unitPrice: Math.round(f.amount * 100) / 100 })),
      notes: opts.notes(refs),
      currency,
      issuedAt: opts.issuedAt,
    });
  }
  return out.sort((a, b) => a.reference.localeCompare(b.reference));
}
