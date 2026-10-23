"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Input, Label, ErrorState, toast, useLoginRedirect } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { AvatarUploader } from "../../components/AvatarUploader";
import { IdentityDocuments } from "../../components/IdentityDocuments";
import { PaymentMethodsManager } from "../../components/PaymentMethodsManager";
import { t } from "../../lib/i18n";
import type { UserDocument, IdentityDocumentType } from "@hwe/types";

export default function ProfilePage() {
  const auth = useAuth();
  const { user, patchUser } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const [form, setForm] = React.useState({ firstName: "", lastName: "", phone: "" });
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [documents, setDocuments] = React.useState<UserDocument[]>([]);
  const [docsError, setDocsError] = React.useState<unknown>(null);
  const [docsTick, setDocsTick] = React.useState(0);
  // F6 : le formulaire est initialisé UNE fois par utilisateur ; un
  // rafraîchissement de session n'écrase plus une saisie (ni l'avatar) en cours.
  const initializedFor = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!user || initializedFor.current === user.id) return;
    initializedFor.current = user.id;
    setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? "" });
    setAvatar(user.avatarUrl ?? null);
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    setDocsError(null);
    api.listMyDocuments().then(setDocuments).catch(setDocsError);
  }, [user?.id, docsTick]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // avatarUrl : null = suppression explicite (contrat §14), absent = inchangé.
      const avatarChanged = avatar !== (user.avatarUrl ?? null);
      const updated = await api.updateMe({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        ...(avatarChanged ? { avatarUrl: avatar } : {}),
      });
      patchUser({ ...updated, avatarUrl: updated.avatarUrl ?? (avatarChanged ? avatar : user.avatarUrl) });
      if (updated.avatarUrl !== undefined) setAvatar(updated.avatarUrl ?? null);
      setSaved(true);
    } catch (err) {
      toast.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddDocument = async (doc: {
    name: string;
    documentType: IdentityDocumentType;
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
  }) => {
    const created = await api.createMyDocument(doc);
    setDocuments((prev) => [created, ...prev]);
  };

  const handleDeleteDocument = async (docId: string) => {
    await api.deleteMyDocument(docId);
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  return (
    <section className="max-w-xl space-y-6 min-w-0">
      <h1 className="font-display text-3xl">{t("acc.profile.title")}</h1>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <div className="text-sm text-ink-muted">{t("acc.profile.loggedInAs")}</div>
          <div className="font-medium [overflow-wrap:anywhere]">{user.email}</div>
        </CardHeader>
        <CardBody>
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="flex justify-center pb-2">
              <AvatarUploader
                value={avatar}
                onChange={setAvatar}
                firstName={form.firstName}
                lastName={form.lastName}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="pf-first">{t("acc.profile.firstName")}</Label>
                <Input
                  id="pf-first"
                  autoComplete="given-name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pf-last">{t("acc.profile.lastName")}</Label>
                <Input
                  id="pf-last"
                  autoComplete="family-name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="pf-phone">{t("acc.profile.phone")}</Label>
              <Input
                id="pf-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? t("acc.saving") : t("acc.save")}
              </Button>
              {saved && <span role="status" className="text-sm text-success">{t("acc.profile.updated")}</span>}
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Coordonnées de paiement des loyers */}
      <PaymentMethodsManager />

      {/* Pièces d'identité (composant partagé) */}
      {docsError ? (
        <ErrorState compact error={docsError} title={t("acc.profile.docsLoadError")} onRetry={() => setDocsTick((n) => n + 1)} />
      ) : null}
      <IdentityDocuments
        documents={documents}
        onAdd={handleAddDocument}
        onDelete={handleDeleteDocument}
      />
    </section>
  );
}
