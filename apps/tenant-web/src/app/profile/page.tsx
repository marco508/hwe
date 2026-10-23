"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, ErrorState, Input, Label, toast, useLoginRedirect } from "@hwe/ui";
import { useAuth } from "../../lib/auth-context";
import { api } from "../../lib/api";
import { t } from "../../lib/i18n";
import { AvatarUploader } from "../../components/AvatarUploader";
import { IdentityDocuments } from "../../components/IdentityDocuments";
import type { UserDocument, IdentityDocumentType } from "@hwe/types";

export default function ProfilePage() {
  const auth = useAuth();
  const { user, loading, patchUser } = auth;
  const router = useRouter();
  useLoginRedirect(auth, router);
  const [form, setForm] = React.useState({ firstName: "", lastName: "", phone: "" });
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [documents, setDocuments] = React.useState<UserDocument[]>([]);
  const [docsError, setDocsError] = React.useState<unknown>(null);
  const [docsTick, setDocsTick] = React.useState(0);

  // Formulaire initialisé une seule fois par utilisateur (F6 : l'avatar n'est
  // plus écrasé par un rafraîchissement de session).
  const initFor = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!user || initFor.current === user.id) return;
    initFor.current = user.id;
    setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone ?? "" });
    setAvatar(user.avatarUrl ?? null);
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    setDocsError(null);
    api.listMyDocuments().then(setDocuments).catch(setDocsError);
  }, [user?.id, docsTick]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !user) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // avatarUrl : null = suppression explicite ; inchangé = non envoyé.
      const avatarPatch = avatar === (user.avatarUrl ?? null) ? {} : { avatarUrl: avatar };
      const updated = await api.updateMe({ ...form, ...avatarPatch });
      patchUser({ ...updated, avatarUrl: updated?.avatarUrl ?? avatar });
      setSaved(true);
      toast.success(t("fix.profile.saved"));
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
          <div className="text-sm text-ink-muted">{t("acc.profile.loggedAs")}</div>
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
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pf-last">{t("acc.profile.lastName")}</Label>
                <Input
                  id="pf-last"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="pf-phone">{t("acc.profile.phone")}</Label>
              <Input
                id="pf-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? t("acc.profile.saving") : t("acc.profile.save")}
              </Button>
              {saved && <span className="text-sm text-success">{t("acc.profile.saved")}</span>}
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Identity documents */}
      {docsError ? (
        <ErrorState error={docsError} onRetry={() => setDocsTick((n) => n + 1)} />
      ) : (
      <IdentityDocuments
        documents={documents}
        onAdd={handleAddDocument}
        onDelete={handleDeleteDocument}
      />
      )}
    </section>
  );
}
