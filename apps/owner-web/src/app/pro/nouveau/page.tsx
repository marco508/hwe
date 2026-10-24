"use client";

import * as React from "react";
import Link from "next/link";
import type { Mandate } from "@hwe/types";
import {
  Button,
  Card,
  CardBody,
  EmailVerifyNotice,
  Icon,
  Input,
  InviteLinkBox,
  Label,
  Select,
  Textarea,
  isApiError,
  toast,
  useAsync,
} from "@hwe/ui";
import { useAuth } from "../../../lib/auth-context";
import { api } from "../../../lib/api";
import { t } from "../../../lib/i18n";
import { defaultTerms, invalidatePortfolio, isManager, loadPortfolio, termsBody, useMyAgency, type TermsForm } from "../../../lib/pro";
import { PropertyForm, toPropertyBody, type PropertyFormValue } from "../../../components/PropertyForm";
import { LINK_PRIMARY, LINK_SECONDARY, MandateTermsFields, ProHero, SectionCard, WarningNote } from "../../../components/pro/ProUi";

type Step = "ask" | "invite" | "invited" | "owner" | "property" | "terms" | "done";

export default function ProNewPropertyPage() {
  const { user, emailVerified } = useAuth();
  const manager = isManager(user);
  const agency = useMyAgency();
  const portfolio = useAsync(() => loadPortfolio(user!.id), [user?.id]);
  const [step, setStep] = React.useState<Step>("ask");

  // Branche « a un compte »
  const [ownerEmail, setOwnerEmail] = React.useState("");
  const [inviteTerms, setInviteTerms] = React.useState<TermsForm>(defaultTerms());
  const [inviteMsg, setInviteMsg] = React.useState("");
  const [notFound, setNotFound] = React.useState(false);

  // Branche « sans compte »
  const [existingOwnerId, setExistingOwnerId] = React.useState("");
  const [owner, setOwner] = React.useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [propertyValue, setPropertyValue] = React.useState<PropertyFormValue | null>(null);
  const [terms, setTerms] = React.useState<TermsForm>(defaultTerms());
  const [assignedAgentId, setAssignedAgentId] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState<{ mandate: Mandate; url: string; emailSent: boolean } | null>(null);

  // Propriétaires invités par l'agence, pas encore activés : bien supplémentaire.
  const invitedOwners = React.useMemo(() => {
    const m = new Map<string, string>();
    for (const p of portfolio.data ?? [])
      if (p.owner && p.owner.activated === false) m.set(p.owner.id, `${p.owner.firstName} ${p.owner.lastName} · ${p.owner.email ?? ""}`);
    return [...m.entries()];
  }, [portfolio.data]);

  const hasIban = !!agency.data?.agency.paymentIban;
  const agencyName = user?.agency?.name ?? "";

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setNotFound(false);
    try {
      await api.inviteOwner({
        ...termsBody(inviteTerms),
        ownerEmail: ownerEmail.trim(),
        message: inviteMsg.trim() || undefined,
        assignedAgentId: manager && assignedAgentId ? assignedAgentId : undefined,
      });
      setStep("invited");
      toast.success(t("pro.new.invitedToast"));
    } catch (err) {
      if (isApiError(err) && err.code === "OWNER_NOT_FOUND") setNotFound(true);
      else toast.error(err);
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    if (!propertyValue) return;
    setBusy(true);
    const { mediaUrls, pricingRates, ...rest } = propertyValue;
    const validRates = pricingRates.filter((r) => r.amount !== "" && Number(r.amount) > 0);
    try {
      const r = await api.createWithNewOwner({
        ...(existingOwnerId
          ? { ownerId: existingOwnerId }
          : {
              owner: {
                firstName: owner.firstName.trim(),
                lastName: owner.lastName.trim(),
                email: owner.email.trim(),
                phone: owner.phone.trim() || undefined,
              },
            }),
        property: {
          ...toPropertyBody(rest),
          price: Number(rest.price) > 0 ? Number(rest.price) : undefined,
          media: mediaUrls.map((url, i) => ({ url, position: i })),
        },
        mandate: termsBody(terms),
        assignedAgentId: manager && assignedAgentId ? assignedAgentId : undefined,
      });
      if (validRates.length > 0) {
        try {
          await api.upsertPricingRates(
            r.mandate.property.id,
            validRates.map((x) => ({ unit: x.unit, amount: Number(x.amount) })),
          );
        } catch (e2) {
          toast.error(e2);
          toast.info(t("pf.ratesFailed"), { durationMs: 9000 });
        }
      }
      invalidatePortfolio();
      setResult({ mandate: r.mandate, url: r.ownerInviteUrl, emailSent: r.emailSent });
      setStep("done");
      toast.success(t("pro.new.createdToast"));
    } catch (err) {
      toast.error(err);
      if (isApiError(err) && err.code === "OWNER_EXISTS") setStep("owner");
    } finally {
      setBusy(false);
    }
  };

  const steps: { key: Step[]; label: string }[] = [
    { key: ["ask"], label: t("pro.new.s1") },
    { key: ["invite", "invited", "owner"], label: t("pro.new.s2") },
    { key: ["property"], label: t("pro.new.s3") },
    { key: ["terms"], label: t("pro.new.s4") },
    { key: ["done"], label: t("pro.new.s5") },
  ];
  const activeIdx = steps.findIndex((s) => s.key.includes(step));

  const agentSelect = manager && agency.data && (
    <div className="max-w-sm">
      <Label htmlFor="nw-agent">{t("pro.new.assign")}</Label>
      <Select id="nw-agent" value={assignedAgentId} onChange={(e) => setAssignedAgentId(e.target.value)}>
        <option value="">{t("pro.new.assignNone")}</option>
        {agency.data.members.map((m) => (
          <option key={m.userId} value={m.userId}>
            {m.user.firstName} {m.user.lastName}
          </option>
        ))}
      </Select>
    </div>
  );

  return (
    <section>
      <ProHero title={t("pro.new.title1")} accent={t("pro.new.title2")} sub={t("pro.new.sub")} />

      <ol className="flex gap-2 overflow-x-auto mb-6 text-xs sm:text-sm" aria-label={t("pro.new.stepsAria")}>
        {steps.map((s, i) => (
          <li
            key={s.label}
            aria-current={i === activeIdx ? "step" : undefined}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 h-8 border ${
              i === activeIdx
                ? "bg-brand-950 text-cream-50 border-brand-950 dark:bg-cream-100 dark:text-brand-950"
                : i < activeIdx
                  ? "border-brand-300 text-brand-700 dark:text-brand-300"
                  : "border-border text-ink-muted"
            }`}
          >
            <span className="font-semibold">{i + 1}</span> {s.label}
          </li>
        ))}
      </ol>

      {step === "ask" && (
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          <h2 className="sm:col-span-2 font-display text-2xl">{t("pro.new.question")}</h2>
          <ChoiceCard icon="checkCircle" title={t("pro.new.yes")} text={t("pro.new.yesText")} onClick={() => setStep("invite")} />
          <ChoiceCard icon="user" title={t("pro.new.no")} text={t("pro.new.noText")} onClick={() => setStep("owner")} />
        </div>
      )}

      {step === "invite" && (
        <form onSubmit={sendInvite} className="space-y-6 max-w-3xl">
          <SectionCard title={t("pro.new.inviteTitle")} icon="mail">
            <p className="text-sm text-ink-muted mb-4">{t("pro.new.inviteText")}</p>
            <div className="max-w-md">
              <Label htmlFor="nw-oemail">{t("pro.new.ownerEmail")}</Label>
              <Input id="nw-oemail" type="email" required value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} />
            </div>
            {notFound && (
              <div className="mt-4">
                <WarningNote title={t("pro.new.notFoundTitle")}>
                  <p>{t("pro.new.notFoundText")}</p>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1.5 font-medium underline"
                    onClick={() => {
                      setOwner((o) => ({ ...o, email: ownerEmail }));
                      setNotFound(false);
                      setStep("owner");
                    }}
                  >
                    <Icon name="plus" size={14} /> {t("pro.new.createForOwner")}
                  </button>
                </WarningNote>
              </div>
            )}
          </SectionCard>
          <SectionCard title={t("pro.new.termsTitle")} icon="clipboard">
            <MandateTermsFields value={inviteTerms} onChange={setInviteTerms} currency="EUR" agencyHasIban={hasIban} />
            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="nw-msg">{t("pro.new.message")}</Label>
                <Textarea id="nw-msg" rows={3} value={inviteMsg} onChange={(e) => setInviteMsg(e.target.value)} placeholder={t("pro.new.messagePh")} />
              </div>
              {agentSelect}
            </div>
          </SectionCard>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep("ask")}>
              {t("pro.back")}
            </Button>
            <Button type="submit" variant="gradient" disabled={busy || !ownerEmail.trim()}>
              {busy ? t("pro.processing") : t("pro.new.sendInvite")}
            </Button>
          </div>
        </form>
      )}

      {step === "invited" && (
        <Card className="max-w-2xl">
          <CardBody className="space-y-4">
            <h2 className="font-display text-2xl">{t("pro.new.invitedTitle")}</h2>
            <p className="text-ink-muted">{t("pro.new.invitedText", { email: ownerEmail })}</p>
            <InviteLinkBox
              url={`${typeof window !== "undefined" ? window.location.origin : ""}/dashboard/mandats`}
              title={t("pro.new.invitedLink")}
              message={t("pro.new.invitedWa", { agency: agencyName })}
            />
            <div className="flex flex-wrap gap-2">
              <Link href="/pro/mandats" className={LINK_SECONDARY}>
                {t("pro.new.toMandates")}
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setOwnerEmail("");
                  setStep("ask");
                }}
              >
                {t("pro.new.again")}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {step === "owner" && (
        <form
          className="space-y-6 max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("property");
          }}
        >
          <SectionCard title={t("pro.new.ownerTitle")} icon="user">
            <p className="text-sm text-ink-muted mb-4">{t("pro.new.ownerText")}</p>
            {invitedOwners.length > 0 && (
              <div className="mb-4 max-w-md">
                <Label htmlFor="nw-existing">{t("pro.new.existingOwner")}</Label>
                <Select id="nw-existing" value={existingOwnerId} onChange={(e) => setExistingOwnerId(e.target.value)}>
                  <option value="">{t("pro.new.newOwnerOpt")}</option>
                  {invitedOwners.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
            )}
            {!existingOwnerId && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nw-ofirst">{t("register.firstName")}</Label>
                  <Input id="nw-ofirst" required value={owner.firstName} onChange={(e) => setOwner({ ...owner, firstName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="nw-olast">{t("register.lastName")}</Label>
                  <Input id="nw-olast" required value={owner.lastName} onChange={(e) => setOwner({ ...owner, lastName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="nw-omail">{t("login.email")}</Label>
                  <Input id="nw-omail" type="email" required value={owner.email} onChange={(e) => setOwner({ ...owner, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="nw-ophone">{t("register.phone")}</Label>
                  <Input id="nw-ophone" value={owner.phone} onChange={(e) => setOwner({ ...owner, phone: e.target.value })} />
                </div>
              </div>
            )}
          </SectionCard>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep("ask")}>
              {t("pro.back")}
            </Button>
            <Button type="submit" variant="gradient">
              {t("pro.next")} <Icon name="arrowRight" size={16} className="ms-1.5" />
            </Button>
          </div>
        </form>
      )}

      {step === "property" &&
        (emailVerified ? (
          <div className="space-y-4">
            <Button type="button" variant="secondary" onClick={() => setStep("owner")}>
              {t("pro.back")}
            </Button>
            <PropertyForm
              initial={propertyValue ?? undefined}
              submitLabel={t("pro.new.toTerms")}
              onSubmit={(v) => {
                setPropertyValue(v);
                setTerms(defaultTerms(v.listingType === "SALE" ? "SALE" : "MANAGEMENT"));
                setStep("terms");
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
        ) : (
          <EmailVerifyNotice />
        ))}

      {step === "terms" && propertyValue && (
        <div className="space-y-6 max-w-3xl">
          <SectionCard title={t("pro.new.termsTitle")} icon="clipboard">
            <p className="text-sm text-ink-muted mb-4">{t("pro.new.termsText", { title: propertyValue.title })}</p>
            <MandateTermsFields
              value={terms}
              onChange={setTerms}
              currency={propertyValue.currency || "EUR"}
              allowedTypes={propertyValue.listingType === "SALE" ? ["SALE"] : ["MANAGEMENT", "LETTING"]}
              agencyHasIban={hasIban}
            />
            <div className="mt-5">{agentSelect}</div>
          </SectionCard>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep("property")}>
              {t("pro.back")}
            </Button>
            <Button type="button" variant="gradient" disabled={busy} onClick={create}>
              {busy ? t("pro.processing") : t("pro.new.create")}
            </Button>
          </div>
        </div>
      )}

      {step === "done" && result && (
        <Card className="max-w-2xl">
          <CardBody className="space-y-4">
            <h2 className="font-display text-2xl">{t("pro.new.doneTitle")}</h2>
            <p className="text-ink-muted">
              {t("pro.new.doneText", { title: result.mandate.property.title, ref: result.mandate.reference })}
            </p>
            <InviteLinkBox
              url={result.url}
              title={t("pro.owner.activationLink")}
              message={t("pro.owner.waMessage", { agency: agencyName })}
              hint={result.emailSent ? t("pro.new.emailSentHint") : undefined}
            />
            <div className="flex flex-wrap gap-2">
              <Link href={`/dashboard/${result.mandate.property.id}`} className={LINK_PRIMARY}>
                {t("pro.new.openProperty")}
              </Link>
              <Button
                variant="secondary"
                onClick={() => {
                  setPropertyValue(null);
                  setResult(null);
                  setStep("ask");
                }}
              >
                {t("pro.new.again")}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </section>
  );
}

function ChoiceCard({ icon, title, text, onClick }: { icon: "checkCircle" | "user"; title: string; text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-start rounded-2xl border border-border bg-surface p-5 hover:border-brand-400 hover:shadow-card transition min-w-0"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
        <Icon name={icon} size={22} />
      </span>
      <p className="mt-3 font-display text-lg">{title}</p>
      <p className="text-sm text-ink-muted mt-1">{text}</p>
    </button>
  );
}
